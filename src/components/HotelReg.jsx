import React from 'react';
import { assets } from '../assets/assets';
import { cities } from '../assets/assets';
const HotelReg = () => {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70'>
      <form className='flex bg-white rounded-xl max-w-4xl max-md:mx-2'>
        <img src={assets.regImage} alt="reg-image" className='w-1/2 rounded-xl hidden md:block' />

        <div className='relative flex flex-col items-center md:w-1/2 p-8 md:p-10'>
          <img src={assets.closeIcon} alt="close-icon" className='absolute top-4 right-4 h-4 w-4 cursor-pointer' />
          <p className='text-2xl font-semibold mt-6'>Register Your Hotel</p>

          {/* hotel Name */}
          <div className='w-full mt-4'>
             <label htmlFor="name" className='font-medium text-gray-500'>Hotel Name</label>
             <input type="text" name="name" id="name" placeholder='Enter your hotel name' className='w-full rounded border border-gray-200 px-3 py-2.5 mt-1 font-light outline-indigo-500' required />
          </div>
          
          {/* contact */}
           <div className='w-full mt-4'>
             <label htmlFor="contact" className='font-medium text-gray-500'>Contact Number</label>
             <input type="text" name="contact" id="contact" placeholder='Enter your contact number' className='w-full rounded border border-gray-200 px-3 py-2.5 mt-1 font-light outline-indigo-500' required />
          </div>

          {/* address */}
           <div className='w-full mt-4'>
             <label htmlFor="address" className='font-medium text-gray-500'>Address</label>
             <input type="text" name="address" id="address" placeholder='Enter Hotel Address' className='w-full rounded border border-gray-200 px-3 py-2.5 mt-1 font-light outline-indigo-500' required />
          </div>

          {/* city drop down */}
          <div className='w-full mt-4  mr-auto'>
             <label htmlFor="city" className='font-medium text-gray-500'>City</label>
             <select name="city" id="city" className='w-full rounded border border-gray-200 px-3 py-2.5 mt-1 font-light outline-indigo-500' required>
               <option value="Select city">Select City</option>
               {cities.map((city, index) => (<option key={index} value={city}>{city}</option>))}
             </select>
          </div>
          <button className='mt-6 px-6 py-2 border border-gray-300 rounded bg-indigo-500 hover:bg-indigo-600 text-white transition-all cursor-pointer'>Register</button>
        </div>
      </form>
    </div>
  );
};

export default HotelReg;
