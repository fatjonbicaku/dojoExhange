import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Nav({ isLoggedIn, setIsLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/logout', {}, {
        withCredentials: true
      });
      localStorage.removeItem('user');
      document.cookie = 'usertoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      setIsLoggedIn(false); // Update isLoggedIn state
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav>
      <div className="logo">
        <Link to={'/'}><img src={logo} alt="Logo" /></Link>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <i className="fa fa-bars"></i>
      </div>
      <div className={`items ${menuOpen ? 'show' : ''}`}>
        <ul>
          <Link className='link' to={'/'}><li>Home</li></Link>
          <Link className='link' to={'/markets'}><li>Markets</li></Link>
        </ul>
        {isLoggedIn ? (
          <div className="buttons">
            <Link className='link' to={'/dashboard'}><button className='dashboard'>Dashboard</button></Link>
            <button className='profile' onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="buttons">
            <Link className='link' to={'/login'}><button className='login'><i className="fa fa-right-to-bracket"></i> Login</button></Link>
            <Link className='link' to={'/register'}><button className='register'><i className="fa fa-user-plus"></i> Register</button></Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Nav;
