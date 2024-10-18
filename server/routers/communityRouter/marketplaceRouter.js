import express from 'express';
import {addProduct,interestedMarketplace} from '../../controllers/index.js';

const marketPlaceRouter = express.Router();

marketPlaceRouter.post('/add', addProduct);
marketPlaceRouter.post('/intrested', interestedMarketplace);

export default marketPlaceRouter;
