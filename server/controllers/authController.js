import dotenv from "dotenv";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "Signup successful", user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};



export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

  // ✅ Set cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // set true in production (HTTPS)
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  res.status(200).json({ message: "Login successful", user: { name: user.name, email: user.email } });
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user", error: err.message });
  }
};
