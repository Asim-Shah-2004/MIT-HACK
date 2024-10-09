import mongoose from "mongoose";
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
      data: Buffer,
      contentType: String,
    },
    businessState: {
      type: String,
      required: true,
    },
    businessType: {
      type: String,
      required: true,
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
          required: true,
        },
        chatId: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { collection: "SME" }
);

const SME = mongoose.model("SME", SMESchema);

export default SME;
