import http from 'http';
import express from 'express';
import { Server } from "socket.io";
import crypto from 'crypto';
import { SME, ChatRoom,Investor } from "../../models/index.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server)

const proposal = async () => {
    io.on('connection', (socket) => {

        socket.on('sendProposal', async ({ senderId, recipientId, userType, proposalDetails }) => {
            try {
                let sender;
                let recipient;
                
                if (userType === 'sme') {
                    sender = await SME.findById(senderId);
                    recipient = await SME.findById(recipientId) || await Investor.findById(recipientId);
                } else if (userType === 'investor') {
                    sender = await Investor.findById(senderId);
                    recipient = await SME.findById(recipientId) || await Investor.findById(recipientId);
                }

                if (!sender || !recipient) {
                    socket.emit('error', { message: 'Sender or recipient not found' });
                    return;
                }

                const proposalId = crypto.randomBytes(16).toString('hex');

                const proposal = {
                    proposalId,
                    status: 'pending',
                    senderEmail: sender.email,
                    senderName: sender.fullName,
                    details: proposalDetails
                };

                recipient.proposals.push(proposal);
                await recipient.save();

                socket.emit('proposalSent', { proposalId, recipientId });

            } catch (error) {
                socket.emit('error', { message: 'Failed to send proposal' });
            }
        });

        socket.on('acceptProposal', async ({ userId, proposalId, userType }) => {
            try {
                let user;
                if (userType === 'sme') {
                    user = await SME.findById(userId);
                } else if (userType === 'investor') {
                    user = await Investor.findById(userId);
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

                proposal.status = 'accepted';
                await user.save();

                const chatId = crypto.randomBytes(16).toString('hex');

                const chatRoom = new ChatRoom({
                    chatId,
                    participants: [
                        { email: user.email, name: user.fullName },
                        { email: proposal.senderEmail, name: proposal.senderName }
                    ],
                    messages: [],
                });

                await chatRoom.save();

                user.chats.push({ personName: proposal.senderName, chatId });
                await user.save();

                socket.emit('chatRoomCreated', { chatId, participants: chatRoom.participants });
                
            } catch (error) {
                socket.emit('error', { message: 'Failed to accept proposal and create chat room' });
            }
        });

        socket.on('disconnect', () => {
        });
    });
};

export default proposal;
