import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const {
      hotelId,      // now expecting actual ObjectId
      roomId,
      guests,
      price,
      checkIn,
      checkOut,
      paymentStatus = "pending",
    } = req.body;

    const userId = req.user.userId;

    const booking = await Booking.create({
      user: userId,
      hotel: hotelId,
      room: roomId,
      guests,
      price,
      checkIn,
      checkOut,
      paymentStatus,
    });

    res.status(201).json({ message: "Booking successful", booking });
  } catch (err) {
    res.status(500).json({ message: "Booking failed", error: err.message });
  }
};
