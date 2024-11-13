import React from 'react';
import StockCard from './stockCard';

interface Stock {
  symbol: string;
  price: number;
  change: number;
}

interface StockListProps {
  stocks: Stock[];
}

const StockList: React.FC<StockListProps> = ({ stocks }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {stocks.map((stock) => (
        <StockCard
          key={stock.symbol}
          symbol={stock.symbol}
          price={stock.price}
          change={stock.change}
        />
      ))}
    </div>
  );
};

export default StockList;
