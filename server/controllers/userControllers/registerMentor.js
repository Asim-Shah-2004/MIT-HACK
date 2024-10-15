import bcrypt from 'bcrypt';
import {Mentor} from '../../models/index.js';

const registerMentor = async (req, res) => {
  const {
    fullName,
    email,
    password,
    role,
    phoneNumber,
    location,
    profilePicture,
    experienceSummary,
    specializedIndustries,
    mentorshipAreas,
    timeCommitment,
    businessPreferences,
    proBonoRural,
    successStories,
  } = req.body;

  if (!fullName || !email || !password || !phoneNumber || !role) {
    return res.status(400).json({ msg: 'Full name, email, password, phone number, and role are required' });
  }

  try {
    const existingMentor = await Mentor.findOne({ email });
    if (existingMentor) {
      return res.status(400).json({ msg: 'Mentor with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const newMentor = new Mentor({
      fullName,
      email,
      password: hashedPassword,
      role,
      phoneNumber,
      location,
      profilePicture,
      experienceSummary,
      specializedIndustries,
      mentorshipAreas,
      timeCommitment,
      businessPreferences,
      proBonoRural,
      successStories,
      chats: [],
      proposals: [],
      posts: [],
    });

    
    await newMentor.save();

    res.status(201).json({ msg: 'Mentor registered successfully', newMentor });
  } catch (error) {
    console.log(error);
    
    res.status(500).send('Server error');
  }
};

export default registerMentor;
