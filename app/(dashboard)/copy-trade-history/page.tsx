"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import DashboardNavbar from "@/components/main/DashboardNavbar";
import { BACKEND_URL } from "@/lib/constants";
import { PulseLoader } from "react-spinners";
import { useTheme } from "next-themes";

interface CopyTradeHistory {
  id: number;
  trader_name: string;
  trader_username: string;
  market: string;
  direction: "buy" | "sell";
  leverage: string;
  duration: string;
  amount: string;
  entry_price: string;
  exit_price: string | null;
  profit_loss: string;
  status: "open" | "closed";
  opened_at: string;
  closed_at: string | null;
  reference: string;
  time_ago: string;
  is_profit: boolean;
}

interface HistorySummary {
  open_trades: number;
  closed_trades: number;
  total_profit_loss: string;
}

export default function CopyTradeHistoryPage() {
  const [activeTab, setActiveTab] = useState<"open" | "closed">("open");
  const [history, setHistory] = useState<CopyTradeHistory[]>([]);
  const [summary, setSummary] = useState<HistorySummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedTrade, setExpandedTrade] = useState<number | null>(null);
  const [closingTrade, setClosingTrade] = useState<number | null>(null);

  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isLight = mounted
    ? resolvedTheme === "light" || theme === "light"
    : false;

  useEffect(() => {
    fetchTradeHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const fetchTradeHistory = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");

      if (!token) {
        toast.error("Please login to view trade history");
        return;
      }

      const response = await fetch(
        `${BACKEND_URL}/copy-trade-history/?status=${activeTab}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch trade history");
      }

      const data = await response.json();

      if (data.success) {
        setHistory(data.history);
        setSummary(data.summary);
      } else {
        throw new Error(data.error || "Failed to load trade history");
      }
    } catch (error) {
      console.error("Error fetching trade history:", error);
      toast.error("Failed to load trade history");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseTrade = async (tradeId: number) => {
    setClosingTrade(tradeId);

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        toast.error("Authentication required");
        return;
      }

      const response = await fetch(
        `${BACKEND_URL}/copy-trade-history/${tradeId}/close/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to close trade");
      }

      toast.success("Trade closed successfully");
      fetchTradeHistory(); // Refresh the list
    } catch (error) {
      console.error("Error closing trade:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to close trade"
      );
    } finally {
      setClosingTrade(null);
    }
  };

  const toggleTradeDetails = (tradeId: number) => {
    setExpandedTrade(expandedTrade === tradeId ? null : tradeId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] dark:bg-slate-50">
        <DashboardNavbar />
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
          <PulseLoader color="#10b981" size={15} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] dark:bg-slate-50 text-slate-100 dark:text-slate-900">
      <DashboardNavbar />

      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-16 sm:py-20">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">
            Copy Trade History
          </h1>
          <p className="text-slate-400 dark:text-slate-600 text-xs sm:text-sm">
            View your copy trading transactions and performance
          </p>
        </div>

        {/* Summary Cards */}
        {summary && (
          <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
            <div className="bg-slate-800/60 dark:bg-white border border-slate-700/40 dark:border-slate-200 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4">
              <div className="text-slate-400 dark:text-slate-600 text-[10px] sm:text-xs mb-0.5 sm:mb-1">
                Open Trades
              </div>
              <div className="text-base sm:text-xl md:text-2xl font-bold">
                {summary.open_trades}
              </div>
            </div>
            <div className="bg-slate-800/60 dark:bg-white border border-slate-700/40 dark:border-slate-200 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4">
              <div className="text-slate-400 dark:text-slate-600 text-[10px] sm:text-xs mb-0.5 sm:mb-1">
                Closed Trades
              </div>
              <div className="text-base sm:text-xl md:text-2xl font-bold">
                {summary.closed_trades}
              </div>
            </div>
            <div className="bg-slate-800/60 dark:bg-white border border-slate-700/40 dark:border-slate-200 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4">
              <div className="text-slate-400 dark:text-slate-600 text-[10px] sm:text-xs mb-0.5 sm:mb-1">
                Total P/L
              </div>
              <div
                className={`text-base sm:text-xl md:text-2xl font-bold ${
                  parseFloat(summary.total_profit_loss) >= 0
                    ? "text-emerald-400 dark:text-emerald-600"
                    : "text-red-400 dark:text-red-600"
                }`}
              >
                ${parseFloat(summary.total_profit_loss).toFixed(2)}
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6">
          <button
            onClick={() => setActiveTab("open")}
            className={`py-2 sm:py-2.5 md:py-3 px-4 sm:px-5 md:px-6 rounded-lg font-medium transition-all text-sm sm:text-base ${
              activeTab === "open"
                ? "bg-green-500 hover:bg-green-600 text-white shadow-lg"
                : "bg-slate-800/60 dark:bg-white border border-slate-700/40 dark:border-slate-200 text-slate-300 dark:text-slate-700 hover:bg-slate-800 dark:hover:bg-slate-100"
            }`}
          >
            Open
          </button>
          <button
            onClick={() => setActiveTab("closed")}
            className={`py-2 sm:py-2.5 md:py-3 px-4 sm:px-5 md:px-6 rounded-lg font-medium transition-all text-sm sm:text-base ${
              activeTab === "closed"
                ? "bg-green-500 hover:bg-green-600 text-white shadow-lg"
                : "bg-slate-800/60 dark:bg-white border border-slate-700/40 dark:border-slate-200 text-slate-300 dark:text-slate-700 hover:bg-slate-800 dark:hover:bg-slate-100"
            }`}
          >
            Closed
          </button>
        </div>

        {/* Trade History List */}
        <div className="space-y-3 sm:space-y-4">
          {history.length === 0 ? (
            <div className="bg-slate-800/60 dark:bg-white border border-slate-700/40 dark:border-slate-200 rounded-lg sm:rounded-xl p-6 sm:p-8 text-center">
              <div className="text-slate-400 dark:text-slate-600 mb-2 text-sm sm:text-base">
                No {activeTab} trades found
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-500">
                Your {activeTab} copy trades will appear here
              </p>
            </div>
          ) : (
            history.map((trade) => (
              <div
                key={trade.id}
                className="bg-slate-800/60 dark:bg-white border border-slate-700/40 dark:border-slate-200 rounded-lg sm:rounded-xl overflow-hidden"
              >
                {/* Trade Card Header */}
                <div
                  onClick={() => toggleTradeDetails(trade.id)}
                  className="p-3 sm:p-4 cursor-pointer hover:bg-slate-800/80 dark:hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                    {/* Market Icon */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 text-xs sm:text-sm font-bold flex-shrink-0">
                      {trade.market.substring(0, 3).toUpperCase()}
                    </div>

                    {/* Trade Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                        <span className="font-bold text-xs sm:text-sm md:text-base truncate">
                          {trade.market}
                        </span>
                        <span className="text-[10px] sm:text-xs bg-blue-500/20 text-blue-400 dark:text-blue-600 px-1.5 sm:px-2 py-0.5 rounded whitespace-nowrap">
                          {trade.leverage}
                        </span>
                      </div>
                      <div className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-600">
                        <span className="whitespace-nowrap">
                          {trade.time_ago}
                        </span>
                      </div>
                    </div>

                    {/* Direction & Profit */}
                    <div className="flex flex-col items-end gap-0.5 sm:gap-1 flex-shrink-0">
                      <div
                        className={`font-medium text-[10px] sm:text-xs md:text-sm whitespace-nowrap ${
                          trade.direction === "buy"
                            ? "text-emerald-400 dark:text-emerald-600"
                            : "text-red-400 dark:text-red-600"
                        }`}
                      >
                        {trade.direction.toUpperCase()}
                      </div>
                      <div
                        className={`text-xs sm:text-sm md:text-base font-bold whitespace-nowrap ${
                          trade.is_profit
                            ? "text-emerald-400 dark:text-emerald-600"
                            : "text-red-400 dark:text-red-600"
                        }`}
                      >
                        ${parseFloat(trade.profit_loss).toFixed(2)}
                      </div>
                    </div>

                    {/* Close Button */}
                    {trade.status === "open" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCloseTrade(trade.id);
                        }}
                        disabled={closingTrade === trade.id}
                        className="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 bg-slate-700 hover:bg-slate-600 dark:bg-slate-200 dark:hover:bg-slate-300 text-white dark:text-slate-900 rounded-lg text-[10px] sm:text-xs md:text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex-shrink-0"
                      >
                        {closingTrade === trade.id ? "Closing..." : "Close"}
                      </button>
                    )}

                    {/* Accordion Indicator */}
                    <div className="flex-shrink-0 ml-1">
                      {expandedTrade === trade.id ? (
                        <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 dark:text-slate-600 transition-transform" />
                      ) : (
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 dark:text-slate-600 transition-transform" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Trade Details */}
                {expandedTrade === trade.id && (
                  <div className="border-t border-slate-700/40 dark:border-slate-200 p-3 sm:p-4 bg-slate-900/40 dark:bg-slate-50 animate-in slide-in-from-top-2 duration-200">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                      <div>
                        <div className="text-slate-400 dark:text-slate-600 mb-0.5 sm:mb-1">
                          Date:
                        </div>
                        <div className="font-medium text-[10px] sm:text-xs md:text-sm">
                          {new Date(trade.opened_at).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-slate-400 dark:text-slate-600 mb-0.5 sm:mb-1">
                          Direction:
                        </div>
                        <div
                          className={`font-medium ${
                            trade.direction === "buy"
                              ? "text-emerald-400 dark:text-emerald-600"
                              : "text-red-400 dark:text-red-600"
                          }`}
                        >
                          {trade.direction.toUpperCase()}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-400 dark:text-slate-600 mb-0.5 sm:mb-1">
                          Duration:
                        </div>
                        <div className="font-medium text-[10px] sm:text-xs md:text-sm">
                          {trade.duration}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-slate-400 dark:text-slate-600 mb-0.5 sm:mb-1">
                          Leverage:
                        </div>
                        <div className="font-medium text-[10px] sm:text-xs md:text-sm">
                          {trade.leverage}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-400 dark:text-slate-600 mb-0.5 sm:mb-1">
                          Amount:
                        </div>
                        <div className="font-medium text-[10px] sm:text-xs md:text-sm break-all">
                          {parseFloat(trade.amount).toFixed(6)}{" "}
                          {trade.market.split("/")[0]}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-slate-400 dark:text-slate-600 mb-0.5 sm:mb-1">
                          Entry price:
                        </div>
                        <div className="font-medium text-[10px] sm:text-xs md:text-sm">
                          ${parseFloat(trade.entry_price).toLocaleString()}
                        </div>
                      </div>
                      {trade.exit_price && (
                        <div>
                          <div className="text-slate-400 dark:text-slate-600 mb-0.5 sm:mb-1">
                            Exit price:
                          </div>
                          <div className="font-medium text-[10px] sm:text-xs md:text-sm">
                            ${parseFloat(trade.exit_price).toLocaleString()}
                          </div>
                        </div>
                      )}
                      <div className="text-right">
                        <div className="text-slate-400 dark:text-slate-600 mb-0.5 sm:mb-1">
                          Profit:
                        </div>
                        <div
                          className={`font-medium ${
                            trade.is_profit
                              ? "text-emerald-400 dark:text-emerald-600"
                              : "text-red-400 dark:text-red-600"
                          }`}
                        >
                          ${parseFloat(trade.profit_loss).toFixed(2)}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-slate-400 dark:text-slate-600 mb-0.5 sm:mb-1">
                          Trader:
                        </div>
                        <div className="font-medium text-[10px] sm:text-xs md:text-sm">
                          {trade.trader_name} ({trade.trader_username})
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-slate-400 dark:text-slate-600 mb-0.5 sm:mb-1">
                          Reference:
                        </div>
                        <div className="font-mono text-[10px] sm:text-xs bg-slate-800 dark:bg-slate-200 px-2 py-1 rounded break-all">
                          {trade.reference}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
