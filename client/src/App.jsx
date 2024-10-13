import React from 'react';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import EventPage from './pages/EventPage';
import { Route, Routes } from 'react-router-dom';
import NetworkingPage from './pages/NetworkingPage';
// import GanntPage from './pages/GanntPage';
import { Toaster } from 'sonner';

function App() {
  return (
    <div>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/network" element={<NetworkingPage />} />
        {/* <Route path="/calendar" element={<GanntPage />} /> */}
      </Routes>
    </div>
  )
}


export default App;