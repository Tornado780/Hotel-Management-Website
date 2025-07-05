import React, { use } from 'react'
import Navbar from './components/Navbar'
import { useLocation, Routes,Route } from 'react-router-dom'
import Home from './pages/home'
import Footer from './components/Footer'
import AllRooms from './pages/AllRooms'
import RoomDetails from './pages/RoomDetails'
import MyBookings from './pages/MyBookings'
function App() {
   const isOwnerPath= useLocation().pathname.includes("owner");
  return (
    <div>
     {!isOwnerPath && <Navbar />}
      <div className='min-h-[70vh]'>
           <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/rooms' element={<AllRooms/>}/>
              <Route path='/rooms/:id' element={<RoomDetails/>}></Route>
              <Route path='/my-bookings' element={<MyBookings/>}></Route>
          </Routes>
      </div>
      <Footer/>
    </div>
    
  )
 
}

export default App
