import nodemailer from 'nodemailer';
import { WarehouseOwner, InventorySpace, Entrepreneur, Investor } from "../../models/index.js";
import { logger } from '../../utils/index.js';

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${to}`);
  } catch (error) {
    logger.error('Error sending email:', error);
  }
};

const generateEmailContent = (customer, inventorySpace, agreedRentedSpace, agreedPricePerSqFt, totalAgreedPrice, additionalDetails, warehouseOwner, bankName, branchName, ifscCode, amount) => {
  return `
    <h2>Rental Agreement Finalized</h2>
    <p>Dear ${customer.fullName},</p>
    <p>Your request for renting space at <strong>${inventorySpace.propertyName}</strong> has been finalized. Here are the details:</p>
    <ul>
      <li><strong>Property:</strong> ${inventorySpace.propertyName}</li>
      <li><strong>Agreed Space:</strong> ${agreedRentedSpace} sq ft</li>
      <li><strong>Price per Sq Ft:</strong> ₹${agreedPricePerSqFt}</li>
      <li><strong>Total Agreed Price:</strong> ₹${totalAgreedPrice}</li>
      <li><strong>Additional Details:</strong> ${additionalDetails}</li>
      <li><strong>Payment Details:</strong></li>
      <ul>
        <li><strong>Bank Name:</strong> ${bankName}</li>
        <li><strong>Branch Name:</strong> ${branchName}</li>
        <li><strong>IFSC Code:</strong> ${ifscCode}</li>
        <li><strong>Amount:</strong> ₹${amount}</li>
      </ul>
    </ul>
    <p>Please contact us if you have any questions.</p>
    <p>Regards,<br>${warehouseOwner.fullName}</p>
  `;
};

const freezeInventorySpace = async (req, res) => {
  try {
    const { email: ownerEmail } = req.user;
    const { customerEmail, agreedRentedSpace, agreedPricePerSqFt, additionalDetails, inventoryId, bankName, branchName, ifscCode } = req.body;

    const warehouseOwner = await WarehouseOwner.findOne({ email: ownerEmail });
    if (!warehouseOwner) {
      return res.status(400).json({ message: "Warehouse owner not found." });
    }

    const customer = await WarehouseOwner.findOne({ email: customerEmail }) || 
                     await Investor.findOne({ email: customerEmail }) || 
                     await Entrepreneur.findOne({ email: customerEmail });

    if (!customer) {
      return res.status(400).json({ message: "Customer not found." });
    }

    const inventorySpace = await InventorySpace.findOne({ rentalID: inventoryId });
    if (!inventorySpace) {
      return res.status(404).json({ message: "Inventory space not found." });
    }

    const inventoryExists = warehouseOwner.inventories.some(inventory => inventory.inventoryId === inventoryId);
    if (!inventoryExists) {
      return res.status(400).json({ message: "This inventory space does not belong to the warehouse owner." });
    }

    if (agreedRentedSpace > inventorySpace.rentedSpace) {
      return res.status(400).json({ message: "Agreed rented space exceeds available space." });
    }

    if (agreedRentedSpace <= 0) {
      return res.status(400).json({ message: "Agreed rented space must be greater than zero." });
    }

    const customerAlreadyExists = inventorySpace.customers.some(c => c.customerEmail === customerEmail);
    if (customerAlreadyExists) {
      return res.status(400).json({ message: "This customer has already frozen this inventory space." });
    }

    inventorySpace.customers.push({
      paymentStatusOwner: false,    
      customerEmail,
      agreedRentedSpace,
      agreedPricePerSqFt,
      additionalDetails,
    });

    inventorySpace.rentedSpace -= agreedRentedSpace;
    await inventorySpace.save();

    const totalAgreedPrice = agreedRentedSpace * agreedPricePerSqFt;

    const emailContent = generateEmailContent(customer, inventorySpace, agreedRentedSpace, agreedPricePerSqFt, totalAgreedPrice, additionalDetails, warehouseOwner, bankName, branchName, ifscCode, totalAgreedPrice);
    await sendEmail(customerEmail, "Finalized Rental Agreement for Inventory Space", emailContent);

    return res.status(200).json({ message: "Inventory space frozen and payment details emailed to customer." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export default freezeInventorySpace;
