import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { facilityIcons, roomsDummyData, roomCommonData } from '../assets/assets';
import StarRating from '../components/StarRating';
import { assets } from '../assets/assets';
import BookingForm from '../components/BookingForm';
const RoomDetails = () => {
    const {id} = useParams();
    const [room,setRoom] = useState(null);
    const [mainImgage,setMainImage] = useState(null);

    useEffect((roo)=>{
        const room=roomsDummyData.find((roo) => roo._id === id)
        room && setRoom(room);
        room && setMainImage(room.images[0]);
    },[])
  return room && (
    <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'> 
      {/* room details */}
      <div className='flex flex-col md:flex-row items-start md:items-center gap-2' >
        <h1 className='text-3xl md:text-4xl font-playfair'>{room.hotel.name } <span className='font-inter text-sm'>({room.roomType})</span></h1>
        <p className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full'>20% OFF</p>
      </div>

      {/* room rating display */}

      <div className='flex items-center gap-1 mt-2'>
        <StarRating/>
        <p className='ml-2'> 200+ reviews</p>
      </div>
         
      {/* room addresss */}

      <div className='flex items-center gap-1 text-gray-500 mt-2 '>
        <img src={assets.locationIcon} alt="" />
        <span>{room.hotel.address}</span>
      </div>

      {/* room images */}
      <div className='flex flex-col lg:flex-row gap-6 mt-6'>
        <div className='lg:w-1/2 w-full'>
            <img src={mainImgage} alt="" className='w-full object-cover rounded-xl shadow-lg' />
        </div>
        <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full '>
            {room.images.length>1 && room.images.map((img,index) => (
                <img key={index} src={img} alt="" className={`w-full object-cover rounded-xl shadow-md cursor-pointer ${img === mainImgage && 'outline-3 outline-orange-500'}`} onClick={() => setMainImage(img)}/>
            ))}
        </div>
      </div>

      {/* room Highlights */}
      <div className='flex flex-col md:flex-row md:justify-between mt-10'>
        <div className='flex flex-col'>
            <h1 className='text-3xl md:text-4xl font-playfair'>Experience Luxury Like Never Before</h1>
            <div className='flex flex-wrap gap-4 mt-4 items-center mb-6 '>
                {room.amenities.map((amenity,index) => ( 
                    <div key={index} className='flex items-center gap-2 px-3 py-2'>
                      <img src={facilityIcons[amenity]} alt="" className='w-5 h-5'/>
                      <p className='text-xs'>{amenity}</p>
                    </div>
                ))}
            </div>
        </div>
        <p className='text-2xl font-medium'>${room.pricePerNight}</p>
      </div>

      {/* checkin and checkout */}
      <BookingForm
        hotelName={room.hotel.name}
        roomName={room.roomType}
        pricePerNight={room.pricePerNight}
      />

      {/* room specifications */}
      <div className='mt-25 space-y-4'>
         {roomCommonData.map((spec,index) => (
            <div key={index} className='flex items-start gap-2' > 
              <img src={spec.icon} alt="" className='w-6.5' />
               
              <div>
                <p className='font-base'>{spec.title}</p>
                <p className='text-gray-500'>{spec.description}</p>
              </div>

            </div>
          ))}
              
      </div>

      <div className= 'max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500' >
        <p>Guests will be allocated on the ground floor according to availability.
        You get a comfortable Two bedroom apartment has a true city feeling. The
        price quoted is for two guest, at the guest slot please mark the number of
        guests to get the exact price for groups. The Guests will be allocated
        ground floor according to availability. You get the comfortable two bedroom
        apartment that has a true city feeling.</p>
      </div>
      
      {/* hosted by */}
      <div className='flex flex-col items-start gap-4'>
          <div className='flex gap-4'>
              <img src={room.hotel.owner.image} alt="Host" className='h-14 w-14
              md:h-18 md:w-18 rounded-full' />
              <div>
                <p className='text-lg md:text-xl'>Hosted by {room.hotel.name}</p>
                <div className='flex items-center mt-1'>
                 < StarRating />
                <p className='m1-2'>200+ reviews </p>
                </div>
              </div>
         </div>
          <button className='px-6 py-2.5 mt-4 rounded bg-amber-500 hover:bg-primary-dull transition-all cursor-pointer'>
            Contact Host
          </button>
      </div>

    </div>
  )
}

export default RoomDetails