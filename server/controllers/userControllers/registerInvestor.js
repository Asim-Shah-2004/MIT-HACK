import { Investor } from "../../models/index.js";
import bcrypt from 'bcrypt';

const registerInvestor = async (req, res) => {
  const {
    fullName,
    email,
    password,
    role,
    location,
    interestedIndustries,
    investmentAmount,
    investmentType,
    ruralBusinessInterest,
    engagementType,
  } = req.body;
  
  if (!fullName || !email || !password || !role) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const existingInvestor = await Investor.findOne({ email });
    if (existingInvestor) {
      return res.status(400).json({ message: 'Investor already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newInvestor = new Investor({
      fullName,
      email,
      password: hashedPassword,
      role,
      location,
      interestedIndustries,
      investmentAmount,
      investmentType,
      ruralBusinessInterest,
      engagementType,
      chats: [],
      proposals: [],
      posts: [],
    });

    await newInvestor.save();

    res.status(201).json({ message: 'Investor registered successfully', investor: newInvestor });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export default registerInvestor;
