import dotenv from "dotenv";

dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";

const PORT =
  process.env.PORT || 5000;

const startServer =
  async () => {
    await connectDB();

    app.listen(
      PORT,
      () => {
        console.log(
          `🚀 Server running on port ${PORT}`
        );

        console.log(
          "Resend:",
          process.env.RESEND_API_KEY
            ? "Loaded"
            : "Missing"
        );
      }
    );
  };

startServer();