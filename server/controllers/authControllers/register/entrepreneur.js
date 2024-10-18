import { Entrepreneur, Investor, WarehouseOwner } from "../../../models/index.js";
import login from "../login/login.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

const registerEntrepreneur = async (req, res) => {
  const { fullName, email, password, phoneNumber, country, state, city, entrepreneurType, profilePicture } = req.body;

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

    // const hashedPassword = await bcrypt.hash(password, 10);
    const userId = crypto.randomBytes(16).toString("hex");

    const newEntrepreneur = new Entrepreneur({
      userId,
      fullName,
      email,
      password: password,
      phoneNumber,
      profilePicture: profilePicture ? Buffer.from(profilePicture, "base64") : null,
      location: { country, state, city },
      registeredBusinesses: [],
      entrepreneurType,
      chats: [],
      proposalsSent: [],
      proposalsReceived: [],
    });

    await newEntrepreneur.save();

    await login(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

export default registerEntrepreneur;
