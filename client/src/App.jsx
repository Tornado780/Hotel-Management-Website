import React, { use } from 'react'
import Navbar from './components/Navbar'
import { useLocation, Routes,Route } from 'react-router-dom'
import Home from './pages/home'
import Footer from './components/Footer'
import AllRooms from './pages/AllRooms'
import RoomDetails from './pages/RoomDetails'
import MyBookings from './pages/MyBookings'
import HotelReg from './components/HotelReg'
import Layout from './pages/hotelOwner/Layout'
import Addroom from './pages/hotelOwner/Addroom'
import Dashboard from './pages/hotelOwner/Dashboard'
import ListRoom from './pages/hotelOwner/ListRoom'
function App() {
   const isOwnerPath= useLocation().pathname.includes("owner");
  return (
    <div>
     {!isOwnerPath && <Navbar />}
      {false && <HotelReg />}
      <div className='min-h-[70vh]'>
           <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/rooms' element={<AllRooms/>}/>
              <Route path='/rooms/:id' element={<RoomDetails/>}></Route>
              <Route path='/my-bookings' element={<MyBookings/>}></Route>
              <Route path='/owner' element={<Layout/>} >
                  <Route index element={<Dashboard/>}></Route>
                  <Route path='add-room' element={<Addroom/>}></Route>
                  <Route path='list-room' element={<ListRoom/>}></Route>
              </Route>
          </Routes>
      </div>
      <Footer/>
    </div>
    
  )
 
}

export default App
