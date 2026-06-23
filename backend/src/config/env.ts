const requiredEnvVars = [
  "PAYSTACK_SECRET_KEY",
  "PAYSTACK_PUBLIC_KEY",
  "TELEGRAM_BOT_TOKEN",
  "JWT_SECRET",
  "MONGO_URI",
] as const;

export const validateEnv =
  () => {
    const missing =
      requiredEnvVars.filter(
        (
          key
        ) =>
          !process.env[key]
      );

    if (missing.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missing.join(
          ", "
        )}`
      );
    }
  };
