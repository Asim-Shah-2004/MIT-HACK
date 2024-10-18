import { ChatRoom } from "../../models/index.js";

const chats = (io) => {
  io.on("connection", (socket) => {

    socket.on("join_chat", async ({ chatId }) => {
      socket.join(chatId);
    });

    socket.on("leave_chat", async ({ chatId }) => {
      socket.leave(chatId);
    });

    socket.on("send_message", async ({ chatId, sender, message }) => {
      try {
        const chatRoom = await ChatRoom.findOne({ chatId });

        const messageContent = {
          sender,
          message,
          timestamp: Date.now(),
        };

        chatRoom.messages.push(messageContent);

        await chatRoom.save();

        io.to(chatId).emit("chat_message", { chatId, message: messageContent });
      } catch (error) {
        socket.emit("error", { message: "Failed to send message" });
      }
    });

    socket.on("disconnect", () => {});
  });
};
export default chats;
