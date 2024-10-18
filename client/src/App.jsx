// import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import LandingPage from '@/pages/LandingPage';
import RegisterPage from '@/pages/RegisterPage';
import LoginPage from '@/pages/LoginPage';
import ProposalPage from '@/pages/ProposalPage';
import ChatPage from '@/pages/ChatPage';
import TextEditor from '@/pages/TextEditor';
import Dashboard from '@/pages/Dashboard';
import EventPage from '@/pages/EventPage';
import NetworkingPage from '@/pages/NetworkingPage';
import JoinRoomPage from '@/components/videoconf/JoinRoomPage';
import JoinCallPage from '@/components/videoconf/JoinCallPage';

import WarehousePage from './pages/Warehouse';
import WarehouseSettings from './pages/WarehouseSettings';
import InvestorProfilePage from './pages/InvestorProfilePage';
import RuralBusinessPage from './pages/RuralBusinessPage.jsx';
import MarketPlacePage from './pages/MarketPlacePage';


import KhataBook from './pages/KhataBook';
const App = () => {
  return (
    <div>
      <Toaster position="bottom-right" richColors />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/proposal" element={<ProposalPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/documents/:id" element={<TextEditor />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/events' element={<EventPage />} />
        <Route path='/networking' element={<NetworkingPage />} />
        <Route path='/marketplace' element={<MarketPlacePage />} />
        <Route path="/joinroom" element={<JoinRoomPage />} />
        <Route path="/room/:roomId" element={<JoinCallPage />} />
        <Route path='/warehouse' element={<WarehousePage />} />
        <Route path='/warehouse-settings' element={<WarehouseSettings />} />
        <Route path='/profile' element={<InvestorProfilePage />} />
        <Route path="/schemes" element={<RuralBusinessPage />} />
       <Route path="/khata" element={<KhataBook />} />
      </Routes>
    </div>
  );
};


export default App;