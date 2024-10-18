import {Transaction} from '../../models/index.js';
 const calculateProfitLoss = async (req, res) => {
    try {
  
        const transactions = await Transaction.find();


        let totalProfit = 0;
        let totalLoss = 0;


        const transactionResults = transactions.map(transaction => {
            const { buyingPrice, sellingPrice, productPurchased, customerName } = transaction;
            const profitOrLoss = sellingPrice - buyingPrice; 

 
            if (profitOrLoss > 0) {
                totalProfit += profitOrLoss;
            } else if (profitOrLoss < 0) {
                totalLoss += Math.abs(profitOrLoss);
            }

            return {
                customerName,
                productPurchased,
                buyingPrice,
                sellingPrice,
                profitOrLoss
            };
        });

        res.status(200).json({
            transactions: transactionResults,
            totalProfit,
            totalLoss
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export default calculateProfitLoss;