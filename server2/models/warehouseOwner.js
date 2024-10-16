import mongoose from 'mongoose';

const warehouseOwnerSchema = new mongoose.Schema({
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
  profilePic: {
    type: Buffer, 
    default: null,
  },
  properties: [{
    propertyName: { type: String, required: true },
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
    totalSpace: { type: Number, required: true },
    availableSpace: { type: Number, required: true },
    pricePerSpace: { type: Number, required: true },
    isDivisible: { type: Boolean, required: true },
    inventoryParts: [{
      partName: String,
      partSize: Number
    }]
  }],

  rentedInventories: [{
    type: String, 
  }],
  posts:[
    {
      postId:{
        type: String,
      }
    }
  ]
});

const WarehouseOwner = mongoose.model('WarehouseOwner', warehouseOwnerSchema);

export default WarehouseOwner