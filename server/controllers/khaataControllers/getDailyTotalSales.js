import {Transaction} from '../../models/index.js';

// Calculate total sales for a specific day
export const getDailyTotalSales = async (req, res) => {
    try {
        const { date } = req.params;
        const transactions = await Transaction.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(date),
                        $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)),
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: '$price' },
                },
            },
        ]);

        const totalSales = transactions[0] ? transactions[0].totalSales : 0;
        res.status(200).json({ totalSales });
    } catch (error) {
        res.status(500).json({ message: 'Error calculating daily total sales', error });
    }
};

export default getDailyTotalSales;