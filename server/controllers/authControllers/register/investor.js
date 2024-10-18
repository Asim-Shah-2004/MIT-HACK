import { Investor, WarehouseOwner, Entrepreneur } from "../../../models/index.js";
import login from "../login/login.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

const registerInvestor = async (req, res) => {
  const {
    fullName,
    email,
    password,
    phoneNumber,
    country,
    state,
    city,
    role,
    interestedIndustries,
    investmentAmount,
    investmentType,
    ruralInterest,
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
    const userId = crypto.randomBytes(16).toString("hex");

    const newInvestor = new Investor({
      userId,
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      profilePicture: profilePicture ? Buffer.from(profilePicture, "base64") : null,
      location: { country, state, city },
      role,
      interestedIndustries,
      amountLookingToInvest: investmentAmount,
      investmentType,
      interestedInRuralBusiness: ruralInterest,
      engagementType,
      proposalsSent: [],
      proposalsReceived: [],
      chats: [],
      investmentHistory: [],
    });

    await newInvestor.save();

    await login(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

export default registerInvestor;
