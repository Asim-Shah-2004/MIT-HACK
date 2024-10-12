import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const InvestorSchema = new Schema(
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
    role: {
      type: String,
      enum: ['angel', 'vc', 'incubator'],
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
    interestedIndustries: {
      type: [String],
      default: [],
    },
    investmentAmount: {
      type: Number,
      required: false,
    },
    investmentType: {
      type: String,
      required: false,
    },
    ruralBusinessInterest: {
      type: Boolean,
      required: false,
    },
    engagementType: {
      type: String,
      enum: ['advisory', 'passive', 'active'],
      required: false,
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
  },
  { collection: 'Investor' }
);

const Investor = mongoose.model('Investor', InvestorSchema);

export default Investor;
