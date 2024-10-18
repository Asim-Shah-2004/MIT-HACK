import { Entrepreneur, Investor, WarehouseOwner } from "../../../models/index.js";
import login from "../login/login.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

const registerWarehouseOwner = async (req, res) => {
  const { fullName, email, password, phoneNumber, profilePic, country, state, city } = req.body;
    
  if (!fullName || !email || !password || !phoneNumber || !country || !state || !city) {
    return res.status(400).json({ msg: "Full name, email, password, phone number, country, state, and city are required." });
  }

  try {
    const existingEntrepreneur = await Entrepreneur.findOne({ email });
    const existingInvestor = await Investor.findOne({ email });
    const existingWarehouseOwner = await WarehouseOwner.findOne({ email });

    if (existingWarehouseOwner) {
      return res.status(400).json({ msg: "Already registered as a warehouse owner." });
    }
    if (existingEntrepreneur) {
      return res.status(400).json({ msg: "Already registered as an entrepreneur." });
    }
    if (existingInvestor) {
      return res.status(400).json({ msg: "Already registered as an investor." });
    }

    const userId = crypto.randomBytes(16).toString("hex");
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    const warehouseOwner = new WarehouseOwner({
      userId,
      fullName,
      email,
      password,
      phoneNumber,
      location: { country, state, city },
      chats: [],
      profilePic: profilePic ? Buffer.from(profilePic, "base64") : null,
      posts:[],
      inventories:[]
    });

    await warehouseOwner.save();

    await login(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error. Please try again." });
  }
};

export default registerWarehouseOwner;
