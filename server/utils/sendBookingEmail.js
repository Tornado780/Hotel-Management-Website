import nodemailer from "nodemailer";

export async function sendBookingEmail({ to, name, hotel, checkIn, checkOut, guests, price }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"QuickStay Booking" <${process.env.SMTP_USER}>`,
    to,
    subject: "Booking Confirmation – Welcome to " + hotel.name,
    html: `
      <h2>Dear ${name},</h2>
      <p>🎉 Thank you for booking with us! Your reservation is confirmed.</p>

      <h3>📌 Booking Details:</h3>
      <ul>
        <li><strong>Hotel:</strong> ${hotel.name}</li>
        <li><strong>Address:</strong> ${hotel.address}</li>
        <li><strong>Check-in:</strong> ${checkIn}</li>
        <li><strong>Check-out:</strong> ${checkOut}</li>
        <li><strong>Guests:</strong> ${guests}</li>
        <li><strong>Total Price:</strong> $ ${price}</li>
      </ul>

      <p>We’re excited to host you and ensure a comfortable stay. If you have any questions, reply to this email.</p>

      <p>Warm regards,<br/>The QuickStay Team 🏨</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}
