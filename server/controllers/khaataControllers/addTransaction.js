import { Transaction } from '../../models/index.js';

const addTransaction = async (req, res) => {
  const { customerName, productPurchased, buyingPrice, sellingPrice } = req.body;

  // Create a new transaction instance
  const newTransaction = new Transaction({
    customerName,
    productPurchased,
    price: sellingPrice, 
    buyingPrice,
    sellingPrice,
    createdAt: Date.now(), 
  });

  try {
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction); // Respond with the created transaction
  } catch (error) {
    console.error('Error adding transaction:', error);
    res.status(500).json({ message: 'Error adding transaction', error });
  }
};

export default addTransaction;
