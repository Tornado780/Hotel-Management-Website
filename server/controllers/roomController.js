// controllers/roomController.js

import Room from '../models/Room.js';
import mongoose from 'mongoose';

export const createRoom = async (req, res) => {
  try {
    const { hotel, roomType, imageUrls, pricePerNight, amenities } = req.body;

    if (!hotel || !roomType || !imageUrls || !pricePerNight) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newRoom = new Room({
      hotel,
      roomType,
      images: imageUrls,
      pricePerNight,
      amenities
    });

    const savedRoom = await newRoom.save();

    res.status(201).json({
      message: 'Room created successfully',
      data: savedRoom
    });

  } catch (err) {
    console.error('Error in createRoom:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
