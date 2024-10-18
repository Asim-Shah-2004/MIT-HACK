import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    customerName: { 
        type: String, 
        required: true 
    },
    productPurchased: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true // This can represent the selling price
    },
    buyingPrice: { 
        type: Number, 
        required: true // New field for the buying price of the product
    },
    sellingPrice: { 
        type: Number, 
        required: true // New field for the selling price (if different from price)
    },
    date: { 
        type: Date, 
        default: Date.now // Automatically sets the date of transaction
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
