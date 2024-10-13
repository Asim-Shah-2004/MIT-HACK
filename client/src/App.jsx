import React from 'react';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import EventPage from './pages/EventPage';
import { Route, Routes } from 'react-router-dom';
import NetworkingPage from './pages/NetworkingPage';
import NetworkingPage2 from './pages/NetworkingPage2';
// import GanntPage from './pages/GanntPage';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/context/AuthContext';

function App() {
  return (
    <div>
      <AuthProvider>
        <Toaster position="top-right" richColors />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/network" element={<NetworkingPage2 />} />
          {/* <Route path="/calendar" element={<GanntPage />} /> */}
        </Routes>
      </AuthProvider>
    </div>
  )
}


export default App;