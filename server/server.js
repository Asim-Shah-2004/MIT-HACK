import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import "dotenv/config"
import logger from './utils/logger.js';
import { connectDB } from "./services/index.js"

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});


app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});