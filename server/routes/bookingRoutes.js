import express from "express";
import { createBooking } from "../controllers/bookingController.js";
import { verifyToken } from "../middleware/authMiddleware.js"; 
import Booking from "../models/Booking.js";
const router = express.Router();

router.post("/",verifyToken, createBooking);
router.get('/my', verifyToken, async (req, res) => { 
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('hotel')
      .populate('room');

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

export default router;
