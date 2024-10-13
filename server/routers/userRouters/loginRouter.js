import express from 'express'
import {loginUser} from '../../controllers/index.js'

const loginRouter = express.Router()

loginRouter.post('/', loginUser)

export default loginRouter