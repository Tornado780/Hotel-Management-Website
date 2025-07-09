import express from "express";
import authRoutes from "./routes/authRoutes.js";
import mongoose from "mongoose";
import  "dotenv/config";
import db from "./configs/db.js";
import cors from "cors";
import cookieParser from 'cookie-parser';




const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());
db();

// Use routes
app.use("/api/auth", authRoutes);
app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
