"use client";

import { useState } from "react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Grouped assets
const assets = {
  forex: [
    { name: "EURUSD", price: "1.0864", change: "+0.12%" },
    { name: "GBPUSD", price: "1.2389", change: "-0.18%" },
    { name: "USDJPY", price: "148.34", change: "+0.09%" },
    { name: "USDCHF", price: "0.9055", change: "-0.14%" },
    { name: "AUDUSD", price: "0.6595", change: "+0.03%" },
    { name: "USDCAD", price: "1.3421", change: "+0.15%" },
    { name: "NZDUSD", price: "0.6012", change: "-0.11%" },
    { name: "EURJPY", price: "161.20", change: "+0.20%" },
    { name: "GBPJPY", price: "183.55", change: "-0.25%" },
    { name: "EURGBP", price: "0.8766", change: "+0.05%" },
  ],

  crypto: [
    { name: "BTCUSD", price: "27350", change: "+2.4%" },
    { name: "ETHUSD", price: "1650", change: "-1.2%" },
    { name: "XRPUSD", price: "0.512", change: "+0.9%" },
    { name: "LTCUSD", price: "72.15", change: "-0.5%" },
    { name: "BNBUSD", price: "215.4", change: "+0.7%" },
    { name: "ADAUSD", price: "0.265", change: "-0.8%" },
    { name: "SOLUSD", price: "19.50", change: "+1.3%" },
    { name: "DOGEUSD", price: "0.062", change: "+0.6%" },
    { name: "DOTUSD", price: "4.25", change: "-0.4%" },
    { name: "MATICUSD", price: "0.75", change: "+1.0%" },
  ],

  stocks: [
    { name: "AAPL", price: "178.2", change: "-0.3%" },
    { name: "MSFT", price: "330.1", change: "+1.1%" },
    { name: "GOOGL", price: "135.7", change: "+0.5%" },
    { name: "TSLA", price: "242.9", change: "-0.8%" },
    { name: "AMZN", price: "129.8", change: "+0.2%" },
    { name: "META", price: "295.4", change: "+0.9%" },
    { name: "NFLX", price: "410.3", change: "-0.6%" },
    { name: "NVDA", price: "452.5", change: "+2.2%" },
  ],
};

export default function Sidebar({
  onSelectSymbol,
}: {
  onSelectSymbol: (symbol: string) => void;
}) {
  const [market, setMarket] = useState<keyof typeof assets>("forex");

  return (
    <aside className="w-64 border-r bg-white flex flex-col">
      <div className="p-3">
        <Select
          value={market}
          onValueChange={(val) => setMarket(val as keyof typeof assets)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Market" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="forex">Forex</SelectItem>
            <SelectItem value="crypto">Crypto</SelectItem>
            <SelectItem value="stocks">Stocks</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 overflow-y-auto">
        {assets[market].map((a) => (
          <div
            key={a.name}
            className="flex justify-between items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              const prefix =
                market === "forex"
                  ? "FX:"
                  : market === "crypto"
                  ? "CRYPTO:"
                  : "NASDAQ:"; // stocks assumed NASDAQ
              onSelectSymbol(`${prefix}${a.name}`);
            }}
          >
            <span className="text-sm font-medium">{a.name}</span>
            <div className="flex flex-col items-end text-xs">
              <span>{a.price}</span>
              <span
                className={
                  a.change.startsWith("-") ? "text-red-500" : "text-green-500"
                }
              >
                {a.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
