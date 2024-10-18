import { InventorySpace } from "../../models/index.js";
import nodemailer from "nodemailer";
import { createCanvas } from "canvas";
import { logger } from "../../utils/index.js";

const sendEmail = async (to, subject, htmlContent, attachment) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
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
      attachments: attachment ? [{ filename: "invoice.png", content: attachment }] : [],
    };

    await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${to}`);
  } catch (error) {
    logger.error("Error sending email:", error);
  }
};

const generateInvoice = async (customerEmail, rentalDetails) => {
  const canvas = createCanvas(600, 400);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#f9f9f9";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0056b3";
  ctx.fillRect(0, 0, canvas.width, 80);
  ctx.fillStyle = "#fff";
  ctx.font = "30px Arial";
  ctx.fillText("INVOICE", 20, 50);

  ctx.fillStyle = "#000";
  ctx.font = "18px Arial";
  ctx.fillText(`Invoice for: ${customerEmail}`, 20, 120);
  ctx.fillText(`Date: ${new Date().toLocaleDateString()}`, 20, 150);
  ctx.fillText(`Property: ${rentalDetails.propertyName}`, 20, 190);
  ctx.fillText(`Agreed Rented Space: ${rentalDetails.agreedRentedSpace} sq ft`, 20, 220);
  ctx.fillText(`Price per Sq Ft: ₹${rentalDetails.agreedPricePerSqFt}`, 20, 250);

  ctx.fillStyle = "#ff4500";
  ctx.font = "22px bold Arial";
  ctx.fillText(`Total Amount: ₹${rentalDetails.agreedRentedSpace * rentalDetails.agreedPricePerSqFt}`, 20, 290);

  ctx.strokeStyle = "#0056b3";
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

  ctx.fillStyle = "#0056b3";
  ctx.fillRect(0, canvas.height - 40, canvas.width, 40);
  ctx.fillStyle = "#fff";
  ctx.font = "14px Arial";
  ctx.fillText("Thank you for your payment!", 20, canvas.height - 15);

  return canvas.toBuffer();
};

const confirmOwnerPayment = async (req, res) => {
  try {
    const { inventoryId, customerEmail } = req.body;

    const inventorySpace = await InventorySpace.findOne({ rentalID: inventoryId });
    if (!inventorySpace) {
      return res.status(404).json({ message: "Inventory space not found." });
    }

    if (!Array.isArray(inventorySpace.customers)) {
      return res.status(500).json({ message: "Customers data is not in the expected format." });
    }

    const customer = inventorySpace.customers.find((c) => c.customerEmail === customerEmail);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found." });
    }



    customer.paymentStatusOwner = true;
    await inventorySpace.save();

    if (customer.paymentStatusOwner) {
      const invoiceBuffer = await generateInvoice(customer.customerEmail, customer);

      const emailContent = `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #0056b3;">Rental Payment Invoice</h2>
          <p>Dear <strong>${customer.customerEmail}</strong>,</p>
          <p>We are pleased to confirm that your rental payment for the property <strong>${
            inventorySpace.propertyName
          }</strong> has been successfully processed.</p>
          <p>Here are the details of your rental agreement:</p>
          <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
            <tr>
              <th style="border-bottom: 2px solid #ddd; padding: 8px; text-align: left;">Description</th>
              <th style="border-bottom: 2px solid #ddd; padding: 8px; text-align: left;">Details</th>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">Property</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${inventorySpace.propertyName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">Agreed Rented Space</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${customer.agreedRentedSpace} sq ft</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">Price per Sq Ft</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">₹${customer.agreedPricePerSqFt}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">Total Amount</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>₹${
                customer.agreedRentedSpace * customer.agreedPricePerSqFt
              }</strong></td>
            </tr>
          </table>
          <p>Attached is the invoice for your reference.</p>
          <p>If you have any questions or concerns, feel free to reach out to us.</p>
          <p>Thank you for choosing us for your rental needs!</p>
          <p>Best regards,</p>
          <p><strong>Your Company Name</strong></p>
          <footer style="margin-top: 20px; font-size: 12px; color: #888;">
            <p>This email was sent automatically. Please do not reply to this email.</p>
          </footer>
        </div>
      `;

      await sendEmail(customer.customerEmail, "Invoice for Rental Payment", emailContent, invoiceBuffer);
    }

    return res.status(200).json({ message: "Owner payment confirmed." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// const confirmCustomerPayment = async (req, res) => {
//   try {
//     const { inventoryId, customerEmail } = req.body;

//     const inventorySpace = await InventorySpace.findOne({ rentalID: inventoryId });
//     if (!inventorySpace) {
//       return res.status(404).json({ message: "Inventory space not found." });
//     }

//     if (!Array.isArray(inventorySpace.customers)) {
//       return res.status(500).json({ message: "Customers data is not in the expected format." });
//     }

//     const customer = inventorySpace.customers.find((c) => c.customerEmail === customerEmail);
//     if (!customer) {
//       return res.status(404).json({ message: "Customer not found." });
//     }

//     customer.paymentStatusCustomer = true;
//     await inventorySpace.save();

//     return res.status(200).json({ message: "Customer payment confirmed." });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error. Please try again later." });
//   }
// };

export { confirmOwnerPayment };
