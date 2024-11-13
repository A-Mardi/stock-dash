import type { NextPage } from 'next';
import Head from 'next/head';
import StockList from '../app/components/stockList';
import { useEffect, useState } from 'react';

interface Stock {
  symbol: string;
  price: number;
  change: number;
}

const Home: NextPage = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch('/api/stocks');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch stock data');
        }
        const data: Stock[] = await response.json();
        setStocks(data);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
  
    fetchStockData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Stock Dashboard</title>
        <meta name="description" content="A simple stock dashboard built with Next.js, TypeScript, and Tailwind CSS." />
        <link rel="icon" href="/favicon.ico" />

      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-5 text-center">Stock Dashboard</h1>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && <StockList stocks={stocks} />}
      </main>
    </div>
  );
};

export default Home;
