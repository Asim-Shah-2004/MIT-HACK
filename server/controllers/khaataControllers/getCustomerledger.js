import {Transaction} from '../../models/index.js';
const getCustomerLedger = async (req, res) => {
    try {
        const { customerName } = req.params;
        console.log("Customer Name:", customerName); // Log the customer name
        const customerTransactions = await Transaction.find({ customerName });
        console.log("Customer Transactions:", customerTransactions); // Log the transactions

        const totalOutstanding = customerTransactions.reduce((acc, transaction) => acc + transaction.outstanding, 0);

        res.status(200).json({
            transactions: customerTransactions,
            totalOutstanding
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching customer ledger', error });
    }
};
export default getCustomerLedger;
