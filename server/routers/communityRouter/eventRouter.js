import express from 'express';
import {createEvent,registerEvents,getEvents} from '../../controllers/index.js';

const eventRouter = express.Router();

eventRouter.post('/create', createEvent);
eventRouter.post('/register', registerEvents);
eventRouter.get('/getEvents',getEvents)

export default eventRouter;
