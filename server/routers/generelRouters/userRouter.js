import express from 'express';
import {getDetails,getAllProposals,updateDetails,getAllUsers} from '../../controllers/index.js';

const userRouter = express.Router();

userRouter.post('/details', getDetails);
userRouter.get('/getAllProposals',getAllProposals)
userRouter.patch('/update',updateDetails)
userRouter.get('/getAllUsers',getAllUsers)

export default userRouter;
