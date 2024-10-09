import express from 'express'
import {registerSME} from '../../controllers/index.js'

const registerRouter = express.Router()
registerRouter.post('/SME', registerSME)


export default registerRouter