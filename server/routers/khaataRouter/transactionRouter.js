import express from 'express';
import { addTransaction, getDailyTransactions,getCustomerLedger,getAllTransactions,calculateProfitLoss,generateCurrentReport} from '../../controllers/index.js';

const transactionRouter = express.Router();


transactionRouter.post('/add', addTransaction);

transactionRouter.get('/all', getAllTransactions);
transactionRouter.get('/profit-loss', calculateProfitLoss);

transactionRouter.get('/daily-transactions/:date', getDailyTransactions);

transactionRouter.get('/ledger/:customerName', getCustomerLedger);
transactionRouter.get('/current-report',generateCurrentReport);

export default transactionRouter;
