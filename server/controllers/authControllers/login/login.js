import jwt from "jsonwebtoken";
import { Entrepreneur, Investor, WarehouseOwner } from "../../../models/index.js";


const login = async (req, res) => {
  const { email, password } = req.body;
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;

  try {
    let user = (await Entrepreneur.findOne({ email })) || (await Investor.findOne({ email })) || (await WarehouseOwner.findOne({ email }));
    if (!user) return res.status(400).json({ message: "Invalid email or password." });

    // const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = password === user.password;
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid email or password." });

    let role = "";
    if (user instanceof Entrepreneur) role = "entrepreneur";
    else if (user instanceof Investor) role = "investor";
    else if (user instanceof WarehouseOwner) role = "warehouse";

    const token = jwt.sign(
      {
        userId : user.userId,
        email: user.email,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        role,
        userAgent,
        ip,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "Login successful!", role, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

export default login;
