import bcrypt from "bcrypt";
import crypto from "crypto"
import { Entrepreneur,Investor,WarehouseOwner } from "../../../models/index.js";

const registerWarehouseOwner = async (req, res) => {
  const { fullName, email, password, phoneNumber, profilePic } = req.body;

  if (!fullName || !email || !password || !phoneNumber) {
    return res.status(400).json({ msg: "Full name, email, password, and phone number are required" });
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

    const warehouseOwnerID = crypto.randomBytes(16).toString("hex");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const warehouseOwner = new WarehouseOwner({
      warehouseOwnerID,
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      chats:[],
      profilePic : profilePic ? Buffer.from(profilePic, "base64") : null,
      properties: [],  
    });

    await warehouseOwner.save();

    res.status(201).json({ msg: "Warehouse owner registered successfully", warehouseOwnerID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error. Please try again." });
  }
};

export default registerWarehouseOwner;
