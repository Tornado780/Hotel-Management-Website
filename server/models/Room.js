import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
  roomType: String,
  images: [String],
  pricePerNight: Number,
  amenities: [String],
}, { timestamps: true });

export default mongoose.models.Room || mongoose.model("Room", roomSchema);
