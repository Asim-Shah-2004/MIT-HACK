import { ChatRoom } from "../../models/index.js";

const specificChatDetails = async (req, res) => {
  const { chatId } = req.body
  
  try {
    const chatRoom = await ChatRoom.findOne({chatId})
    const chat = chatRoom.messages
    if(!chat) return res.status(404).json({ message: "chats not found" });
    res.status(200).send(chat)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default specificChatDetails;
