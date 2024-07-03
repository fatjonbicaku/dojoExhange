import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './Views/Home';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Markets from './Views/Markets';
import CoinDetails from './Views/CoinDetails';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Views/Dashboard';
import Deposit from './Components/Deposit';
import Trade from './Views/Trade';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const User = localStorage.getItem('user');
    if (User) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/markets/:coinName" element={<CoinDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : ''} />
          <Route path="/deposit" element={isLoggedIn ? <Deposit /> : ''} />
          <Route path="/trade/:coinName" element={isLoggedIn ? <Trade /> : 'Please Log In' } />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
