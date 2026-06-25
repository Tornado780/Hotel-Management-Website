import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Hotel from "../models/Hotel.js";
import mongoose from 'mongoose';
import { sendBookingEmail } from "../utils/sendBookingEmail.js";

export const createBooking = async (req, res) => {
  try {
    const {
      hotelId,
      roomId,
      guests,
      price,
      checkIn,
      checkOut,
      paymentStatus = "pending",
    } = req.body;

    const userId = req.user._id;

    if (!hotelId || !roomId) {
      return res.status(400).json({ message: "Missing hotelId or roomId" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const booking = await Booking.create({
      user: new mongoose.Types.ObjectId(userId),
      hotel: new mongoose.Types.ObjectId(hotelId),
      room: new mongoose.Types.ObjectId(roomId),
      guests,
      price,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      paymentStatus,
    });

    try {
      await sendBookingEmail({
        to: user.email,
        name: user.name,
        hotel,
        checkIn: new Date(checkIn).toLocaleDateString(),
        checkOut: new Date(checkOut).toLocaleDateString(),
        guests,
        price,
      });
    } catch (emailError) {
      console.error("Booking confirmation email failed:", emailError);
    }

    res.status(201).json({ message: "Booking successful", booking });
  } catch (err) {
    console.error("Booking failed:", err.message);
    res.status(500).json({ message: "Booking failed", error: err.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Allow cancellation by booking owner or admin
    if (booking.user.toString() !== req.user._id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "You can only cancel your own bookings" });
    }

    booking.paymentStatus = "cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled", booking });
  } catch (err) {
    console.error("Cancel booking failed:", err.message);
    res.status(500).json({ message: "Cancel booking failed", error: err.message });
  }
};
