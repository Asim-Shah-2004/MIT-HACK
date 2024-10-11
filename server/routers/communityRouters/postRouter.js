import express from 'express'
import {addPost} from '../../controllers/index.js'

const postRouter = express.Router()
postRouter.post('/add', addPost)


export default postRouter