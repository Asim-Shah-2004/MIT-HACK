import { Investor, Entrepreneur, WarehouseOwner, Event } from '../../models/index.js';
import { sendEventConfirmationEmail } from '../../services/index.js';  

const registerPublicEvents = async (req, res) => {
  const { eventId, userEmail ,eventType } = req.body;

  try {
    const event = await Event.findOne({ eventId });

    if (!event) {
      return res.status(404).json({ msg: "Event not found." });
    }

    if (event.eventType !== eventType) {
        return res.status(400).json({ msg: "This event is public." });
      }

    const user =
      await Investor.findOne({ email: userEmail }) ||
      await Entrepreneur.findOne({ email: userEmail }) ||
      await WarehouseOwner.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ msg: "User not registered in the system." });
    }

    if (event.creatorEmail === userEmail) {
      return res.status(400).json({ msg: "Cannot register for your own event." });
    }

    if (event.participants.includes(userEmail)) {
      return res.status(400).json({ msg: "User is already registered for the event." });
    }

    if (event.participants.length >= event.maxAttendees) {
      return res.status(400).json({ msg: "No more participants allowed. Event is full." });
    }

    event.participants.push(userEmail);
    await event.save();

    await sendEventConfirmationEmail(user, event);

    return res.status(200).json({ msg: "User successfully registered for the event." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error. Please try again." });
  }
};


export default registerPublicEvents;
