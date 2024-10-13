import express from 'express'
import {createEvent,updateEvent,deleteEvent} from '../../controllers/index.js'

const eventRouter = express.Router()

eventRouter.post('/add', createEvent)
eventRouter.patch('/update', updateEvent)
eventRouter.delete('/delete-event',deleteEvent)

export default eventRouter