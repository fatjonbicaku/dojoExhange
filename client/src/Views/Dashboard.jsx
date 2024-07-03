import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  // Initialize state to hold user data
  const [userData, setUserData] = useState({
    username: '',
    totalBalance: 0,
    cashBalance: 0,
    cryptoBalance: 0,
    holdings: [],
    recentTransactions: []
  });

  // Fetch user data from localStorage on component mount
  useEffect(() => {

    axios.get('http://localhost:8000/api/user' , {withCredentials:true})
    .then(res=> console.log(res.data.balance)
  )

    .catch(err=> console.log(err))

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userDataFromStorage = JSON.parse(storedUser);
      setUserData({
        username: userDataFromStorage.firstName, // Assuming firstName is stored in user data
        cashBalance: userDataFromStorage.cashBalance || 0,
        cryptoBalance: userDataFromStorage.cryptoBalance || 0,
        holdings: userDataFromStorage.holdings || [],
        recentTransactions: userDataFromStorage.recentTransactions || []
      });
    }
  }, []);

  return (
    <div className='dashboard-container'>
      <div className="dashboard-elements">
        <div className="user-info">
          <h1>Welcome, {userData.username}</h1>
          <div className="right-user">
            <Link to={'/deposit'}>
              <button className="dashboard-button deposit-button">Deposit</button>
            </Link>
            <Link to={'/markets'}>
              <button className="dashboard-button trade-button">Trade</button>
            </Link>
          </div>
        </div>

        <div className="user-balance">
          <h3>Total Balance: ${userData.totalBalance}</h3>
          <h4>Cash: ${userData.cashBalance}</h4>
          <h4>Crypto: ${userData.cryptoBalance}</h4>
        </div>

        <div className="wallet">
          <h2>User Holdings</h2>
          <table>
            <thead>
              <tr>
                <th>Currency</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {userData.holdings.map((holding, index) => (
                <tr key={index}>
                  <td>{holding.currency}</td>
                  <td>{holding.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="recent-transaction">
          <h2>Recent Transactions</h2>
          <ul>
            {userData.recentTransactions.map((transaction, index) => (
              <li key={index}>
                <span>{transaction.type}</span>
                <span>${transaction.amount}</span>
                <span>{transaction.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
