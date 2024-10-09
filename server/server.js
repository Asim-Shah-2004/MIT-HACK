import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import "dotenv/config"
import logger from './utils/logger.js';
import { connectDB } from "./services/index.js"
import { registerRouter } from './routers/index.js';
import { proposal,chatRoom } from './middlewares/index.js';

const PORT = process.env.PORT;
const app = express();

connectDB();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(proposal)
app.use(chatRoom)

app.use('/register', registerRouter);

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});


app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});