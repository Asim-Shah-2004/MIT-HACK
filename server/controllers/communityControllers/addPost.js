import {SME,Investor,Post} from "../../models/index.js"
import crypto from 'crypto';

const addPost = async (req, res) => {
  const { userId, userType, content , image } = req.body;

  try {
    const postId = crypto.randomBytes(16).toString('hex');

    const newPost = new Post({
      postId,
      likes: 0,
      comments: [],
      image,
      content
    });

    await newPost.save();

    let user;
    if (userType === 'sme') {
      user = await SME.findById(userId);
    } else if (userType === 'investor') {
      user = await Investor.findById(userId);
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.posts.push({ postId });
    await user.save();

    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post' });
  }
};

export default addPost