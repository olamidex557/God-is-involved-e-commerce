import mongoose from "mongoose";

const productSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      slug: {
        type: String,
        required: true,
        unique: true,
      },

      description: {
        type: String,
        required: true,
      },

      category: {
        type: String,
        required: true,
      },

      price: {
        type: Number,
        required: true,
      },

      stock: {
        type: Number,
        default: 0,
      },

      lowStockThreshold: {
        type: Number,
        default: 10,
      },

      inStock: {
        type: Boolean,
        default: true,
      },

      images: {
        type: [String],
        default: [],
      },

      featured: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Product",
  productSchema
);