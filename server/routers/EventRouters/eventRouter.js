import express from 'express'
import {createEvent,updateEvent} from '../../controllers/index.js'

const eventRouter = express.Router()

eventRouter.post('/add', createEvent)
eventRouter.post('/update', updateEvent)

export default eventRouter