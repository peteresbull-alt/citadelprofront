"use client";

import { useEffect, useState } from "react";

import { ALPHA_ADVANTAGE_API_KEY } from "@/lib/constants";

type Asset = {
  name: string;
  price: string; // price as string for display
  change: string; // change percentage as string
};

type GroupedAssets = {
  forex: Asset[];
  crypto: Asset[];
  stocks: Asset[];
};

export default function useLiveAssets() {
  const [assets, setAssets] = useState<GroupedAssets>({
    forex: [],
    crypto: [],
    stocks: [],
  });

  useEffect(() => {
    async function fetchForex() {
      // Example using Alpha Vantage
      const key = ALPHA_ADVANTAGE_API_KEY;
      const forexPairs = ["EURUSD", "GBPUSD", "USDJPY"];
      const forexPromises = forexPairs.map(async (pair) => {
        const from = pair.substring(0, 3);
        const to = pair.substring(3);
        const res = await fetch(
          `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${to}&apikey=${key}`
        );
        const data = await res.json();
        const rateInfo = data["Realtime Currency Exchange Rate"];
        const price = parseFloat(rateInfo["5. Exchange Rate"]);
        // We might not get change pct directly from this endpoint
        return {
          name: pair,
          price: price.toFixed(5),
          change: "0.00%", // placeholder. You’d use another endpoint for % change
        };
      });

      const forexAssets = await Promise.all(forexPromises);
      return forexAssets;
    }

    async function fetchCrypto() {
      // Example using CoinGecko (free, no API key needed for basics)
      const ids = ["bitcoin", "ethereum", "ripple"];
      const vsCurrency = "usd";
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(
        ","
      )}&vs_currencies=${vsCurrency}&include_24hr_change=true`;
      const res = await fetch(url);
      const data = await res.json();
      const cryptoAssets: Asset[] = ids.map((id) => {
        const obj = data[id];
        const change = obj[`${vsCurrency}_24h_change`];
        return {
          name: id.toUpperCase(), // e.g. "BITCOIN"
          price: obj[vsCurrency].toString(),
          change: (change >= 0 ? "+" : "") + change.toFixed(2) + "%",
        };
      });
      return cryptoAssets;
    }

    async function fetchStocks() {
      // Example with Alpha Vantage for stocks
      const key = ALPHA_ADVANTAGE_API_KEY;
      const symbols = ["AAPL", "MSFT", "GOOGL"];
      const stockPromises = symbols.map(async (sym) => {
        const res = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${sym}&apikey=${key}`
        );
        const data = await res.json();
        const quote = data["Global Quote"];
        return {
          name: sym,
          price: parseFloat(quote["05. price"]).toFixed(2),
          change: quote["10. change percent"], // e.g. "-0.30%"
        };
      });

      const stockAssets = await Promise.all(stockPromises);
      return stockAssets;
    }

    async function loadAssets() {
      const [forex, crypto, stocks] = await Promise.all([
        fetchForex(),
        fetchCrypto(),
        fetchStocks(),
      ]);
      setAssets({
        forex,
        crypto,
        stocks,
      });
    }

    loadAssets();

    const interval = setInterval(loadAssets, 60 * 1000); // refresh every minute
    return () => clearInterval(interval);
  }, []);

  return assets;
}
