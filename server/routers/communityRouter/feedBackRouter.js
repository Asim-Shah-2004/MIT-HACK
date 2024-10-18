import express from 'express';
import {feedBack} from '../../controllers/index.js';

const feedBackRouter = express.Router();

feedBackRouter.post('/', feedBack);

export default feedBackRouter;
