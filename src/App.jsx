import React, { use } from 'react'
import Navbar from './components/Navbar'
import { useLocation, Routes,Route } from 'react-router-dom'
import Home from './pages/home'
function App() {
   const isOwnerPath= useLocation().pathname.includes("owner");
  return (
    <div>
     {!isOwnerPath && <Navbar />}
      <div className='min-h-[70vh]'>
           <Routes>
              <Route path='/' element={<Home />}/>
          </Routes>
      </div>
    </div>
  )
}

export default App
