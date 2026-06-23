import {
  Request,
  Response,
} from "express";

import {
  sendTelegramMessage,
} from "../services/telegram.service";
import {
  handleTelegramOperationsMessage,
} from "../services/telegramOperations.service";

export const telegramWebhook =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const text =
        req.body?.message?.text;

      if (
        typeof text !==
        "string"
      ) {
        return res.sendStatus(
          200
        );
      }

      const response =
        await handleTelegramOperationsMessage(
          text
        );

      await sendTelegramMessage(
        response
      );

      return res.sendStatus(
        200
      );
    } catch (
      error
    ) {
      console.error(
        "Telegram webhook failed:",
        error
      );

      return res.sendStatus(
        200
      );
    }
  };
