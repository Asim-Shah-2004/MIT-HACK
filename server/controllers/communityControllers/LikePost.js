import { Post } from "../../models/index.js";

const addLike = async (req, res) => {
  const { postId} = req.body;

  try {
    const post = await Post.findOne({ postId });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.likes++;
    
    await post.save();

    res.status(201).json({ message: 'Like added successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Error adding Like' });
  }
};

export default addLike;
