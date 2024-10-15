import mongoose from "mongoose";
const Schema = mongoose.Schema;

const InvestorSchema = new Schema(
  {
    investorId: {
      type: String, 
      unique: true,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
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
    profilePicture: {
      type: Buffer, 
      default: null,
    },
    role: {
      type: String,
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
    interestedIndustries: [
      {
        type: String, 
        required: true,
      },
    ],
    amountLookingToInvest: {
      type: Number,
      required: true,
    },
    investmentType: {
      type: String,
      enum: ["Equity", "Debt", "Convertible Note"],
      required: true,
    },
    interestedInRuralBusiness: {
      type: Boolean,
      default: false,
    },
    engagementType: {
      type: String,
      enum: ["Mentorship", "Partnership", "Funding"],
      required: true,
    },
    proposalsSent: [
      {
        proposalId: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ["Pending", "Accepted", "Rejected"],
          default: "Pending",
        },
        receiverEmail: {
          type: String,
          required: true,
        },
        receiverName: {
          type: String,
          required: true,
        },
      },
    ],
    proposalsReceived: [
      {
        proposalId: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ["Pending", "Accepted", "Rejected"],
          default: "Pending",
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
    investmentHistory: [
      {
        businessName: {
          type: String,
          required: true,
        },
        amountInvested: {
          type: Number,
          required: true,
        },
        roi: {
          type: Number, // AS %
          required: true,
        },
        dateOfInvestment: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  { collection: "Investors" }
);

const Investor = mongoose.model("Investor", InvestorSchema);

export default Investor;
