import mongoose from "mongoose";
const Schema = mongoose.Schema;

const docSchema = new Schema(
  {
    docID: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      default: "Untitled Document",
    },
    content: {
      type: Object,
      default: { ops: [{ insert: "\n" }] },
    },
    owner: {
      type: String,
      required: false,
    },
    participants: {
      type: Array,
      default: []
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    modifiedAt: {
      type: Date,
      default: Date.now,
    },
    lastAccessed: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "Doc" }
);

const Doc = mongoose.model("Doc", docSchema);

export default Doc;
