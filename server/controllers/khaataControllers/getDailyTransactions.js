import {Transaction} from '../../models/index.js';
export const getDailyTransactions = async (req, res) => {
    try {
        const { date } = req.params;
        const transactions = await Transaction.find({
            date: {
                $gte: new Date(date),
                $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)),
            },
        });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching daily transactions', error });
    }
};
export default getDailyTransactions;