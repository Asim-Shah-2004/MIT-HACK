import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    postId: {
      type: String,
      required: true,
      unique: true,
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
      data: Buffer,
      contentType: String,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { collection: 'Post', timestamps: true }
);

const Post = mongoose.model('Post', PostSchema);

export default Post;
