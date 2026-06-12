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
      await Product.create(
        req.body
      );

    res.status(201).json({
      success: true,
      product,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};