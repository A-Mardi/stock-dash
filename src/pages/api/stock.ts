// src/pages/api/stocks.ts
import type { NextApiRequest, NextApiResponse } from 'next';

interface Stock {
  symbol: string;
  price: number;
  change: number;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Stock[] | { error: string }>) => {
  const apiKey = 'cs261j9r01qpjum5q44gcs261j9r01qpjum5q450'; 

  try {
    const symbols = ['AAPL', 'GOOGL', 'AMZN', 'TSLA', 'MSFT', 'NFLX', 'FB', 'NVDA'];
    const stockPromises = symbols.map(async (symbol) => {
      const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data for ${symbol}`);
      }
      const data = await response.json();
      return {
        symbol,
        price: data.c, 
        change: ((data.c - data.pc) / data.pc) * 100, 
      };
    });

    const stocks = await Promise.all(stockPromises);
    res.status(200).json(stocks);
  } catch (error: any) {
    console.error('Error fetching stock data:', error);
    res.status(500).json({ error: 'Failed to fetch stock data.' });
  }
};

export default handler;
