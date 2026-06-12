import { Request, Response } from "express";
import Product from "../models/Product";

export const getProducts = async (
  req: Request,
  res: Response
) => {
  try {
    const products =
      await Product.find();

    res.json({
      success: true,
      products,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const product =
      await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error,
    });
  }
};

export const getProductById = async (
  req: Request,
  res: Response
) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message:
          "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch {
    res.status(500).json({
      success: false,
      message:
        "Server Error",
    });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const product =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message:
          "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch {
    res.status(500).json({
      success: false,
      message:
        "Server Error",
    });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const product =
      await Product.findByIdAndDelete(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message:
          "Product not found",
      });
    }

    res.json({
      success: true,
      message:
        "Product deleted",
    });
  } catch {
    res.status(500).json({
      success: false,
      message:
        "Server Error",
    });
  }
};