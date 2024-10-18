import express from 'express';
import { getDailyTotalSales } from '../../controllers/index.js';

const salesRouter = express.Router();

salesRouter.get('/daily-sales/:date', getDailyTotalSales);

export default salesRouter;
