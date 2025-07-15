import Booking from "../models/Booking.js";
import mongoose from 'mongoose';

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
      console.log('roomId:', roomId);
      console.log('hotelId:', hotelId);
      console.log('userId:', userId);

    if (!hotelId || !roomId) {
      return res.status(400).json({ message: "Missing hotelId or roomId" });
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

    res.status(201).json({ message: "Booking successful", booking });
  } catch (err) {
    console.error("Booking failed:", err.message);
    res.status(500).json({ message: "Booking failed", error: err.message });
  }
};
