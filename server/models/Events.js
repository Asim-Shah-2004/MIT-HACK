import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  eventId: {
    type: String,
    required: true,
    unique: true,
  },
  creatorEmail: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  registrationFee: {
    type: String,
    default: 'Free',
  },
  maxAttendees: {
    type: Number,
    required: true,
  },
  eventImage: {
    data: Buffer,
    contentType: String,
  },
  eventFormat: {
    type: String,
    enum: ['Offline', 'Online', 'Hybrid'],
    required: true,
  },
  eventDescription: {
    type: String,
    required: true,
  },
  participants: [
    {
      email: {
        type: String,
        required: true,
      },
    },
  ],
  eventType: {
    type: String,
    enum: ['Public', 'Private'],
    required: true,
  },
  audience: {
    type: String,
    enum: ['SMEs', 'Investors', 'Mentors', 'All'],
    required: true,
  },
});

const Event = mongoose.model('Event', EventSchema);
export default Event;
