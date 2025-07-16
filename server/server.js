import express from "express";
import authRoutes from "./routes/authRoutes.js";
import mongoose from "mongoose";
import  "dotenv/config";
import db from "./configs/db.js";
import cors from "cors";
import cookieParser from 'cookie-parser';
import bookingRoutes from "./routes/bookingRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";


const app = express();
app.use(express.json());

app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(cookieParser());
db();

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/payment', paymentRoutes);
app.get("/", (req, res) => {
  res.send("API is Running");
})
app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
