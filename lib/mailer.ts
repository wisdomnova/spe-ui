import nodemailer from "nodemailer";

/* ──────────────────────────────────────────────────────────────
   SMTP Mailer - Hostinger (no-reply@speui.org)
   Uses SSL/TLS on port 465.
   ────────────────────────────────────────────────────────────── */

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.hostinger.com",
  port: parseInt(process.env.SMTP_PORT || "465", 10),
  secure: true, // SSL/TLS on port 465
  auth: {
    user: process.env.SMTP_USER || "no-reply@speui.org",
    pass: process.env.SMTP_PASS || "",
  },
});

const FROM_ADDRESS = `"SPE-UI" <${process.env.SMTP_USER || "no-reply@speui.org"}>`;

/**
 * Send an OTP verification email for election voting.
 */
export async function sendOtpEmail({
  to,
  voterName,
  otp,
  electionTitle,
}: {
  to: string;
  voterName: string;
  otp: string;
  electionTitle: string;
}) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background:#ffffff; font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff; padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="480" cellpadding="0" cellspacing="0" style="background:#ffffff;">
          <tr>
            <td style="padding:0 0 24px;">
              <p style="margin:0; font-size:18px; font-weight:700; color:#111827;">SPE-UI Election</p>
              <p style="margin:4px 0 0; font-size:13px; color:#6B7280;">${electionTitle}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 16px;">
              <p style="margin:0; font-size:14px; color:#111827;">Hi ${voterName},</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 24px;">
              <p style="margin:0; font-size:14px; color:#374151; line-height:1.6;">
                Use the code below to verify your identity and access the voting booth. This code is valid for 10 minutes.
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:0 0 24px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#F3F4F6; border-radius:8px; padding:16px 32px; text-align:center;">
                    <span style="font-size:32px; font-weight:700; letter-spacing:8px; color:#111827; font-family:monospace;">${otp}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 24px;">
              <p style="margin:0; font-size:13px; color:#6B7280; line-height:1.5;">
                If you did not request this code, please ignore this email. Your vote is anonymous and no one can see who you voted for.
              </p>
            </td>
          </tr>
          <tr>
            <td style="border-top:1px solid #E5E7EB; padding:16px 0 0;">
              <p style="margin:0; font-size:12px; color:#9CA3AF;">
                Society of Petroleum Engineers, University of Ibadan Student Chapter
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();

  const text = [
    `SPE-UI Election: ${electionTitle}`,
    ``,
    `Hi ${voterName},`,
    ``,
    `Your verification code is: ${otp}`,
    ``,
    `This code is valid for 10 minutes. Enter it on the voting page to continue.`,
    ``,
    `If you did not request this code, please ignore this email.`,
    ``,
    `Society of Petroleum Engineers, University of Ibadan Student Chapter`,
  ].join("\n");

  await transporter.sendMail({
    from: FROM_ADDRESS,
    to,
    subject: `Your voting verification code: ${otp}`,
    text,
    html,
  });
}

/**
 * Generic email sender for other use cases.
 */
export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  await transporter.sendMail({
    from: FROM_ADDRESS,
    to,
    subject,
    html,
  });
}
