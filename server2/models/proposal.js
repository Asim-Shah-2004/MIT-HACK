import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProposalSchema = new Schema(
  {
    proposalId: {
      type: String,
      unique: true,
      required: true,
    },
    reasonToConnect: {
      type: String, 
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    attachment: {
      type: Buffer, 
      default: null,
    },
  },
  { collection: "Proposals" }
);

const Proposal = mongoose.model("Proposal", ProposalSchema);

export default Proposal;
