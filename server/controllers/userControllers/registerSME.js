import bcrypt from "bcrypt";
import {SME} from "../../models/index.js"

const registerSME = async (req, res) => {
  const { fullName, email, password, phoneNumber, location, profilePic, 
        businessState, businessType, challengesFaced, goalsAndAspirations } = req.body;

  if (!fullName || !email || !password || !phoneNumber) {
    return res.status(400).json({ msg: "Full name, email, password, and phone number are required" });
  }

  try {
    let sme = await SME.findOne({ email });
    if (sme) {
      return res.status(400).json({ msg: "SME with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    sme = new SME({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      location,
      profilePic,
      businessState,
      businessType,
      challengesFaced,
      goalsAndAspirations,
      chats: [],
    });

    await sme.save();

    res.status(201).json({ msg: "SME registered successfully", sme });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

export default registerSME;