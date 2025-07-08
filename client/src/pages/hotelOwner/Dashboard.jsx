import React,{useState} from 'react';
import { assets, dashboardDummyData, } from '../../assets/assets';
import Title from '../../components/Title';

const Dashboard = () => {
   const [dashboardData, setDashboardData] = useState(dashboardDummyData);
  return (
    <div>

      <Title align="left" font="outfit" title="Dashboard" subTitle="Monitor your room listings, track bookings and analyze revenue — all in one place. Stay updated with real-time insights to ensure smooth operations."  />

      <div className="flex gap-4 my-8">

        {/* Total Bookings */}
        <div className="bg-primary/3 border border-primary/10 p-6 rounded-xl flex items-center gap-4 shadow-sm pr-8">
          <img src={assets.totalBookingIcon} alt="Total Bookings" className="h-10" />
          <div className='flex flex-col sm:ml-4 font-medium'>
            <p className="text-lg text-blue-500">Total Bookings</p>
            <p className="text-neutral-400  text-base">{dashboardData.totalBookings}</p> 
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-primary/3 border border-primary/10 p-6 rounded-xl flex items-center gap-4 shadow-sm pr-8">
          <img src={assets.totalRevenueIcon} alt="Total Bookings" className="h-10" />
          <div className='flex flex-col sm:ml-4 font-medium'>
            <p className="text-lg text-blue-500">Total Revenue</p>
            <p className="text-neutral-400  text-base">${dashboardData.totalRevenue}</p> 
          </div>
        </div>

      </div>

      {/* recent boolings */}

      <h2 className='text-xl text-blue-950/70 font-medium mb-5'>Recent Bookings</h2>

      <div className='w-full max-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll'>

        <table className='w-full'>
          <thead className='bg-gray-50'>
              <tr>
                <th className='py-3 px-4 text-gray-800 font-medium'>User Name</th>
                <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Room Name</th>
                <th className='py-3 px-4 text-gray-800 font-medium text-center'>Total Amount</th>
                <th className='py-3 px-4 text-gray-800 font-medium text-center'>Payment Status</th>

              </tr>
          </thead>
          <tbody className="text-sm">
            {dashboardData.bookings.map((item, index) => (
              <tr key={index}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.user.username}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 ">
                  {item.room.roomType}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  ₹ {item.totalPrice}
                </td>
                 <td className='py-3 px-4 text-gray-700 border-t border-gray-300 flex '>
                   <button className={`py-1 px-3 rounded-full mx-auto text-xs ${item.isPaid? 'bg-green-200 text-green-600' : 'bg-amber-200 text-yellow-600'}`}>
                      {item.isPaid? 'Completed' : 'Pending'}
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
