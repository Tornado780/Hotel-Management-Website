import React from 'react'
import { roomsDummyData } from '../assets/assets'
import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'
function FeaturedDestination() {
    const navigate= useNavigate()
  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>

       <Title title="Featured Destinations" subTitle="Discover the best destinations for your next vacation." />
       <div className='flex flex-row flex-nowrap items-center justify-center gap-6 mt-20 overflow-x-auto'>

        {roomsDummyData.slice(0,4).map((room, index) => (<HotelCard key={index} room={room} index={index} />))}
       </div>
        <button className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer' onClick={()=>{navigate('/rooms'); scrollTo(0,0)}}>View All Destinations</button>
    </div>
  )
}

export default FeaturedDestination
