import mongoose from 'mongoose';

const inventorySpaceSchema = new mongoose.Schema({
  rentorId: {
    type: String,  
    required: true,
  },
  propertyName: {
    type: String,
    required: true,
  },
  rentedSpace: {
    type: Number,  
    required: true,
  },
  rentalPrice: {
    type: Number,  
    required: true,
  },
  rentStartDate: {
    type: Date,
    required: true,
  },
  rentEndDate: {
    type: Date,
    required: true,
  }
});

export const InventorySpace = mongoose.model('InventorySpace', inventorySpaceSchema);
