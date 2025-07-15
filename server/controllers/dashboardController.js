import Booking from '../models/Booking.js';

export const getDashboardData = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();

    const totalRevenueAgg = await Booking.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: "$price" } } }
    ]);
    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user', 'name')    
      .populate('room', 'roomType');   

    res.status(200).json({
      totalBookings,
      totalRevenue,
      bookings
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ message: 'Server error fetching dashboard data' });
  }
};
