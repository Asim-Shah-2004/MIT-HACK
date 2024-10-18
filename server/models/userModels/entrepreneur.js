import mongoose from "mongoose";
const Schema = mongoose.Schema;

const EntrepreneurSchema = new Schema(
  {
    userId: {
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
          required: false,
        },
        personEmail:{
          type: String,
          required: false,
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
        receiverEmail: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected"],
          default: "pending",
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
        senderName: {
          type: String,
          required: true,
        },
        senderEmail: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected"],
          default: "pending",
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
  { collection: "Entrepreneurs" }
);

const Entrepreneur = mongoose.model("Entrepreneur", EntrepreneurSchema);

export default Entrepreneur;
