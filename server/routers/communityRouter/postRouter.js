import express from "express";
import { addPost, addComment, addLike, getAllPosts } from "../../controllers/index.js";

const postRouter = express.Router();

postRouter.post("/add", addPost);
postRouter.post("/comment", addComment);
postRouter.post("/like", addLike);
postRouter.get("/getAll", getAllPosts);

export default postRouter;
