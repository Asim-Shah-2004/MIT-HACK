import { Event } from '../../models/index.js';

const updateEvent = async (req, res) => {
  const { eventId } = req.body; 
  const {
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
    const event = await Event.findOne({ eventId });

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    if (eventDate) event.eventDate = eventDate;
    if (startTime) event.startTime = startTime;
    if (endTime) event.endTime = endTime;
    if (location) event.location = location;
    if (registrationFee) event.registrationFee = registrationFee;
    if (maxAttendees) event.maxAttendees = maxAttendees;
    if (eventFormat) event.eventFormat = eventFormat;
    if (eventDescription) event.eventDescription = eventDescription;
    if (eventType) event.eventType = eventType;
    if (audience) event.audience = audience;
    if (eventImage) event.eventImage = eventImage;

    await event.save();

    res.status(200).json({ msg: 'Event updated successfully', event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

export default updateEvent;
