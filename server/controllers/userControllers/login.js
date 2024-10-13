import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Mentor, SME, Investor } from '../../models/index.js';

const loginUser = async (req, res) => {
  const { email, password, type } = req.body;

  if (!email || !password || !type) {
    return res.status(400).json({ msg: 'Email, password, and user type are required' });
  }

  let UserModel;
  
  if (type === 'Mentor') {
    UserModel = Mentor;
  } else if (type === 'SME') {
    UserModel = SME;
  } else if (type === 'Investor') {
    UserModel = Investor;
  } else {
    return res.status(400).json({ msg: 'Invalid user type' });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { email: user.email, fullName:user.fullName ,role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } 
    );

    res.status(200).json({ msg: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

export default loginUser;
