import mongoose from "mongoose";
const Schema = mongoose.Schema;

const EntrepreneurSchema = new Schema(
  {
    entrepreneurId: {
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
    registeredBusinesses: [
      {
        businessId: {
          type: String,
          required: true,
        },
      },
    ],
    entrepreneurType: {
      type: String,
      required: true,
    },
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
    proposalsSent: [
      {
        proposalId: {
          type: String,
          required: true,
        },
        receiverName: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ["Pending", "Accepted", "Rejected"],
          default: "Pending",
        },
      },
    ],
    proposalsReceived: [
      {
        proposalId: {
          type: String,
          required: true,
        },
        senderName: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ["Pending", "Accepted", "Rejected"],
          default: "Pending",
        },
      },
    ],
  },
  { collection: "Entrepreneurs" }
);

const Entrepreneur = mongoose.model("Entrepreneur", EntrepreneurSchema);

export default Entrepreneur;
