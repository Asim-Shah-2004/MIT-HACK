import {Event} from '../../models/index.js';
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

  if (!creatorEmail || !eventDate || !startTime || !endTime || !location || !eventFormat || !eventDescription || !eventType || !audience) {
    return res.status(400).json({ msg: 'Required fields are missing' });
  }

  try {
    const eventId = crypto.randomBytes(16).toString('hex');

    const newEvent = new Event({
      eventId,
      creatorEmail,
      eventDate,
      startTime,
      endTime,
      location,
      registrationFee: registrationFee || 'Free',
      maxAttendees,
      eventFormat,
      eventDescription,
      eventType,
      audience,
      eventImage,
    });

    await newEvent.save();
    res.status(201).json({ msg: 'Event created successfully', event: newEvent });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};

export default createEvent;
