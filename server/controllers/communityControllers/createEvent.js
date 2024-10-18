import crypto from 'crypto';
import {Event,Investor,Entrepreneur} from '../../models/index.js'; 

const createEvent = async (req, res) => {
  const {
    creatorEmail,
    eventName,
    eventDate,
    startTime,
    endTime,
    location,
    registrationFee,
    maxAttendees,
    eventFormat,
    eventDescription,
    eventType,
    eventGroupLinks, 
    attachment, 
  } = req.body;


  if (!eventGroupLinks || eventGroupLinks.length === 0) {
    return res.status(400).json({ msg: "At least one event group link is required." });
  }

  try {

    const eventId = crypto.randomBytes(16).toString('hex');
    const newEvent = new Event({
      eventId,
      eventName,
      creatorEmail,
      eventDate,
      startTime,
      endTime,
      location,
      registrationFee: registrationFee || "Free", 
      maxAttendees,
      eventFormat,
      eventDescription,
      eventType,
      waitingApproval: [], 
      participants: [], 
      eventGroupLinks, 
      attachment: attachment ? Buffer.from(attachment, 'base64') : null, 
    });

    const user = await Investor.findOne({email:creatorEmail}) || await Entrepreneur.findOne({email:creatorEmail})

    if(!user) return res.status(400).send({message:"Email dosent exists or you are a warehouse owner"})

    user.events.push({eventId})

    await user.save()
    await newEvent.save();
    res.status(201).json({
      msg: "Event created successfully!",
      eventId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error. Please try again." });
  }
};

export default createEvent;
