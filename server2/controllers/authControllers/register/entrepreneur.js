import Entrepreneur from "../models/Entrepreneur.js"; 
import Investor from "../models/Investor.js"; 
import WarehouseOwner from "../models/WarehouseOwner.js"; 
import bcrypt from "bcryptjs"; 
import crypto from "crypto"; 

const registerEntrepreneur = async (req, res) => {
  const {
    fullName,
    email,
    password,
    phoneNumber,
    location,
    entrepreneurType,
    profilePicture,
  } = req.body;

  try {
    const existingEntrepreneur = await Entrepreneur.findOne({ email });
    const existingInvestor = await Investor.findOne({ email });
    const existingWarehouseOwner = await WarehouseOwner.findOne({ email });

    if (existingEntrepreneur) {
      return res.status(400).json({ message: "Already registered as an entrepreneur." });
    }
    if (existingInvestor) {
      return res.status(400).json({ message: "Already registered as an investor." });
    }
    if (existingWarehouseOwner) {
      return res.status(400).json({ message: "Already registered as a warehouse owner." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const entrepreneurId = crypto.randomBytes(16).toString("hex");

    const newEntrepreneur = new Entrepreneur({
      entrepreneurId,
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      profilePicture: profilePicture ? Buffer.from(profilePicture, "base64") : null,
      location,
      registeredBusinesses: [],
      entrepreneurType,
      chats: [],
      proposalsSent: [],
      proposalsReceived: [],
    });

    await newEntrepreneur.save();
    res.status(201).json({ message: "Entrepreneur registered successfully!", entrepreneurId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

export default registerEntrepreneur;
