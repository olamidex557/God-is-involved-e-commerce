import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    projectType: {
      type: String,
      required: true,
    },

    width: Number,
    height: Number,
    depth: Number,

    estimatedAmount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Quote",
  quoteSchema
);