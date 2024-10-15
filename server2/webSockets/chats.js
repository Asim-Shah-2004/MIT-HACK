import {ChatRoom} from "../models/index.js"

const chats = (io) =>{
    io.on('connection', (socket) => {
        socket.on('send_message', async ({ chatId, senderEmail , senderName ,message }) => {
            try{

                const chatRoom = await ChatRoom.findOne({chatId})
                
                const messageContent = {
                    senderEmail,
                    senderName,
                    message,
                    timestamp: Date.now()
                }

                chatRoom.messages.push(messageContent)

                await chatRoom.save()

                io.to(chatId).emit('chat_message', { chatId, message: messageContent});

            } catch (error) {
                socket.emit('error', { message: 'Failed to send message' });
            }
        });

        socket.on('disconnect', () => {
        });
    });
}
export default chats;