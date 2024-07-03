import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BuySell({ coinName }) {
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
          params: {
            vs_currency: 'usd',
            ids: coinName
          }
        });
        setCoin(response.data[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coin data:', error);
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [coinName]);

  if (loading) {
    return <div style={{ textAlign: 'center', backgroundColor: 'black', height: '100vh', color: 'white' }}>Loading...</div>;
  }

  return (
    <div className="buy-sell-container">
      {coin ? (
        <>
          <div className="coin-details-trade">
            <img src={coin.image} alt={coin.name} style={{ maxWidth: '100px', maxHeight: '100px', marginBottom: '10px' }} />
            <h3>{coin.name}</h3>
            <p>Symbol: {coin.symbol.toUpperCase()}</p>
            <p>Current Price: ${coin.current_price.toFixed(2)}</p>
            <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
            <p>24h High: ${coin.high_24h.toFixed(2)}</p>
            <p>24h Low: ${coin.low_24h.toFixed(2)}</p>
          </div>
          <div className="buy-sell-boxes">
            <div className="buy-box">
              <h4>Buy {coin.name}</h4>
              <form className="buy-sell-form">
                <label htmlFor="buy-quantity">Quantity:</label>
                <input type="number" id="buy-quantity" name="buy-quantity" min="0" step="0.0001" required />
                <button type="submit" className="buy-button">Buy</button>
              </form>
            </div>
            <div className="sell-box">
              <h4>Sell {coin.name}</h4>
              <form className="buy-sell-form">
                <label htmlFor="sell-quantity">Quantity:</label>
                <input type="number" id="sell-quantity" name="sell-quantity" min="0" step="0.0001" required />
                <button type="submit" className="sell-button">Sell</button>
              </form>
            </div>
          </div>
        </>
      ) : (
        <div>Coin data not found.</div>
      )}
    </div>
  );
}

export default BuySell;
