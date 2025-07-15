import nodemailer from "nodemailer";

export async function sendResetEmail(to, token) {
  const link = `http://localhost:5173/reset-password/${token}`; // adjust frontend URL

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER, // your email
      pass: process.env.SMTP_PASS, // app password
    },
  });

  await transporter.sendMail({
    from: `"QuickStay Support" <${process.env.SMTP_USER}>`,
    to,
    subject: "Reset your password",
    html: `
      <p>You requested a password reset.</p>
      <p><a href="${link}">Click here to set a new password</a>.</p>
      <p>This link is valid for 15 minutes.</p>
    `,
  });
}
