import { Event } from '../../models/index.js';

const addParticipantToPublicEvent = async (req, res) => {
  const { eventId, participantEmail } = req.body;

  try {
    const event = await Event.findOne({ eventId });

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    if (event.eventType !== 'public') {
      return res.status(403).json({ msg: 'This event is not public' });
    }

    if (event.participants.includes(participantEmail)) {
      return res.status(400).json({ msg: 'Participant already added to the event' });
    }

    event.participants.push(participantEmail);
    await event.save();

    res.status(200).json({ msg: 'Participant added successfully', participants: event.participants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

export default addParticipantToPublicEvent;
