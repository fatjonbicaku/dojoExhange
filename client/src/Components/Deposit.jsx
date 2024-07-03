import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Deposit() {
  const navigate = useNavigate()
  // Example data for payment methods
  const paymentMethods = [
    { id: 1, name: 'Credit Card' },
    { id: 2, name: 'PayPal' },
    { id: 3, name: 'Bank Transfer' },
    { id: 4, name: 'Cryptocurrency' },
  ];

  const [selectedMethod, setSelectedMethod] = useState('');
  const [amount, setAmount] = useState('');

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        throw new Error('User not found in localStorage');
      }

      const user = JSON.parse(storedUser);
      
      const response = await axios.post(
        'http://localhost:8000/api/deposit',
        {
          userId: user._id, // Assuming user ID is stored as _id in your user object
          amount: parseFloat(amount),
          method: paymentMethods.find(method => method.id === selectedMethod)?.name || ''
        },
        {
          withCredentials: true // Add this if you need to include credentials
        }
      );

      console.log(response.data.message);
      navigate('/dashboard')
      // Log success message
      // Optionally, you can update UI state or show a success message
    } catch (error) {
      console.error('Deposit failed:', error.response ? error.response.data : error.message);
      // Handle error, display error message, etc.
    }
  };

  return (
    <div className="deposit-container">
      <div className="deposit-elements">
        <h2 className="deposit-header">Deposit</h2>
        <div className="payment-methods">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => handleMethodSelect(method.id)}
              className={`payment-method ${selectedMethod === method.id && 'selected'}`}
            >
              {method.name}
            </button>
          ))}
        </div>
        {selectedMethod && (
          <form onSubmit={handleSubmit} className="deposit-form">
            <label htmlFor="amount" className="deposit-label">Amount:</label>
            <input
              type="text"
              id="amount"
              name="amount"
              className="deposit-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <button type="submit" className="submit-button">
              Submit Deposit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Deposit;
