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
  profilePic: {
    type: String,  
  },
  properties: [{
    propertyName: {
      type: String,
      required: true,
    },
    location: {
      country: String,
      state: String,
      city: String,
    },
    totalSpace: {
      type: Number,  
      required: true,
    },
    pricePerSpace: {
      type: Number, 
      required: true,
    },
    availableSpace: {
      type: Number,  
      required: true,
    },
    isDivisible: {
      type: Boolean,  
      default: false,
    },
    inventoryParts: [{
      partName: String,
      partSize: Number,  
      price: Number,     
      isRented: {
        type: Boolean,
        default: false,
      }
    }],
  }]
});

export const WarehouseOwner = mongoose.model('WarehouseOwner', warehouseOwnerSchema);
