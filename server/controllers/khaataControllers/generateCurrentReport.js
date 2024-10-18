// controllers/reportController.js
import {Transaction} from '../../models/index.js';

// Current report controller
const generateCurrentReport = async (req, res) => {
  try {
    const transactions = await Transaction.find({});

    let totalProfit = 0;
    let totalLoss = 0;

    transactions.forEach(transaction => {
      const profit = transaction.sellingPrice - transaction.buyingPrice;
      if (profit > 0) {
        totalProfit += profit;
      } else {
        totalLoss += Math.abs(profit);
      }
    });

    res.json({ transactions, profit: totalProfit, loss: totalLoss });
  } catch (error) {
    console.error('Error fetching current report:', error);
    res.status(500).json({ error: 'An error occurred while generating the report.' });
  }
};

export default generateCurrentReport;
