import dotenv from "dotenv";

dotenv.config();

import {
  sendTelegramMessage,
} from "./services/telegram.service";

sendTelegramMessage(
  "🚀 God Is Involved Operations Bot Connected"
);