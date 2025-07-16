import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import HotelCard from './HotelCard';
import Title from './Title';
import { useNavigate } from 'react-router-dom';

function FeaturedDestination() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/rooms`);
        setRooms(res.data.slice(0, 4)); // Show only first 4 featured destinations
      } catch (err) {
        console.error('Error fetching rooms:', err);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20 w-full'>
      <Title
        title="Featured Destinations"
        subTitle="Discover the best destinations for your next vacation."
      />

      {/* Responsive grid container */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-20 w-full'>
        {rooms.map((room, index) => (
          <HotelCard key={room._id || index} room={room} index={index} />
        ))}
      </div>

      <button
        className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer'
        onClick={() => {
          navigate('/rooms');
          scrollTo(0, 0);
        }}
      >
        View All Destinations
      </button>
    </div>
  );
}

export default FeaturedDestination;
