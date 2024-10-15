import mongoose from 'mongoose';

const inventorySpaceSchema = new mongoose.Schema({
  smeId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'SME',
    required: true,
  },
  warehouseOwnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WarehouseOwner',
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
