import {Event} from "../../models/index.js";

const getEvents = async (req, res) => {
  try {

    const events = await Event.find({}, {
      waitingApproval: 0, 
      participants: 0,    
      eventGroupLinks: 0 
    });

    if (!events.length) {
      return res.status(404).json({ message: "No events found" });
    }

    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export default getEvents;
