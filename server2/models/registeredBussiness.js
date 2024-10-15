import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RegisteredBusinessSchema = new Schema(
  {
    businessId: {
      type: String,
      unique: true,
      required: true,
    },
    businessName: {
      type: String,
      required: true,
    },
    ownerEmail: {
      type: String,
      required: true,
    },
    industry: {
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
    profilePicture: {
      type: Buffer,
      default: null,
    },
    businessType: {
      type: String,
      required: true,
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
    teamMembers: [
      {
        type: String,
      },
    ],
    loginCredentials: {
      username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    challengesFaced: [
      {
        type: String,
      },
    ],
    goalsAndAspirations: [
      {
        type: String,
      },
    ],
    productsServicesOffered: [
      {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        stockQuantity: {
          type: Number,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
      },
    ],
    revenueDetails: {
      monthlyRevenue: {
        type: Number,
        required: true,
      },
      yearlyRevenue: {
        type: Number,
        required: true,
      },
    },
  },
  { collection: "RegisteredBusinesses" }
);

const RegisteredBusiness = mongoose.model("RegisteredBusiness", RegisteredBusinessSchema);

export default RegisteredBusiness;
