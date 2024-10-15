import {Investor,WarehouseOwner,Entrepreneur} from "../../../models/index.js"
import bcrypt from "bcryptjs";
import crypto from "crypto";

const registerInvestor = async (req, res) => {
  const {
    fullName,
    email,
    password,
    phoneNumber,
    location,
    role,
    interestedIndustries,
    amountLookingToInvest,
    investmentType,
    interestedInRuralBusiness,
    engagementType,
    profilePicture, 
  } = req.body;

  try {
    const existingInvestor = await Investor.findOne({ email });
    const existingEntrepreneur = await Entrepreneur.findOne({ email });
    const existingWarehouseOwner = await WarehouseOwner.findOne({ email });

    if (existingInvestor) {
      return res.status(400).json({ message: "Already registered as an investor." });
    }
    if (existingEntrepreneur) {
      return res.status(400).json({ message: "Already registered as an entrepreneur." });
    }
    if (existingWarehouseOwner) {
      return res.status(400).json({ message: "Already registered as a warehouse owner." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const investorId = crypto.randomBytes(16).toString("hex");

    const newInvestor = new Investor({
      investorId,
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      profilePicture: profilePicture ? Buffer.from(profilePicture, "base64") : null,
      location,
      role,
      interestedIndustries,
      amountLookingToInvest,
      investmentType,
      interestedInRuralBusiness,
      engagementType,
      proposals: [],
      chats: [],
      investmentHistory: [],
    });

    await newInvestor.save();
    res.status(201).json({ message: "Investor registered successfully!", investorId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

export default registerInvestor;
