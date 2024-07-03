import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false')
      .then(res => {
        setCoins(res.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div className="container">
      <section className="hero">
        <div className="leftHero">
          <h3>Invest with Confidence</h3>
          <p>Start Buying Crypto with 0% commission</p>
          <button className="explore-button"><Link to='/markets' className="link">Explore the Market</Link></button>
        </div>
        <div className="rightHero">
          <div className="box">
            <h3>Popular Crypto Coins</h3>
            <table className="coin-table">
              <tbody>
                {coins.length > 0 ? coins.map(coin => (
                  <tr key={coin.id}>
                    <Link to={`/markets/${coin.id}`} className="link">
                      <td><img src={coin.image} alt={coin.name} width="30" /></td>
                      <td>{coin.name}</td>
                      <td>${coin.current_price.toFixed(2)}</td>
                    </Link>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="3">Loading...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className='banner'>
        <h1>Start Investing Today</h1>
       <Link to={'/register'}><button>Sign up</button></Link> 
      </section>
    </div>
  );
}

export default Home;
