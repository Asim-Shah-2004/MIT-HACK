
import {Transaction} from '../../models/index.js';


 const getAllTransactions = async (req, res) => {
    try {

        const transactions = await Transaction.find();

        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export default getAllTransactions;