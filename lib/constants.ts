export const ALPHA_ADVANTAGE_API_KEY = process.env.ALPHA_ADVANTAGE_API_KEY;

export const BACKEND_URL = process.env.NEXT_PUBLIC_APP_BACKEND_URL;

// Grouped instruments (like desktop Sidebar)
export const assets = {
  Forex: [
    {
      symbol: "EURUSD",
      flag: "/eurousd_nobg.png",
      change: 0.02,
      bid: 1.18031,
      ask: 1.18051,
      low: 1.17626,
      high: 1.18199,
      time: "10:47:52",
    },
    {
      symbol: "GBPUSD",
      flag: "/gbpusd_nobg.png",
      change: -0.04,
      bid: 1.35043,
      ask: 1.35082,
      low: 1.34869,
      high: 1.35278,
      time: "10:47:52",
    },
  ],
  Crypto: [
    {
      symbol: "BTCUSD",
      flag: "/btc_nobg.png",
      change: 2.4,
      bid: 27350,
      ask: 27370,
      low: 27000,
      high: 27500,
      time: "10:47:52",
    },
    {
      symbol: "ETHUSD",
      flag: "/eth_nobg.png",
      change: -1.2,
      bid: 1650,
      ask: 1655,
      low: 1600,
      high: 1680,
      time: "10:47:52",
    },
  ],
  Commodities: [
    {
      symbol: "XAUUSD",
      flag: "/gold_nobg.png",
      change: 0.5,
      bid: 1920,
      ask: 1922,
      low: 1900,
      high: 1935,
      time: "10:47:52",
    },
    {
      symbol: "XAGUSD",
      flag: "/silver_nobg.png",
      change: -0.3,
      bid: 24.1,
      ask: 24.3,
      low: 23.9,
      high: 24.5,
      time: "10:47:52",
    },
  ],
};
