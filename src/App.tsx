import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './app.css';


import LandingPage from './pages/LandingPage';
import Canteen1 from './pages/Canteen1';
import Canteen2 from './pages/Canteen2';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/canteen1" element={<Canteen1 />} />
        <Route path="/canteen2" element={<Canteen2 />} />
      </Routes>
    </Router>
  );
}

export default App;
