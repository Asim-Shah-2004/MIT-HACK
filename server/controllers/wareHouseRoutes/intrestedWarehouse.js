import crypto from "crypto"
import { WarehouseOwner,Entrepreneur, Investor , ChatRoom,Doc } from "../../models/index.js";

const Intrested = async (req, res) => {
  try {
    const { email: ownerEmail } = req.user;
    const { customerEmail} = req.body;

    const warehouseOwner = await WarehouseOwner.findOne({ email: customerEmail });
    if (!warehouseOwner) {
      return res.status(400).json({ message: "Warehouse owner not found." });
    }

    const customer = await WarehouseOwner.findOne({ email: ownerEmail }) || 
                     await Investor.findOne({ email: ownerEmail }) || 
                     await Entrepreneur.findOne({ email: ownerEmail });

    if (!customer) {
      return res.status(400).json({ message: "Customer not found." });
    }

        const chatId = crypto.randomBytes(16).toString("hex");
        const docID = crypto.randomBytes(16).toString("hex");

        const chatRoom = new ChatRoom({
          chatId,
          participants: [
            { email: warehouseOwner.email, name: warehouseOwner.fullName },
            { email: customer.email, name: customer.fullName },
          ],
          messages: [],
          createdAt: Date.now(),
          docID,
        });

        const doc = new Doc({
          docID,
          participants: [warehouseOwner.email, customer.email],
        });

        await chatRoom.save();
        await doc.save();
  
        if (customer.chats.find(chat => chat.personEmail === warehouseOwner.email)) return res.status(400).send({message:"already chat exists"})
        if (warehouseOwner.chats.find(chat => chat.personEmail === customer.email)) return res.status(400).send({message:"already chat exists"})

        customer.chats.push({ personName: warehouseOwner.fullName, personEmail:warehouseOwner.email ,chatId });
        warehouseOwner.chats.push({ personName: customer.fullName, personEmail:customer.email ,chatId });

        await customer.save();
        await warehouseOwner.save();

    
    return res.status(200).json({ message: "made chatroom successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export default Intrested;
