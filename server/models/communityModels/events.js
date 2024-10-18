import mongoose from 'mongoose';
const { Schema } = mongoose;

const EventSchema = new Schema({
  eventId: {
    type: String,
    required: true,
    unique: true,
  },
  eventName:{
    type: String,
    required : true
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
    required: true,
  },
    attachment: {
        type: Buffer,
        default: null,
    },
  waitingApproval: [
    {
      participantEmail: {
        type: String,
      },
    },
  ],
  participants: [
    {
      type: String,
      required: true,
    },
  ],
  eventGroupLinks:[
    {
        link:{
            type: String,
            required: true,
        }
    }
  ]
});

const Event = mongoose.model('Event', EventSchema);

export default Event;
