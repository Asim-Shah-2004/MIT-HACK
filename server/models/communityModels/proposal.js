import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProposalSchema = new Schema(
  {
    proposalId: {
      type: String,
      unique: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    attachment: {
      type: Buffer,
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      required: true,
      default: "pending",
    },
    senderId: {
      type: String,
      required: true,
    },
    recipientId: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "Proposals" }
);

const Proposal = mongoose.model("Proposal", ProposalSchema);

export default Proposal;
