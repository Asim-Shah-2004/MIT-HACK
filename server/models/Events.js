import mongoose from 'mongoose';
const { Schema } = mongoose;

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
    required: true,
  },
  maxAttendees: {
    type: Number,
    required: true,
  },
  eventFormat: {
    type: String,
    enum: ['offline', 'online', 'hybrid'],
    required: true,
  },
  eventDescription: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    enum: ['public', 'private'],
    required: true,
  },
  audience: {
    type: String,
    enum: ['SMEs', 'Investors', 'Mentors', 'All'],
    required: true,
  },
  eventImage: {
    type: String,
    required: false,
  },
  waitingApproval: [
    {
      participantEmail: {
        type: String,
        required: true,
      },
    },
  ],
  participants: [
    {
      type: String,
      required: true,
    },
  ],
});

const Event = mongoose.model('Event', EventSchema);

export default Event;
