import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Markets() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 50,
        page: 1,
        sparkline: false
      }
    })
      .then(res => {
        setCoins(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="markets-container">
      {loading ? (
        <div style={{textAlign:"center",backgroundColor:"black",height:"100vh",color:"white"}}>Loading...</div>
      ) : (
        <div className="list-container">
          <h2>Markets Overview </h2>
          <input
            type="text"
            placeholder="Search for a coin"
            value={search}
            onChange={handleSearch}
            className="search-input"
          />
          <ul className="coin-list">
            {filteredCoins.map(coin => (
              <li key={coin.id} className="coin-item">
                <Link to={`/markets/${coin.id}`}>
                  <img src={coin.image} alt={coin.name} width="30" />
                  <span>{coin.name}</span>
                  <span>${coin.current_price.toFixed(2)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Markets;
