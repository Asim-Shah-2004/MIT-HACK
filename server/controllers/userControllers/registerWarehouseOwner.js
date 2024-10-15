import bcrypt from "bcrypt";
import { WarehouseOwner } from "../../models/index.js";

const registerWarehouseOwner = async (req, res) => {
  const { fullName, email, password, phoneNumber, profilePic } = req.body;

  if (!fullName || !email || !password || !phoneNumber) {
    return res.status(400).json({ msg: "Full name, email, password, and phone number are required" });
  }

  try {
    let warehouseOwner = await WarehouseOwner.findOne({ email });
    if (warehouseOwner) {
      return res.status(400).json({ msg: "Warehouse owner with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    warehouseOwner = new WarehouseOwner({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      profilePic,
      properties: [],  
    });

    await warehouseOwner.save();

    res.status(201).json({ msg: "Warehouse owner registered successfully", warehouseOwner });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export default registerWarehouseOwner;
