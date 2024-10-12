import { SME, Investor, ChatRoom } from "../models/index.js";


const chatRoom = async (io) => {
    io.on('connection', (socket) => {

        socket.on('send_message', async ({ senderId, userType, recipientEmail, message }) => {
            try {
                let sender;

                if (userType === 'sme') {
                    sender = await SME.findById(senderId);
                } else if (userType === 'investor') {
                    sender = await Investor.findById(senderId);
                }else if(userType === 'mentor'){
                    user = await Mentor.findById(userId);
                }

                if (!sender) {
                    socket.emit('error', { message: 'Sender not found' });
                    return;
                }

                const chat = sender.chats.find(chat => chat.personName === recipientEmail);
                
                if (!chat) {
                    socket.emit('error', { message: 'Chat not found' });
                    return;
                }

                const chatId = chat.chatId;
                const chatRoom = await ChatRoom.findOne({ chatId });

                if (!chatRoom) {
                    socket.emit('error', { message: 'Chat room not found' });
                    return;
                }

                const messageData = {
                    senderId,
                    message,
                    timestamp: new Date()
                };

                chatRoom.messages.push(messageData);
                await chatRoom.save();

                io.to(chatId).emit('chat_message', { chatId, message: messageData });

            } catch (error) {
                socket.emit('error', { message: 'Failed to send message' });
            }
        });

        socket.on('disconnect', () => {
        });
    });
};

export default chatRoom;
