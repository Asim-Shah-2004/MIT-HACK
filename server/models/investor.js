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
      unique: true,
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
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
    },
    profilePic: {
      type: String, 
      required: true,
    },
    interestedIndustries: {
      type: [String],
      default: [],
    },
    amountLookingToInvest: {
      type: Number,
      required: true,
    },
    investmentType: {
      type: String,
      required: true,
    },
    interestedInRuralBusiness: {
      type: Boolean,
      required: true,
    },
    engagementType: {
      type: String,
      required: true,
    },
    proposals: [
      {
        proposalId: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ['pending', 'accepted', 'rejected'],
          default: 'pending',
        },
        senderEmail: {
          type: String,
          required: true,
        },
        senderName: {
          type: String,
          required: true,
        },
      },
    ],
    chats: [
      {
        personName: {
          type: String,
          required: true,
        },
        chatId: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { collection: 'Investor' }
);

const Investor = mongoose.model('Investor', InvestorSchema);

export default Investor;
