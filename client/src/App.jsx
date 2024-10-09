import React from 'react'
import RegisterPage from './pages/RegisterPage'
import LandingPage from './pages/LandingPage'
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div> 
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
      </Routes>
    </div>
  )
}


export default App;