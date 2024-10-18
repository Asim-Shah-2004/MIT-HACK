import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    postId: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        commenterName: { type: String, required: true },
        commentText: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    image: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { collection: 'Post' }
);

const Post = mongoose.model('Post', PostSchema);

export default Post;
