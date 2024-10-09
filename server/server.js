import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import "dotenv/config"
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
    console.log(`Server is running on port ${PORT}`);
});