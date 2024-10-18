import mongoose from "mongoose";

const warehouseOwnerSchema = new mongoose.Schema({
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
    required: true,
    unique: true,
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
  profilePic: {
    type: Buffer,
    default: null,
  },
  posts: [
    {
      postId: {
        type: String,
      },
    },
  ],
  inventories:[
    {
      inventoryId: {
        type: String,
      },
    },
  ]
},   { collection: "WarehouseOwner" });

const WarehouseOwner = mongoose.model("WarehouseOwner", warehouseOwnerSchema);

export default WarehouseOwner;
