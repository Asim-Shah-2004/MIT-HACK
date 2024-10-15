import { SME, Investor, Mentor, Event } from '../../models/index.js';
import crypto from 'crypto';

const createEvent = async (req, res) => {
  const {
    creatorEmail,
    eventDate,
    startTime,
    endTime,
    location,
    registrationFee,
    maxAttendees,
    eventFormat,
    eventDescription,
    eventType,
    audience,
    eventImage,
  } = req.body;

  try {
    const eventId = crypto.randomBytes(16).toString('hex');

    const newEvent = new Event({
      eventId,
      creatorEmail,
      eventDate,
      startTime,
      endTime,
      location,
      registrationFee,
      maxAttendees,
      eventFormat,
      eventDescription,
      eventType,
      audience,
      eventImage,
      waitingApproval: [],
      participants:[]
    });

    await newEvent.save();

    let user = await SME.findOne({ email: creatorEmail });
    if (!user) {
      user = await Investor.findOne({ email: creatorEmail });
    }
    if (!user) {
      user = await Mentor.findOne({ email: creatorEmail });
    }

    if (!user) {
      return res.status(404).json({ msg: 'Creator not found' });
    }

    user.events.push(eventId); 
    await user.save();

    res.status(201).json({ msg: 'Event created successfully', event: newEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

export default createEvent;
