import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    general: '', // General error message
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' }); // Clear error message on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8000/api/register', formData, {
          withCredentials: true,
        });
        if (response.data.message === 'success') {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          navigate('/'); 
        }
      } catch (error) {
        console.error('Registration failed:', error.response.data.message);
        setFormErrors({ ...formErrors, general: error.response.data.message });
      }
    } else {
      console.error('Form validation failed.');
    }
  };

  const validateForm = () => {
    let valid = true;
    const newFormErrors = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      general: '', // General error message
    };

    // Validate each field
    if (formData.firstName.trim() === '') {
      newFormErrors.firstName = 'First Name is required';
      valid = false;
    }

    if (formData.lastName.trim() === '') {
      newFormErrors.lastName = 'Last Name is required';
      valid = false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newFormErrors.email = 'Please enter a valid email';
      valid = false;
    }

    if (formData.password.length < 8) {
      newFormErrors.password = 'Password must be at least 8 characters long';
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newFormErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setFormErrors(newFormErrors);
    return valid;
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={formErrors.firstName ? 'input-error' : ''}
            />
            {formErrors.firstName && <span className="error-msg">{formErrors.firstName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={formErrors.lastName ? 'input-error' : ''}
            />
            {formErrors.lastName && <span className="error-msg">{formErrors.lastName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={formErrors.email ? 'input-error' : ''}
            />
            {formErrors.email && <span className="error-msg">{formErrors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={formErrors.password ? 'input-error' : ''}
            />
            {formErrors.password && <span className="error-msg">{formErrors.password}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={formErrors.confirmPassword ? 'input-error' : ''}
            />
            {formErrors.confirmPassword && (
              <span className="error-msg">{formErrors.confirmPassword}</span>
            )}
          </div>
          {formErrors.general && <span className="error-msg">{formErrors.general}</span>}
          <button type="submit" className="button-register">
            Register
          </button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
