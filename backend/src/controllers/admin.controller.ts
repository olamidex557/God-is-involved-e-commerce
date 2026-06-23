import {
  Request,
  Response,
} from "express";

import {
  getAdminAnalytics,
} from "../services/adminAnalytics.service";

export const getAdminStats =
  async (
    _req: Request,
    res: Response
  ) => {
    try {
      const stats =
        await getAdminAnalytics();

      return res.json(
        stats
      );
    } catch (
      error
    ) {
      console.error(
        error
      );

      return res
        .status(500)
        .json({
          success: false,
          message:
            "Unable to load dashboard statistics",
        });
    }
  };
