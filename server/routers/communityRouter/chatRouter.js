import express from 'express';
import {chatDetails,specificChatDetails} from '../../controllers/index.js';

const chatRouter = express.Router();

chatRouter.get('/details', chatDetails);
chatRouter.post('/specific',specificChatDetails)

export default chatRouter;
