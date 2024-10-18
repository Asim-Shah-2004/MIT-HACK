import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 
import './KhataBook.css';

const KhataBook = () => {
  const [transactions, setTransactions] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [productPurchased, setProductPurchased] = useState('');
  const [buyingPrice, setBuyingPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [price, setPrice] = useState(''); 
  const [customerLedger, setCustomerLedger] = useState([]);
  const backendUrl = import.meta.env.VITE_SERVER_URL; 

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${backendUrl}/transactions/all`);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const addTransaction = async () => {
    const newTransaction = {
      customerName,
      productPurchased,
      price: parseFloat(price), 
      buyingPrice: parseFloat(buyingPrice),
      sellingPrice: parseFloat(sellingPrice),
    };

    try {
      await axios.post(`${backendUrl}/transactions/add`, newTransaction);
      fetchTransactions(); 
     
      setCustomerName('');
      setProductPurchased('');
      setBuyingPrice('');
      setSellingPrice('');
      setPrice('');
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const generateCurrentReport = async () => {
    try {
      const response = await axios.get(`${backendUrl}/transactions/current-report`);
      const { transactions, profit, loss } = response.data;

      const doc = new jsPDF();
      doc.setFont("courier");
      doc.text("Current Transaction Report", 14, 10);
      doc.autoTable({
        head: [['Customer Name', 'Product Purchased', 'Buying Price', 'Selling Price', 'Price', 'Date']],
        body: transactions.map(transaction => [
          transaction.customerName,
          transaction.productPurchased,
          transaction.buyingPrice,
          transaction.sellingPrice,
          transaction.price,
          new Date(transaction.createdAt).toLocaleDateString(),
        ]),
        startY: 20,
      });
      doc.text(`Total Profit: ${profit}`, 14, doc.autoTable.previous.finalY + 10);
      doc.text(`Total Loss: ${loss}`, 14, doc.autoTable.previous.finalY + 20);

      doc.save('current_report.pdf');
    } catch (error) {
      console.error('Error generating current report:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="khata-book-container">
      <h1 className="header">Khata Book</h1>

      {/* Form to add new transaction */}
      <div className="transaction-form">
        <h2>Add Transaction</h2>
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Product Purchased"
          value={productPurchased}
          onChange={(e) => setProductPurchased(e.target.value)}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Buying Price"
          value={buyingPrice}
          onChange={(e) => setBuyingPrice(e.target.value)}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Selling Price"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
          className="input-field"
        />

        <button onClick={addTransaction} className="add-transaction-btn">Add Transaction</button>
      </div>

      {/* Button to generate current report */}
      <button onClick={generateCurrentReport} className="current-report-btn">Generate Current Report</button>

      {/* Display all transactions */}
      <h2>All Transactions</h2>
      {transactions.length > 0 ? (
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Product Purchased</th>
              <th>Buying Price</th>
              <th>Selling Price</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.customerName}</td>
                <td>{transaction.productPurchased}</td>
                <td>{transaction.buyingPrice}</td>
                <td>{transaction.sellingPrice}</td>
                <td>{transaction.price}</td>
                <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions found</p>
      )}

      {/* Display Customer Ledger */}
      <h2>Customer Ledger for {customerName}</h2>
      {customerLedger.length > 0 ? (
        <table className="ledger-table">
          <thead>
            <tr>
              <th>Product Purchased</th>
              <th>Buying Price</th>
              <th>Selling Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {customerLedger.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.productPurchased}</td>
                <td>{transaction.buyingPrice}</td>
                <td>{transaction.sellingPrice}</td>
                <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No ledger found for this customer</p>
      )}
    </div>
  );
};

export default KhataBook;
