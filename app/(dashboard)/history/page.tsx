"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardNavbar from "@/components/main/DashboardNavbar";
import {
  Loader2,
  TrendingUp,
  TrendingDown,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
} from "lucide-react";
import { BACKEND_URL } from "@/lib/constants";
import Image from "next/image";

interface Trade {
  id: number;
  stock: {
    symbol: string;
    name: string;
    logo_url: string;
  };
  trade_type: string;
  shares: string;
  price_per_share: string;
  total_amount: string;
  formatted_total: string;
  profit_loss: string | null;
  formatted_profit_loss: string | null;
  reference: string;
  executed_at: string;
}

interface Summary {
  total_trades: number;
  buy_orders: number;
  sell_orders: number;
  total_profit_loss: string;
}

export default function TradesPage() {
  const router = useRouter();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<"all" | "buy" | "sell">("all");

  useEffect(() => {
    fetchTrades();
  }, [filter]);

  const fetchTrades = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/login");
        return;
      }

      const filterParam = filter !== "all" ? `&trade_type=${filter}` : "";
      const response = await fetch(
        `${BACKEND_URL}/trades/history/?limit=100${filterParam}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setTrades(data.trades);
        setSummary(data.summary);
      }
    } catch (error) {
      console.error("Error fetching trades:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1f2e] dark:bg-gray-50 pt-16 sm:pt-20 flex items-center justify-center">
        <DashboardNavbar />
        <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 animate-spin" />
      </div>
    );
  }

  const totalPL = summary ? parseFloat(summary.total_profit_loss) : 0;
  const isProfitable = totalPL >= 0;

  return (
    <div className="min-h-screen bg-[#1a1f2e] dark:bg-gray-50 pt-16 sm:pt-20">
      <DashboardNavbar />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="w-full sm:w-auto">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white dark:text-gray-900 mb-1 sm:mb-2">
              Trading History
            </h1>
            <p className="text-sm sm:text-base text-gray-400 dark:text-gray-600">
              Track all your buy and sell orders
            </p>
          </div>

          <button
            onClick={() => fetchTrades(true)}
            disabled={refreshing}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            <RefreshCw
              className={`w-4 h-4 sm:w-5 sm:h-5 ${
                refreshing ? "animate-spin" : ""
              }`}
            />
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* Summary Cards */}
        {summary && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8">
            <div className="bg-[#151922] dark:bg-white p-3 sm:p-4 lg:p-6 rounded-lg border-2 border-gray-800 dark:border-gray-200">
              <div className="text-[10px] sm:text-xs lg:text-sm text-gray-400 dark:text-gray-600 mb-1 sm:mb-2">
                Total Trades
              </div>
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white dark:text-gray-900">
                {summary.total_trades}
              </div>
            </div>

            <div className="bg-[#151922] dark:bg-white p-3 sm:p-4 lg:p-6 rounded-lg border-2 border-gray-800 dark:border-gray-200">
              <div className="text-[10px] sm:text-xs lg:text-sm text-gray-400 dark:text-gray-600 mb-1 sm:mb-2 flex items-center gap-1 sm:gap-2">
                <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                <span className="truncate">Buy Orders</span>
              </div>
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white dark:text-gray-900">
                {summary.buy_orders}
              </div>
            </div>

            <div className="bg-[#151922] dark:bg-white p-3 sm:p-4 lg:p-6 rounded-lg border-2 border-gray-800 dark:border-gray-200">
              <div className="text-[10px] sm:text-xs lg:text-sm text-gray-400 dark:text-gray-600 mb-1 sm:mb-2 flex items-center gap-1 sm:gap-2">
                <ArrowDownRight className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 flex-shrink-0" />
                <span className="truncate">Sell Orders</span>
              </div>
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white dark:text-gray-900">
                {summary.sell_orders}
              </div>
            </div>

            <div className="bg-[#151922] dark:bg-white p-3 sm:p-4 lg:p-6 rounded-lg border-2 border-gray-800 dark:border-gray-200">
              <div className="text-[10px] sm:text-xs lg:text-sm text-gray-400 dark:text-gray-600 mb-1 sm:mb-2 flex items-center gap-1 sm:gap-2">
                {isProfitable ? (
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                ) : (
                  <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 flex-shrink-0" />
                )}
                <span className="truncate">Total P/L</span>
              </div>
              <div
                className={`text-lg sm:text-xl lg:text-2xl font-bold ${
                  isProfitable ? "text-green-500" : "text-red-500"
                }`}
              >
                {isProfitable ? "+" : ""}${Math.abs(totalPL).toFixed(2)}
              </div>
            </div>
          </div>
        )}

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm lg:text-base rounded-lg font-medium transition-colors ${
              filter === "all"
                ? "bg-green-500 text-white"
                : "bg-[#151922] dark:bg-white text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-gray-900"
            }`}
          >
            All Trades
          </button>
          <button
            onClick={() => setFilter("buy")}
            className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm lg:text-base rounded-lg font-medium transition-colors ${
              filter === "buy"
                ? "bg-green-500 text-white"
                : "bg-[#151922] dark:bg-white text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-gray-900"
            }`}
          >
            Buy Orders
          </button>
          <button
            onClick={() => setFilter("sell")}
            className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm lg:text-base rounded-lg font-medium transition-colors ${
              filter === "sell"
                ? "bg-green-500 text-white"
                : "bg-[#151922] dark:bg-white text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-gray-900"
            }`}
          >
            Sell Orders
          </button>
        </div>

        {/* Trades List */}
        {trades.length > 0 ? (
          <div className="space-y-2 sm:space-y-3">
            {trades.map((trade) => (
              <div
                key={trade.id}
                className="bg-[#151922] dark:bg-white p-3 sm:p-4 lg:p-6 rounded-lg border-2 border-gray-800 dark:border-gray-200 hover:border-green-500 transition-all cursor-pointer"
                onClick={() => router.push(`/stock/${trade.stock.symbol}`)}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                  {/* Left: Stock Info */}
                  <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-1 w-full sm:w-auto">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 relative rounded-full overflow-hidden bg-white flex-shrink-0">
                      {trade.stock.logo_url ? (
                        <Image
                          src={trade.stock.logo_url}
                          alt={trade.stock.symbol}
                          fill
                          className="object-contain p-1.5 sm:p-2"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 font-bold text-sm sm:text-base">
                          {trade.stock.symbol.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 sm:gap-3 mb-0.5 sm:mb-1 flex-wrap">
                        <h3 className="text-base sm:text-lg font-bold text-white dark:text-gray-900">
                          {trade.stock.symbol}
                        </h3>
                        <span
                          className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${
                            trade.trade_type === "buy"
                              ? "bg-green-500/20 text-green-400 dark:bg-green-100 dark:text-green-600"
                              : "bg-red-500/20 text-red-400 dark:bg-red-100 dark:text-red-600"
                          }`}
                        >
                          {trade.trade_type.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-600">
                        {parseFloat(trade.shares).toFixed(4)} shares @ $
                        {parseFloat(trade.price_per_share).toFixed(2)}
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-500 mt-0.5 sm:mt-1">
                        {formatDate(trade.executed_at)}
                      </p>
                    </div>
                  </div>

                  {/* Right: Amount & P/L */}
                  <div className="text-left sm:text-right w-full sm:w-auto flex sm:block justify-between sm:justify-end items-center sm:items-end">
                    <div className="order-2 sm:order-1">
                      <div className="text-lg sm:text-xl font-bold text-white dark:text-gray-900 mb-0.5 sm:mb-1">
                        {trade.formatted_total}
                      </div>
                      {trade.profit_loss !== null && (
                        <div
                          className={`text-xs sm:text-sm font-semibold ${
                            parseFloat(trade.profit_loss) >= 0
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {trade.formatted_profit_loss}
                        </div>
                      )}
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-500 mt-0.5 sm:mt-1 order-1 sm:order-2">
                      {trade.reference}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16 lg:py-20">
            <div className="bg-[#151922] dark:bg-white p-6 sm:p-8 lg:p-12 rounded-lg border-2 border-gray-800 dark:border-gray-200">
              <TrendingUp className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-gray-600 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-white dark:text-gray-900 mb-1 sm:mb-2">
                No Trades Yet
              </h3>
              <p className="text-sm sm:text-base text-gray-400 dark:text-gray-600 mb-4 sm:mb-6">
                Start trading to see your history here
              </p>
              <button
                onClick={() => router.push("/stock")}
                className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
              >
                Browse Stocks
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
