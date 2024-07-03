import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8000/api/login', formData, {
          withCredentials: true, // Ensure credentials are sent with the request if using cookies
        });
        if (response.data.message === "success") {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          setIsLoggedIn(true); // Update isLoggedIn state
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Login failed:', error.response.data.message);
        setErrors({ general: error.response.data.message });
      }
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is not valid';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`input ${errors.email && 'input-error'}`}
            />
            {errors.email && <p className="error-msg">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`input ${errors.password && 'input-error'}`}
            />
            {errors.password && <p className="error-msg">{errors.password}</p>}
          </div>
          {errors.general && <p className="error-msg">{errors.general}</p>}
          <button
            type="submit"
            className="button-register"
          >
            Login
          </button>
        </form>
        <div className="login-link">
          <Link to="#">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
