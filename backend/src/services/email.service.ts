import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY || ""
);

export const sendOTPEmail =
  async (
    email: string,
    otp: string
  ) => {
    const result =
      await resend.emails.send({
        from:
          process.env.EMAIL_FROM ||
          "onboarding@resend.dev",

        to: email,

        subject:
          "Verify Your Account",

        html: `
          <div style="font-family:sans-serif">
            <h1>God Is Involved</h1>

            <p>
              Your verification code is:
            </p>

            <h2>${otp}</h2>

            <p>
              Expires in 10 minutes.
            </p>
          </div>
        `,
      });

    if (
      result.error
    ) {
      console.error(
        "RESEND ERROR:",
        result.error
      );

      throw new Error(
        result.error.message
      );
    }

    console.log(
      "EMAIL SENT:",
      result.data
    );

    return result.data;
  };