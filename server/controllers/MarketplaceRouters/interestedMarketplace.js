import {Product,Entrepreneur,Investor,WarehouseOwner,ChatRoom,Doc} from '../../models/index.js';
import crypto from "crypto"

export const interestedMarketplace = async (req, res) => {
    const { email } = req.user
    const { productID } = req.body;


    try {
        const user = await Entrepreneur.findOne({email}) || await Investor.findOne({email}) || await WarehouseOwner.findOne({email}) 
        const product = await Product.findOne({productID})
        const creator = await Entrepreneur.findOne({email})
        const chatId = crypto.randomBytes(16).toString("hex");
        const docID = crypto.randomBytes(16).toString("hex");
        
        if(!creator) return res.status(400).send({message:"creator must be entrepreuner"})
            
        const chatRoom = new ChatRoom({
            chatId,
            participants: [
              { email: user.email, name: user.fullName },
              { email: product.creatorEmail, name: product.creatorName },
            ],
            messages: [],
            createdAt: Date.now(),
            docID,
          });
  
          const doc = new Doc({
            docID,
            participants: [user.email, product.creatorName],
          });
  
          await chatRoom.save();
          await doc.save();
          
            if (user.chats.find(chat => chat.personEmail === product.creatorEmail)) {
                return res.status(400).send({ message: "Chat already exists" });
            }
        
            if (creator.chats.find(chat => chat.personEmail === user.email)) {
                return res.status(400).send({ message: "Chat already exists" });
            }

          user.chats.push({personEmail:product.creatorEmail,personName:product.creatorName,chatId:chatId})
          creator.chats.push({personEmail:user.email,personName:user.fullName,chatId:chatId})

          await user.save()
          await creator.save()

          return res.send({message:"successfully created chatroom"})

    } catch (error) {
        console.error('Error adding product:', error);
        return res.status(500).json({ message: 'Failed to add product.' });
    }
};

export default interestedMarketplace;
