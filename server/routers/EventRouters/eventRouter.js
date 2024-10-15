import express from 'express'
import {createEvent,updateEvent,deleteEvent,addParticipantToPublicEvent,addParticipantPrivate} from '../../controllers/index.js'

const eventRouter = express.Router()

eventRouter.post('/add', createEvent)
eventRouter.post('/register/public',addParticipantToPublicEvent)
eventRouter.post('/register/private',addParticipantPrivate)
eventRouter.patch('/update', updateEvent)
eventRouter.delete('/delete-event',deleteEvent)

export default eventRouter