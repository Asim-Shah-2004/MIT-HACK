import { Investor, Entrepreneur, WarehouseOwner, ChatRoom } from "../../models/index.js";

const chatDetails = async (req, res) => {
  const { email } = req.user;
  try {
    const user =
      await Investor.findOne({ email }) ||
      await Entrepreneur.findOne({ email }) ||
      await WarehouseOwner.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const chatDetails = await Promise.all(
      user.chats.map(async (chat) => {
        const { chatId, personEmail } = chat;

        const person =
          await Investor.findOne({ email: personEmail }) ||
          await Entrepreneur.findOne({ email: personEmail }) ||
          await WarehouseOwner.findOne({ email: personEmail });

        if (!person) {
          return null; 
        }

        const profilePic = person.profilePicture || person.profilePic;

        const chatRoom = await ChatRoom.findOne({ chatId });

        return {
          chatId,
          name: person.fullName,
          profilePic, 
          lastMessage: chatRoom?.lastMessage || "No messages yet",
        };
      })
    );

    // Filter out any null values (in case the person or chat room wasn't found)
    const filteredChatDetails = chatDetails.filter((detail) => detail !== null);
    
    res.json(filteredChatDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default chatDetails;
