import express from 'express'
import {createEvent} from '../../controllers/index.js'

const eventRouter = express.Router()

eventRouter.post('/add', createEvent)

export default eventRouter