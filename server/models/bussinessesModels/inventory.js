import mongoose from "mongoose";
const Schema = mongoose.Schema;

const inventorySpaceSchema = new Schema({
  rentalID: {
    type: String,  
    required: true,
  },
  creatorEmail:{
    type: String,
    required: true,
  },
  creatorName:{
    type: String,
    required: true,
  },
  propertyName: {
    type: String,
    required: true,
  },
  details: {
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
  rentedSpace: {  // in sq feet
    type: Number,  
    required: true,
  },
  rentalPrice: { // in per sq feet
    type: Number,  
    required: true,
  },
  isDivisible: { 
    type: Boolean, 
    required: true,
  },
  attachment: {
    type: Buffer,
    default: null,
  },
  customers: [{
    paymentStatusOwner: { type: Boolean, default: false },
    customerEmail: { type: String, required: true },
    agreedRentedSpace: { type: Number, required: true },
    agreedPricePerSqFt: { type: Number, required: true },
    additionalDetails: { type: String },
  }],
});

const InventorySpace = mongoose.model('InventorySpace', inventorySpaceSchema);

export default InventorySpace
