import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { assets } from '../../assets/assets';
import Title from '../../components/Title';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/dashboard'); // 🔁 Replace with your actual route
        setDashboardData(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard:', err);
        setError('Failed to load dashboard data.');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <p className="text-gray-600">Loading dashboard...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Dashboard"
        subTitle="Monitor your room listings, track bookings and analyze revenue — all in one place. Stay updated with real-time insights to ensure smooth operations."
      />

      <div className="flex gap-4 my-8 flex-wrap">
        {/* Total Bookings */}
        <div className="bg-primary/3 border border-primary/10 p-6 rounded-xl flex items-center gap-4 shadow-sm pr-8">
          <img src={assets.totalBookingIcon} alt="Total Bookings" className="h-10" />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-lg text-blue-500">Total Bookings</p>
            <p className="text-neutral-400 text-base">{dashboardData.totalBookings}</p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-primary/3 border border-primary/10 p-6 rounded-xl flex items-center gap-4 shadow-sm pr-8">
          <img src={assets.totalRevenueIcon} alt="Total Revenue" className="h-10" />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-lg text-blue-500">Total Revenue</p>
            <p className="text-neutral-400 text-base">${dashboardData.totalRevenue}</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl text-blue-950/70 font-medium mb-5">Recent Bookings</h2>

      <div className="w-full max-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">User Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">Room Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">Total Amount</th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">Payment Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {dashboardData.bookings.map((item, index) => (
                
              <tr key={index}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.user?.name || 'Unknown User'}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.room?.roomType || 'N/A'}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  $ {item.price || 0}
                </td>
                <td className='py-3 px-4 text-gray-700 border-t border-gray-300 flex '>
                  <button className={`py-1 px-3 rounded-full mx-auto text-xs ${
                    item.paymentStatus === 'completed'
                      ? 'bg-green-200 text-green-600'
                      : 'bg-yellow-200 text-yellow-600'
                  }`}>
                    {item.paymentStatus === 'completed' ? 'Completed' : 'Pending'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Dashboard;
