import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ChatRoomSchema = new Schema(
  {
    chatId: {
      type: String,
      required: true,
      unique: true,
    },
    participants: [
      {
        email: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
      },
    ],
    messages: [
      {
        sender: {
          email: {
            type: String,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
        },
        message: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    lastMessage:{
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    docID : {
        type: String,
    }
  },
  { collection: "ChatRoom" }
);

const ChatRoom = mongoose.model("ChatRoom", ChatRoomSchema);

export default ChatRoom;
