import React from 'react';

interface StockCardProps {
  symbol: string;
  price: number;
  change: number;
}

const StockCard: React.FC<StockCardProps> = ({ symbol, price, change }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
      <div>
        <h2 className="text-xl font-bold">{symbol}</h2>
        <p className="text-gray-600">${price.toFixed(2)}</p>
      </div>
      <div>
        <p
          className={`text-sm font-semibold ${
            change >= 0 ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {change >= 0 ? '+' : ''}
          {change.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default StockCard;
