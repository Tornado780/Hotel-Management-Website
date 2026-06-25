import React, { useEffect, useState } from 'react'
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
import SignupPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
 
import AdminRoute from './components/AdminRoute'
function App() {
   const isOwnerPath= useLocation().pathname.includes("owner");
    const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/me`, {
          credentials: "include",
          headers,
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          return;
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
      }

      localStorage.removeItem('authToken');
      setUser(null);
    };

    fetchUser();
  }, []);
  return (
    <div>
     {!isOwnerPath && <Navbar user={user}/>}
      {false && <HotelReg />}
      <div className='min-h-[70vh]'>
           <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/rooms' element={<AllRooms/>}/>
              <Route path='/rooms/:id' element={<RoomDetails/>}></Route>
              <Route path='/my-bookings' element={<MyBookings/>}></Route>
              <Route path='/owner' element={
                                            <AdminRoute>
                                              <Layout/>
                                            </AdminRoute>
                                          } >
                  <Route index element={<Dashboard/>}></Route>
                  <Route path='add-room' element={<HotelReg/>}></Route>
                  <Route path='list-room' element={<ListRoom/>}></Route>
              </Route>
              <Route path='/signup' element={<SignupPage setUser={setUser} />}></Route>
              <Route path='/forgot-password' element={<ForgotPasswordPage/>}></Route>
              <Route path='/reset-password/:token' element={<ResetPasswordPage/>}></Route>
              <Route path="/login" element={<LoginPage setUser={setUser} />} />

          </Routes>
      </div>
      <Footer/>
    </div>
    
  )
 
}

export default App
