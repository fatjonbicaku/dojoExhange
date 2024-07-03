import React from 'react';
import { useParams } from 'react-router-dom';
import BuySell from '../Components/BuySell';

function Trade() {
  const { coinName } = useParams();

  return (
    <div className="trade-container">
      <BuySell coinName={coinName} />
    </div>
  );
}

export default Trade;
