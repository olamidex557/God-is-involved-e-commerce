import { Request, Response } from "express";
import Quote from "../models/Quote";

export const createQuote =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const quote =
        await Quote.create(
          req.body
        );

      res.status(201).json({
        success: true,
        quote,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to create quote",
      });
    }
  };

export const getQuotes =
  async (
    _req: Request,
    res: Response
  ) => {
    try {
      const quotes =
        await Quote.find().sort({
          createdAt: -1,
        });

      res.json({
        success: true,
        quotes,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch quotes",
      });
    }
  };