const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

export async function sendOtpEmail(
  toEmail: string,
  otp: string
): Promise<void> {
  const response = await fetch(BREVO_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY!,
    },
    body: JSON.stringify({
      sender: {
        name: process.env.BREVO_SENDER_NAME!,
        email: process.env.BREVO_SENDER_EMAIL!,
      },

      to: [
        {
          email: toEmail,
        },
      ],

      subject: "India Business Case Programme - Email Verification OTP",

      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
          <h2>India Business Case Programme</h2>

          <p>Hello,</p>

          <p>Your verification code is:</p>

          <div style="
              font-size:36px;
              font-weight:bold;
              letter-spacing:8px;
              margin:20px 0;
              color:#2563eb;
          ">
            ${otp}
          </div>

          <p>This OTP is valid for <strong>10 minutes</strong>.</p>

          <p>If you didn't request this email, you can safely ignore it.</p>

          <br>

          <p>Regards,<br>
          India Business Case Programme Team</p>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
}