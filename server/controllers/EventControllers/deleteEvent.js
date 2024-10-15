import { Event } from '../../models/index.js';

const deleteEvent = async (req, res) => {
  const { eventId } = req.body; 

  try {
    const event = await Event.findOneAndDelete({ eventId });

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    res.status(200).json({ msg: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

export default deleteEvent;
