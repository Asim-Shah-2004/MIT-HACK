import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import "dotenv/config";
import logger from './utils/logger.js';
import http from 'http';

import {Server} from 'socket.io';
import { connectDB } from "./services/index.js";
import { registerRouter , postRouter ,loginRouter , eventRouter } from './routers/index.js';
import { proposal,chatRoom } from './webSockets/index.js';
import {authenticateToken} from "./middlewares/index.js"

const PORT = process.env.PORT;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

connectDB();

app.use(bodyParser.json());
app.use(morgan('dev'));

/**
 * VVIP Remember to send ID created anywhere to frontend as it will be used
 * to identify things such as posts proposals etc
 */

app.use('/register', registerRouter);
app.use('/login',loginRouter)

// app.use(authenticateToken)

proposal(io)
chatRoom(io)

app.use('/post',postRouter)
app.use('/events',eventRouter)

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});


app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});