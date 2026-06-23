import mongoose from "mongoose";

export interface ProductDocument {
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  lowStockThreshold: number;
  inStock: boolean;
  images: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema =
  new mongoose.Schema<ProductDocument>(
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
