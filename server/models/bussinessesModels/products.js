import mongoose from 'mongoose';
import crypto from 'crypto';
import { type } from 'os';

const productSchema = new mongoose.Schema({
    productID: {
        type: String,
        unique: true,
        default: () => crypto.randomBytes(8).toString('hex'), 
    },
    name: {
        type: String,
        required: true,
    },
    pricePerUnit: {
        type: Number,
        required: true,
    },
    minOrderQuantity: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    creatorEmail: {
        type: String,
        required: true,
    },
    creatorName:{
        type: String,
        required: true,
    },
    isRural: {
        type: Boolean,
        default: false, 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    image:{
        type:String,
        default: null,
    }
});

const Product = mongoose.model('Product', productSchema);
export default Product;
