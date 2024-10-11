import express from 'express'
import {addPost,addComment} from '../../controllers/index.js'

const postRouter = express.Router()

postRouter.post('/add', addPost)
postRouter.post('/comment',addComment)

export default postRouter