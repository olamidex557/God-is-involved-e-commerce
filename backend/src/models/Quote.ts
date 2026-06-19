import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    quoteNumber: {
      type: String,
      required: true,
      unique: true,
    },

    customerName: {
      type: String,
      required: true,
    },

    customerEmail: {
      type: String,
      required: true,
    },

    customerPhone: {
      type: String,
      required: true,
    },

    projectType: {
      type: String,
      required: true,
    },

    width: {
      type: Number,
      required: true,
    },

    height: {
      type: Number,
      required: true,
    },

    depth: {
      type: Number,
      required: true,
    },

    estimatedCost: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "reviewing",
        "approved",
        "rejected",
      ],
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