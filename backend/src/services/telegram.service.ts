import axios from "axios";

const BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN;

const CHAT_ID =
  process.env.TELEGRAM_CHAT_ID;

export const sendTelegramMessage =
  async (
    message: string
  ) => {
    try {
      const response =
        await axios.post(
          `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
          {
            chat_id:
              CHAT_ID,

            text:
              message,
          }
        );

      console.log(
        "TELEGRAM SENT"
      );

      return response.data;
    } catch (
      error: unknown
    ) {
      const details =
        axios.isAxiosError(
          error
        )
          ? error.response?.data ||
            error.message
          : error instanceof Error
            ? error.message
            : error;

      console.error(
        "TELEGRAM ERROR:",
        details
      );

      throw error;
    }
  };
