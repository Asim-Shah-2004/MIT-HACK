import {Entrepreneur,Investor,WarehouseOwner} from "../../../models/index.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await Entrepreneur.findOne({ email }) || 
               await Investor.findOne({ email }) || 
               await WarehouseOwner.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    let role = '';
    if (user instanceof Entrepreneur) {
      role = 'Entrepreneur';
    } else if (user instanceof Investor) {
      role = 'Investor';
    } else if (user instanceof WarehouseOwner) {
      role = 'Warehouse Owner';
    }

    const token = jwt.sign(
      {
        email: user.email,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        role: role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful!", token, role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

export default login;
