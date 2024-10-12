import express from 'express'
import {addPost,addComment,addLike} from '../../controllers/index.js'

const postRouter = express.Router()

postRouter.post('/add', addPost)
postRouter.post('/comment',addComment)
postRouter.post('/Like',addLike)

export default postRouter