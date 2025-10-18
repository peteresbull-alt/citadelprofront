"use client";

import TradingChart from "@/components/main/TradingChart";
import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import { useRouter, useParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

export default function InstrumentPage() {
  const instrument = useInstrumentStore((s) => s.selectedInstrument);
  const router = useRouter();
  const param = useParams();

  // Modal state
  const [tradeType, setTradeType] = useState<"buy" | "sell" | null>(null);

  // Live price simulation
  const [price, setPrice] = useState(1.17974);
  const spread = 0.0002;
  const bid = (price - spread / 2).toFixed(5);
  const ask = (price + spread / 2).toFixed(5);

  // Lot size state
  const [lotSize, setLotSize] = useState(1.0);
  const contractSize = 100000;
  const baseCurrency = instrument?.symbol.split("/")[0] || "BASE";
  const leverage = 100;
  const accountFunds = 5000;

  const lotValue = lotSize * contractSize;
  const pipValueUSD = lotSize * 10;
  const requiredMargin = (lotSize * contractSize * price) / leverage;
  const availableFunds = accountFunds - requiredMargin;

  // Stop Loss / Take Profit state
  const [useSL, setUseSL] = useState(false);
  const [useTP, setUseTP] = useState(false);

  const [stopLoss, setStopLoss] = useState({
    pips: "",
    price: "",
    value: "",
  });

  const [takeProfit, setTakeProfit] = useState({
    pips: "",
    price: "",
    value: "",
  });

  useEffect(() => {
    if (!instrument) router.push("/instrument");
  }, [instrument, router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrice((prev) => {
        const movement = (Math.random() - 0.5) * 0.0003;
        return +(prev + movement).toFixed(5);
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  if (!instrument) return null;

  const handleConfirmTrade = () => {
    const tradeData = {
      type: tradeType,
      lotSize,
      entryPrice: tradeType === "buy" ? ask : bid,
      stopLoss: useSL ? stopLoss : null,
      takeProfit: useTP ? takeProfit : null,
    };
    console.log("Trade Executed:", tradeData);
    setTradeType(null);
  };

  return (
    <div className="h-screen flex flex-col relative font-poppins bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-row-reverse justify-between items-center font-semibold text-lg">
        {instrument?.symbol}
        <button
          onClick={() => router.back()}
          className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
        >
          ← Back
        </button>
      </div>

      {/* Chart */}
      <div className="flex-1">
        <TradingChart symbol={instrument?.symbol} />
      </div>

      {/* Modal */}
      {tradeType && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-end md:items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-t-2xl md:rounded-2xl w-full md:w-[400px] max-h-[90vh] overflow-y-auto p-5 shadow-xl transition-colors">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 sticky top-0 bg-white dark:bg-gray-800 py-2 z-10 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold">
                {tradeType === "buy" ? "Buy" : "Sell"} {instrument.symbol}
              </h2>
              <button
                onClick={() => setTradeType(null)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            {/* Current Rate */}
            <p
              className={`${
                tradeType === "buy" ? "text-green-600" : "text-red-600"
              } text-2xl font-bold mb-2`}
            >
              {tradeType === "buy" ? ask : bid}{" "}
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                Current rate
              </span>
            </p>

            {/* Volume Selector */}
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-3">
              <p className="text-sm font-medium">Volume in lot</p>
              <div className="flex items-center justify-between mt-2">
                <button
                  className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-600 font-bold text-xl"
                  onClick={() =>
                    setLotSize((prev) =>
                      Math.max(0.01, +(prev - 0.01).toFixed(2))
                    )
                  }
                >
                  –
                </button>
                <span className="text-xl font-bold">{lotSize.toFixed(2)}</span>
                <button
                  className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-600 font-bold text-xl"
                  onClick={() =>
                    setLotSize((prev) => +(prev + 0.01).toFixed(2))
                  }
                >
                  +
                </button>
              </div>
              <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                1 lot = {contractSize.toLocaleString()} {baseCurrency}
              </p>
            </div>

            {/* Trade Info */}
            <div className="text-sm space-y-1 mb-3">
              <p>
                Lot Value:{" "}
                <span className="font-bold">
                  {lotValue.toLocaleString()} {baseCurrency}
                </span>
              </p>
              <p>
                Pips Value:{" "}
                <span className="font-bold">${pipValueUSD.toFixed(2)}</span>
              </p>
              <p>
                Required Margin:{" "}
                <span className="font-bold">${requiredMargin.toFixed(2)}</span>
              </p>
              <p>
                Available Funds:{" "}
                <span className="font-bold">${availableFunds.toFixed(2)}</span>
              </p>
            </div>

            {/* Stop Loss / Take Profit */}
            <div className="grid grid-cols-1 gap-3 mb-4">
              {/* Stop Loss */}
              <div>
                <label className="flex items-center gap-2 text-sm mb-1">
                  <Checkbox
                    checked={useSL}
                    onCheckedChange={(v) => setUseSL(!!v)}
                  />
                  Stop Loss
                </label>
                {useSL && (
                  <div className="rounded p-2 text-sm flex items-center gap-2 dark:bg-gray-700">
                    <div className="flex gap-4 flex-col text-gray-700 dark:text-gray-300">
                      <p>Pips:</p>
                      <p>Price:</p>
                      <p>Value:</p>
                    </div>
                    <div>
                      <Input
                        placeholder="1203"
                        className="border p-2 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                        value={stopLoss.pips}
                        onChange={(e) =>
                          setStopLoss({ ...stopLoss, pips: e.target.value })
                        }
                      />
                      <Input
                        placeholder="1347"
                        className="border p-2 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                        value={stopLoss.price}
                        onChange={(e) =>
                          setStopLoss({ ...stopLoss, price: e.target.value })
                        }
                      />
                      <Input
                        placeholder="2032"
                        className="border p-2 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                        value={stopLoss.value}
                        onChange={(e) =>
                          setStopLoss({ ...stopLoss, value: e.target.value })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Take Profit */}
              <div>
                <label className="flex items-center gap-2 text-sm mb-1">
                  <Checkbox
                    checked={useTP}
                    onCheckedChange={(v) => setUseTP(!!v)}
                  />
                  Take Profit
                </label>
                {useTP && (
                  <div className="rounded p-2 text-sm flex items-center gap-2 dark:bg-gray-700">
                    <div className="flex gap-4 flex-col text-gray-700 dark:text-gray-300">
                      <p>Pips:</p>
                      <p>Price:</p>
                      <p>Value:</p>
                    </div>
                    <div>
                      <Input
                        placeholder="1203"
                        className="border p-2 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                        value={takeProfit.pips}
                        onChange={(e) =>
                          setTakeProfit({
                            ...takeProfit,
                            pips: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="1347"
                        className="border p-2 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                        value={takeProfit.price}
                        onChange={(e) =>
                          setTakeProfit({
                            ...takeProfit,
                            price: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="2032"
                        className="border p-2 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                        value={takeProfit.value}
                        onChange={(e) =>
                          setTakeProfit({
                            ...takeProfit,
                            value: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirmTrade}
              className={`w-full py-3 rounded-lg font-bold text-white ${
                tradeType === "buy"
                  ? "bg-[#00B074] hover:bg-[#08b078]"
                  : "bg-red-600 hover:bg-red-500"
              }`}
            >
              {tradeType === "buy" ? "BUY" : "SELL"} @{" "}
              {tradeType === "buy" ? ask : bid}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
