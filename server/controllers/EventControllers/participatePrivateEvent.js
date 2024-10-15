import { Event } from '../../models/index.js';

const addParticipantPrivate = async (req, res) => {
  const { eventId, participantEmail } = req.body;

  if (!eventId || !participantEmail) {
    return res.status(400).json({ msg: 'Event ID and participant email are required' });
  }

  try {
    const event = await Event.findOne({ eventId });

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    if (event.eventType !== 'private') {
      return res.status(400).json({ msg: 'This event is not private' });
    }

    const alreadyWaiting = event.waitingApproval.some(participant => participant.participantEmail === participantEmail);
    
    if (alreadyWaiting) {
      return res.status(400).json({ msg: 'Participant is already waiting for approval' });
    }

    event.waitingApproval.push({ participantEmail });

    await event.save();

    res.status(200).json({ msg: 'Participant added to waiting approval', waitingApproval: event.waitingApproval });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

export default addParticipantPrivate;
