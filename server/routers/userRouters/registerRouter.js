import express from 'express'
import {registerSME,registerInvestor,registerMentor} from '../../controllers/index.js'

const registerRouter = express.Router()

registerRouter.post('/SME', registerSME)
registerRouter.post('/Investor', registerInvestor)
registerRouter.post('/Mentor', registerMentor)


export default registerRouter