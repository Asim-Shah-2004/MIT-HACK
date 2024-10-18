import crypto from "crypto";
import { Entrepreneur, Investor, WarehouseOwner, ChatRoom, Proposal, Doc } from "../../models/index.js";

const proposal = async (io) => {
  io.on("connection", (socket) => {
    socket.on("sendProposal", async ({ senderId, recipientId, userType, reasonToConnect, attachment }) => {
      try {
        let sender;
        let recipient;

        if (userType === "Entrepreneur") {
          sender = await Entrepreneur.findOne({ senderId });
          recipient =
            (await Entrepreneur.findOne({ recipientId })) ||
            (await Investor.findOne({ recipientId })) ||
            (await WarehouseOwner.findOne({ recipientId }));
        } else if (userType === "Investor") {
          sender = await Investor.findOne({ senderId });
          recipient =
            (await Entrepreneur.findOne({ recipientId })) ||
            (await Investor.findOne({ recipientId })) ||
            (await WarehouseOwner.findOne({ recipientId }));
        } else if (userType === "warehouseOwner") {
          sender = await WarehouseOwner.findOne({ senderId });
          recipient =
            (await Entrepreneur.findOne({ recipientId })) ||
            (await Investor.findOne({ recipientId })) ||
            (await WarehouseOwner.findOne({ recipientId }));
        }

        if (!sender || !recipient) {
          socket.emit("error", { message: "Sender or recipient not found" });
          return;
        }

        const proposalId = crypto.randomBytes(16).toString("hex");

        const newProposal = new Proposal({
          proposalId,
          reasonToConnect,
          createdAt: Date.now(),
          attachment: attachment || null,
        });

        await newProposal.save();

        sender.proposalsSent.push({
          proposalId,
          status: "pending",
          receiverEmail: recipient.email,
          receiverName: recipient.fullName,
        });

        await sender.save();

        recipient.proposalsReceived.push({
          proposalId,
          status: "pending",
          senderEmail: sender.email,
          senderName: sender.fullName,
        });

        await recipient.save();

        socket.emit("proposalSent", { proposalId, recipientId });
      } catch (error) {
        socket.emit("error", { message: "Failed to send proposal" });
      }
    });

    socket.on("acceptProposal", async ({ senderId, recipientId, proposalId, userType }) => {
      try {
        let sender;
        let recipient;

        // console.log(senderId, recipientId, proposalId, userType);

        if (userType === "entrepreneur") {
          sender = await Entrepreneur.findOne({ userId: senderId });
          recipient =
            (await Entrepreneur.findOne({ userId: recipientId })) ||
            (await Investor.findOne({ userId: recipientId })) ||
            (await WarehouseOwner.findOne({ userId: recipientId }));
        } else if (userType === "investor") {
          sender = await Investor.findOne({ userId: senderId });
          recipient =
            (await Entrepreneur.findOne({ userId: recipientId })) ||
            (await Investor.findOne({ userId: recipientId })) ||
            (await WarehouseOwner.findOne({ userId: recipientId }));
        } else if (userType === "warehouse") {
          sender = await WarehouseOwner.findOne({ userId: senderId });
          recipient =
            (await Entrepreneur.findOne({ userId: recipientId })) ||
            (await Investor.findOne({ userId: recipientId })) ||
            (await WarehouseOwner.findOne({ userId: recipientId }));
        }

        if (!sender || !recipient) {
          socket.emit("error", { message: "Sender or recipient not found" });
          return;
        }

        const proposal = sender.proposalsReceived.find((p) => p.proposalId === proposalId);
        const proposalRecipient = recipient.proposalsSent.find((p) => p.proposalId === proposalId);

        // console.log(senderId, recipientId);
        // console.log(sender.proposalsReceived);
        // console.log(recipient.proposalsSent);

        if (!proposal || proposal.status !== "pending") {
          socket.emit("error", { message: "Invalid proposal or already processed" });
          return;
        }
        if (!proposalRecipient || proposalRecipient.status !== "pending") {
          socket.emit("error", { message: "Invalid proposal or already processed" });
          return;
        }

        const chatId = crypto.randomBytes(16).toString("hex");
        const docID = crypto.randomBytes(16).toString("hex");

        proposal.status = "accepted";
        proposalRecipient.status = "accepted";

        const chatRoom = new ChatRoom({
          chatId,
          participants: [
            { email: sender.email, name: sender.fullName },
            { email: recipient.email, name: recipient.fullName },
          ],
          messages: [],
          createdAt: Date.now(),
          docID,
        });

        const doc = new Doc({
          docID,
          participants: [sender.email, recipient.email],
        });

        await chatRoom.save();
        await doc.save();

        // if (sender.chats.find((chat) => chat.personEmail === recipient.email)) return socket.emit("same person proposal exists");
        // if (recipient.chats.find((chat) => chat.personEmail === sender.email)) return socket.emit("same person proposal exists");

        sender.chats.push({ personName: recipient.fullName, personEmail: recipient.email, chatId });
        recipient.chats.push({ personName: sender.fullName, personEmail: sender.email, chatId });

        await sender.save();
        await recipient.save();

        socket.emit("Proposal accepted and chatRoomCreated", { chatId });
      } catch (error) {
        console.log(error);
        socket.emit("error", { message: "Failed to accept proposal and create chat room" });
      }
    });

    socket.on("rejectProposal", async ({ senderId, recipientId, proposalId, userType }) => {
      try {
        let sender;
        let recipient;

        if (userType === "entrepreneur") {
          sender = await Entrepreneur.findOne({ userId: senderId });
          recipient =
            (await Entrepreneur.findOne({ userId: recipientId })) ||
            (await Investor.findOne({ userId: recipientId })) ||
            (await WarehouseOwner.findOne({ userId: recipientId }));
        } else if (userType === "investor") {
          sender = await Investor.findOne({ userId: senderId });
          recipient =
            (await Entrepreneur.findOne({ userId: recipientId })) ||
            (await Investor.findOne({ userId: recipientId })) ||
            (await WarehouseOwner.findOne({ userId: recipientId }));
        } else if (userType === "warehouse") {
          sender = await WarehouseOwner.findOne({ userId: senderId });
          recipient =
            (await Entrepreneur.findOne({ userId: recipientId })) ||
            (await Investor.findOne({ userId: recipientId })) ||
            (await WarehouseOwner.findOne({ userId: recipientId }));
        }

        if (!sender || !recipient) {
          socket.emit("error", { message: "Sender or recipient not found" });
          return;
        }

        const proposal = sender.proposalsReceived.find((p) => p.proposalId === proposalId);
        const proposalRecipient = recipient.proposalsSent.find((p) => p.proposalId === proposalId);

        // console.log(se/nderId, recipientId);
        // console.log(sender.proposalsReceived);
        // console.log(recipient.proposalsSent);

        if (!proposal || proposal.status !== "pending") {
          socket.emit("error", { message: "Invalid proposal or already processed" });
          return;
        }
        if (!proposalRecipient || proposalRecipient.status !== "pending") {
          socket.emit("error", { message: "Invalid proposal or already processed" });
          return;
        }

        
        proposal.status = "rejected";
        proposalRecipient.status = "rejected";
        await sender.save();
        await recipient.save();
        
        socket.emit("proposalRejected", { message: "Proposal has been rejected and removed." });
      } catch (error) {
        socket.emit("error", { message: "Failed to reject and remove proposal" });
      }
    });

    socket.on("disconnect", () => {});
  });
};

export default proposal;
