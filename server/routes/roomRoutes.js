import express from 'express';
import Room from '../models/Room.js';
import { createRoom } from '../controllers/roomController.js';
const router = express.Router();

// GET all rooms with hotel data
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find().populate('hotel');
    res.json(rooms);
  } catch (error) {
    console.error("Failed to fetch rooms:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', createRoom);

router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('hotel');
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


export default router;
