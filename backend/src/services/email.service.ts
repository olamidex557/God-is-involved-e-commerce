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
          "Verify Your Email",

        html: `
          <div
            style="
              max-width:600px;
              margin:auto;
              font-family:Arial,sans-serif;
              padding:30px;
              background:#0f0f0f;
              color:white;
              border-radius:20px;
            "
          >
            <h1
              style="
                color:#D4AF37;
              "
            >
              God Is Involved
            </h1>

            <p>
              Welcome.
              Please verify your account.
            </p>

            <div
              style="
                margin:30px 0;
                padding:20px;
                background:#181818;
                border-radius:12px;
                text-align:center;
              "
            >
              <h2>${otp}</h2>
            </div>

            <p>
              This code expires
              in 10 minutes.
            </p>
          </div>
        `,
      });

    if (result.error) {
      throw new Error(
        result.error.message
      );
    }

    return result.data;
  };

export const sendResetPasswordEmail =
  async (
    email: string,
    token: string
  ) => {
    const resetUrl =
      `${
        process.env.FRONTEND_URL ||
        "http://localhost:5173"
      }/reset-password?token=${token}`;

    const result =
      await resend.emails.send({
        from:
          process.env.EMAIL_FROM ||
          "onboarding@resend.dev",

        to: email,

        subject:
          "Reset Your Password",

        html: `
          <div
            style="
              max-width:600px;
              margin:auto;
              font-family:Arial,sans-serif;
              padding:30px;
              background:#0f0f0f;
              color:white;
              border-radius:20px;
            "
          >
            <h1
              style="
                color:#D4AF37;
              "
            >
              Password Reset
            </h1>

            <p>
              A password reset
              request was made
              for your account.
            </p>

            <a
              href="${resetUrl}"
              style="
                display:inline-block;
                margin-top:20px;
                background:#D4AF37;
                color:black;
                padding:14px 24px;
                border-radius:12px;
                text-decoration:none;
                font-weight:bold;
              "
            >
              Reset Password
            </a>

            <p
              style="
                margin-top:20px;
                opacity:.7;
              "
            >
              Link expires in
              30 minutes.
            </p>
          </div>
        `,
      });

    if (result.error) {
      throw new Error(
        result.error.message
      );
    }

    return result.data;
  };

export const sendPaymentSuccessfulEmail =
  async (
    email: string,
    orderNumber: string,
    amount: number,
    items: {
      name: string;
      quantity: number;
    }[]
  ) => {
    const products =
      items
        .map(
          (
            item
          ) =>
            `<li>${item.name} × ${item.quantity}</li>`
        )
        .join("");

    const result =
      await resend.emails.send({
        from:
          process.env.EMAIL_FROM ||
          "onboarding@resend.dev",

        to: email,

        subject:
          "Payment Successful",

        html: `
          <div
            style="
              max-width:600px;
              margin:auto;
              font-family:Arial,sans-serif;
              padding:30px;
              background:#0f0f0f;
              color:white;
              border-radius:20px;
            "
          >
            <h1 style="color:#D4AF37;">
              Payment Successful
            </h1>

            <p>
              Thank you for your payment.
              Your order is now being processed.
            </p>

            <div
              style="
                margin:24px 0;
                padding:20px;
                background:#181818;
                border-radius:12px;
              "
            >
              <p>
                <strong>Order number:</strong>
                ${orderNumber}
              </p>

              <p>
                <strong>Amount:</strong>
                ₦${amount.toLocaleString()}
              </p>

              <p>
                <strong>Products:</strong>
              </p>

              <ul>
                ${products}
              </ul>
            </div>

            <p>
              Next steps: our team will confirm your order,
              prepare your materials, and contact you with
              delivery updates.
            </p>
          </div>
        `,
      });

    if (result.error) {
      throw new Error(
        result.error.message
      );
    }

    return result.data;
  };
