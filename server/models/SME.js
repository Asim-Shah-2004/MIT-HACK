import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SMESchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    location: {
      country: {
        type: String,
        required: false,
      },
      state: {
        type: String,
        required: false,
      },
      city: {
        type: String,
        required: false,
      },
    },
    profilePic: {
      data: Buffer,
      contentType: String,
    },
    businessState: {
      type: String,
      required: false,
    },
    businessType: {
      type: String,
      required: false,
    },
    challengesFaced: {
      type: [String],
      default: [],
    },
    goalsAndAspirations: {
      type: [String],
      default: [],
    },
    chats: [
      {
        personName: {
          type: String,
          required: false,
        },
        chatId: {
          type: String,
          required: false,
        },
      },
    ],
    proposals: [
      {
        proposalId: { type: String, required: false },
        status: { type: String, default: 'pending' },
        senderEmail: { type: String, required: false },
        senderName: { type: String, required: false },
      },
    ],
    posts: [
      {
        postId: { type: String, required: false },
      },
    ],
    events: [
      {
        type: String,
      }
    ]
  },
  { collection: 'SME' }
);

const SME = mongoose.model('SME', SMESchema);

export default SME;
