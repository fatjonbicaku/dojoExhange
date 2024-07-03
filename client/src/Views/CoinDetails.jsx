import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function CoinDetails() {
  const { coinName } = useParams();
  const [coinDetails, setCoinDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullText, setShowFullText] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`https://api.coingecko.com/api/v3/coins/${coinName}`)
      .then(res => {
        setCoinDetails(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching coin details:", error);
        setLoading(false);
      });
  }, [coinName]);

  const handleReadMore = () => {
    setShowFullText(true);
  };

  if (loading) {
    return <div style={{textAlign:"center",backgroundColor:"black",height:"100vh",color:"white"}}>Loading...</div>;
  }

  return (
    <div className="coin-details-container">
      {coinDetails && (
        <div className='coin-details-box'> 
          <div className="coin-header">
            <img src={coinDetails.image.small} alt={coinDetails.name} />
            <div>
              <h2>{coinDetails.name} ({coinDetails.symbol.toUpperCase()})</h2>
              <p>Current Price: ${coinDetails.market_data.current_price.usd.toFixed(2)}</p>
            </div>
          </div>
          <div className="coin-details">
            <p>Market Cap Rank: {coinDetails.market_cap_rank}</p>
            <p>Description: {showFullText ? coinDetails.description.en : `${coinDetails.description.en.substring(0, 200)}... `}
              {!showFullText && <button onClick={handleReadMore} className="read-more-button">Read more</button>}
            </p>
          </div>
          <Link to={`/trade/${coinName}`} className="buy-button">Trade {coinDetails.name}</Link>
        </div>
      )}
      {!coinDetails && <div>Coin details not found.</div>}
    </div>
  );
}

export default CoinDetails;
