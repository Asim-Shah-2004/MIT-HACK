import crypto from 'crypto';
import { Entrepreneur , Investor , WarehouseOwner , ChatRoom , Proposal , Doc } from "../models/index.js";

const proposal = async (io) => {
    io.on('connection', (socket) => {
        socket.on('sendProposal', async ({senderId, recipientId, userType, reasonToConnect, attachment}) => {
            try {
                let sender;
                let recipient;
                
                if (userType === 'Entrepreneur') {
                    sender = await Entrepreneur.findOne({senderId})
                    recipient = await Entrepreneur.findOne({senderId}) || await Investor.findOne({senderId}) || await WarehouseOwner.findOne({senderId})
                } else if (userType === 'Investor') {
                    sender = await Investor.findOne({senderId})
                    recipient = await Entrepreneur.findOne({senderId}) || await Investor.findOne({senderId}) || await WarehouseOwner.findOne({senderId})
                }else if(userType === 'warehouseOwner'){
                    sender = await WarehouseOwner.findOne({senderId})
                    recipient = await Entrepreneur.findOne({senderId}) || await Investor.findOne({senderId}) || await WarehouseOwner.findOne({senderId})
                }

                if (!sender || !recipient) {
                    socket.emit('error', { message: 'Sender or recipient not found' });
                    return;
                }

                const proposalId = crypto.randomBytes(16).toString('hex');

                const newProposal = new Proposal({
                    proposalId,
                    reasonToConnect,
                    createdAt: Date.now(),
                    attachment: attachment || null,
                });

                await newProposal.save()

                sender.proposalsSent.push({
                    proposalId,
                    status: 'pending',
                    receiverEmail : recipient.email,
                    receiverName : recipient.fullName,
                })

                await sender.save()

                recipient.proposalsReceived.push({
                    proposalId,
                    status: 'pending',
                    senderEmail : sender.email,
                    senderName : sender.fullName,
                })

                await recipient.save()

                socket.emit('proposalSent', { proposalId, recipientId });

            } catch (error) {
                socket.emit('error', { message: 'Failed to send proposal' });
            }
        });

        socket.on('acceptProposal', async ({ userId, proposalId, userType }) => {
            try {
                let user;
                if (userType === 'Entrepreneur') {
                    user = await Entrepreneur.findOne({userId})
                } else if (userType === 'Investor') {
                    user = await Investor.findOne({userId})
                }else if(userType === 'warehouseOwner'){
                    user = await WarehouseOwner.findOne({userId})
                }

                if (!user) {
                    socket.emit('error', { message: 'User not found' });
                    return;
                }

                const proposal = user.proposalsReceived.find(
                    (p) => p.proposalId === proposalId
                );

                if (!proposal || proposal.status !== 'pending') {
                    socket.emit('error', { message: 'Invalid proposal or already processed' });
                    return;
                }

                proposal.status = 'accepted';
                await user.save();

                const chatId = crypto.randomBytes(16).toString('hex');
                const docID = crypto.randomBytes(16).toString('hex');

                const chatRoom = new ChatRoom({
                    chatId,
                    participants: [
                        { email: user.email, name: user.fullName },
                        { email: proposal.senderEmail, name: proposal.senderName }
                    ],
                    messages: [],
                    createdAt : Date.now(),
                    docID
                });

                const doc = new Doc(
                    {
                        docID,
                        messages: ""
                    }
                )

                await chatRoom.save();
                await doc.save();

                user.chats.push({ personName: proposal.senderName, chatId });
                await user.save();

                socket.emit('Proposal accepted and chatRoomCreated', { chatId});
                
            } catch (error) {
                socket.emit('error', { message: 'Failed to accept proposal and create chat room' });
            }
        });

        socket.on('rejectProposal', async ({ userId, proposalId, userType }) => {
            try {
                let user;

                if (userType === 'Entrepreneur') {
                    user = await Entrepreneur.findOne({userId})
                } else if (userType === 'Investor') {
                    user = await Investor.findOne({userId})
                }else if(userType === 'warehouseOwner'){
                    user = await WarehouseOwner.findOne({userId})
                }
        
                if (!user) {
                    socket.emit('error', { message: 'User not found' });
                    return;
                }
        
                const proposal = user.proposals.find(
                    (p) => p.proposalId === proposalId
                );
        
                if (!proposal || proposal.status !== 'pending') {
                    socket.emit('error', { message: 'Invalid proposal or already processed' });
                    return;
                }
        
                user.proposals.pull({ proposalId: proposalId });
                await user.save();
        
                socket.emit('proposalRejected', { message: 'Proposal has been rejected and removed.' });
                
            } catch (error) {
                socket.emit('error', { message: 'Failed to reject and remove proposal' });
            }
        });
        

        socket.on('disconnect', () => {
        });
    });
};

export default proposal;
