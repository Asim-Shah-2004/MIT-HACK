import React from 'react'
import LandingPage from './pages/LandingPage'
import RegisterPage from './pages/RegisterPage'
import EventPage from './pages/EventPage'
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div> 
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/event" element={<EventPage />} />
      </Routes>
    </div>
  )
}


export default App;