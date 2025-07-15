import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  city: String,
  owner: {
    name: String,
    image: String
  },
}, { timestamps: true });

export default mongoose.models.Hotel || mongoose.model("Hotel", hotelSchema);
