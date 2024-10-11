import { Post } from "../../models/index.js";

const addComment = async (req, res) => {
  const { postId, commenterName, commentText } = req.body;

  try {
    const post = await Post.findOne({ postId });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.comments.push({
      commenterName,
      commentText,
      createdAt: new Date(),
    });

    await post.save();

    res.status(201).json({ message: 'Comment added successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment' });
  }
};

export default addComment;
