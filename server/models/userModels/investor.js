import mongoose from "mongoose";
const Schema = mongoose.Schema;

const InvestorSchema = new Schema(
  {
    userId: {
      type: String,
      unique: false,
      required: false,
    },
    fullName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      unique: false,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    profilePicture: {
      type: Buffer,
      default: null,
    },
    role: {
      type: String,
      required: false,
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
    interestedIndustries: [
      {
        type: String,
        required: false,
      },
    ],
    amountLookingToInvest: {
      type: Number,
      required: false,
    },
    investmentType: {
      type: String,
      enum: ["Equity", "Debt", "Convertible Note"],
      required: false,
    },
    interestedInRuralBusiness: {
      type: Boolean,
      default: false,
    },
    engagementType: {
      type: String,
      required: false,
    },
    proposalsSent: [
      {
        proposalId: {
          type: String,
          required: false,
        },
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected"],
          default: "pending",
        },
        receiverEmail: {
          type: String,
          required: false,
        },
        receiverName: {
          type: String,
          required: false,
        },
      },
    ],
    proposalsReceived: [
      {
        proposalId: {
          type: String,
          required: false,
        },
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected"],
          default: "pending",
        },
        senderEmail: {
          type: String,
          required: false,
        },
        senderName: {
          type: String,
          required: false,
        },
      },
    ],
    chats: [
      {
        personName: {
          type: String,
          required: false,
        },
        personEmail:{
          type: String,
          required: false,
        },
        chatId: {
          type: String,
          required: false,
        },
      },
    ],
    investmentHistory: [
      {
        businessName: {
          type: String,
          required: false,
        },
        amountInvested: {
          type: Number,
          required: false,
        },
        roi: {
          type: Number, // AS %
          required: false,
        },
        dateOfInvestment: {
          type: Date,
          required: false,
        },
      },
    ],
    posts: [
      {
        postId: {
          type: String,
        },
      },
    ],
    events: [
      {
        eventId: {
          type: String,
        },
      },
    ],
  },
  { collection: "Investors" }
);

const Investor = mongoose.model("Investor", InvestorSchema);

export default Investor;
