"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardNavbar from "@/components/main/DashboardNavbar";
import {
  Loader2,
  TrendingUp,
  TrendingDown,
  Filter,
  Calendar,
  Search,
} from "lucide-react";
import { BACKEND_URL } from "@/lib/constants";
import Image from "next/image";

interface Stock {
  id: number;
  symbol: string;
  name: string;
  price: string;
  logo_url: string;
}

interface Trade {
  id: number;
  stock: Stock;
  trade_type: string;
  shares: string;
  price_per_share: string;
  total_amount: string;
  formatted_total: string;
  profit_loss: string | null;
  formatted_profit_loss: string | null;
  reference: string;
  notes: string;
  executed_at: string;
}

interface TradeSummary {
  total_trades: number;
  buy_orders: number;
  sell_orders: number;
  total_profit_loss: string;
}

export default function TradingHistoryPage() {
  const router = useRouter();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [summary, setSummary] = useState<TradeSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<"all" | "buy" | "sell">("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTradingHistory();
  }, [filterType]);

  const fetchTradingHistory = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");

      if (!token) {
        router.push("/login");
        return;
      }

      let url = `${BACKEND_URL}/trades/history/?limit=100`;
      if (filterType !== "all") {
        url += `&trade_type=${filterType}`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setTrades(data.trades);
        setSummary(data.summary);
      }
    } catch (error) {
      console.error("Error fetching trading history:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredTrades = trades.filter((trade) => {
    if (searchTerm) {
      return (
        trade.stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trade.stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trade.reference.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1f2e] dark:bg-gray-50 pt-20 flex items-center justify-center">
        <DashboardNavbar />
        <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
      </div>
    );
  }

  const totalPL = summary ? parseFloat(summary.total_profit_loss) : 0;
  const isProfitable = totalPL >= 0;

  return (
    <div className="min-h-screen bg-[#1a1f2e] dark:bg-gray-50 transition-colors pt-20">
      <DashboardNavbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white dark:text-gray-900 mb-2">
            Trading History
          </h1>
          <p className="text-gray-400 dark:text-gray-600">
            Track all your stock trading activities
          </p>
        </div>

        {/* Summary Cards */}
        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-[#151922] dark:bg-white p-6 rounded-lg border-2 border-gray-800 dark:border-gray-200">
              <div className="text-gray-400 dark:text-gray-600 text-sm mb-2">
                Total Trades
              </div>
              <div className="text-2xl font-bold text-white dark:text-gray-900">
                {summary.total_trades}
              </div>
            </div>

            <div className="bg-[#151922] dark:bg-white p-6 rounded-lg border-2 border-gray-800 dark:border-gray-200">
              <div className="text-gray-400 dark:text-gray-600 text-sm mb-2">
                Buy Orders
              </div>
              <div className="text-2xl font-bold text-green-500">
                {summary.buy_orders}
              </div>
            </div>

            <div className="bg-[#151922] dark:bg-white p-6 rounded-lg border-2 border-gray-800 dark:border-gray-200">
              <div className="text-gray-400 dark:text-gray-600 text-sm mb-2">
                Sell Orders
              </div>
              <div className="text-2xl font-bold text-red-500">
                {summary.sell_orders}
              </div>
            </div>

            <div className="bg-[#151922] dark:bg-white p-6 rounded-lg border-2 border-gray-800 dark:border-gray-200">
              <div className="text-gray-400 dark:text-gray-600 text-sm mb-2 flex items-center gap-2">
                {isProfitable ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                Total P/L
              </div>
              <div
                className={`text-2xl font-bold ${
                  isProfitable ? "text-green-500" : "text-red-500"
                }`}
              >
                {isProfitable ? "+" : ""}${Math.abs(totalPL).toFixed(2)}
              </div>
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-[#151922] dark:bg-white rounded-lg border-2 border-gray-800 dark:border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by symbol, name, or reference..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#0d1117] dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg border-2 border-gray-800 dark:border-gray-300 focus:border-green-500 focus:outline-none"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilterType("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterType === "all"
                    ? "bg-green-500 text-white"
                    : "bg-gray-800 dark:bg-gray-200 text-gray-400 dark:text-gray-600 hover:bg-gray-700 dark:hover:bg-gray-300"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType("buy")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterType === "buy"
                    ? "bg-green-500 text-white"
                    : "bg-gray-800 dark:bg-gray-200 text-gray-400 dark:text-gray-600 hover:bg-gray-700 dark:hover:bg-gray-300"
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setFilterType("sell")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterType === "sell"
                    ? "bg-green-500 text-white"
                    : "bg-gray-800 dark:bg-gray-200 text-gray-400 dark:text-gray-600 hover:bg-gray-700 dark:hover:bg-gray-300"
                }`}
              >
                Sell
              </button>
            </div>
          </div>
        </div>

        {/* Trading History Table */}
        <div className="bg-[#151922] dark:bg-white rounded-lg border-2 border-gray-800 dark:border-gray-200 overflow-hidden">
          {filteredTrades.length === 0 ? (
            <div className="text-center py-16">
              <TrendingUp className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white dark:text-gray-900 mb-2">
                No Trading History
              </h3>
              <p className="text-gray-400 dark:text-gray-600 mb-6">
                {searchTerm
                  ? "No trades found matching your search"
                  : "Start trading to see your history here"}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => router.push("/stock")}
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                >
                  Browse Stocks
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Desktop View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-800 dark:border-gray-200">
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400 dark:text-gray-600 uppercase">
                        Stock
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400 dark:text-gray-600 uppercase">
                        Type
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400 dark:text-gray-600 uppercase">
                        Shares
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400 dark:text-gray-600 uppercase">
                        Price/Share
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400 dark:text-gray-600 uppercase">
                        Total Amount
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400 dark:text-gray-600 uppercase">
                        P/L
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400 dark:text-gray-600 uppercase">
                        Date
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400 dark:text-gray-600 uppercase">
                        Reference
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTrades.map((trade) => (
                      <tr
                        key={trade.id}
                        className="border-b border-gray-800 dark:border-gray-200 hover:bg-gray-900/40 dark:hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() =>
                          router.push(`/stock/${trade.stock.symbol}`)
                        }
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            {trade.stock.logo_url && (
                              <div className="w-10 h-10 relative rounded-full overflow-hidden bg-white flex-shrink-0">
                                <Image
                                  src={trade.stock.logo_url}
                                  alt={trade.stock.symbol}
                                  fill
                                  className="object-contain p-1"
                                />
                              </div>
                            )}
                            <div>
                              <div className="font-semibold text-white dark:text-gray-900">
                                {trade.stock.symbol}
                              </div>
                              <div className="text-sm text-gray-400 dark:text-gray-600">
                                {trade.stock.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-block px-3 py-1 rounded-md text-xs font-medium uppercase ${
                              trade.trade_type === "buy"
                                ? "bg-green-500/20 dark:bg-green-100 text-green-400 dark:text-green-600"
                                : "bg-red-500/20 dark:bg-red-100 text-red-400 dark:text-red-600"
                            }`}
                          >
                            {trade.trade_type}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-white dark:text-gray-900 font-medium">
                          {parseFloat(trade.shares).toFixed(4)}
                        </td>
                        <td className="py-4 px-6 text-white dark:text-gray-900">
                          ${parseFloat(trade.price_per_share).toFixed(2)}
                        </td>
                        <td className="py-4 px-6 text-white dark:text-gray-900 font-semibold">
                          {trade.formatted_total}
                        </td>
                        <td className="py-4 px-6">
                          {trade.profit_loss ? (
                            <div className="flex items-center gap-2">
                              <span
                                className={`font-semibold ${
                                  parseFloat(trade.profit_loss) >= 0
                                    ? "text-green-500"
                                    : "text-red-500"
                                }`}
                              >
                                {trade.formatted_profit_loss}
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-gray-300 dark:text-gray-700 text-sm">
                          {formatDateTime(trade.executed_at)}
                        </td>
                        <td className="py-4 px-6 text-gray-400 dark:text-gray-600 text-sm font-mono">
                          {trade.reference}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="lg:hidden divide-y-2 divide-gray-800 dark:divide-gray-200">
                {filteredTrades.map((trade) => (
                  <div
                    key={trade.id}
                    className="p-4 hover:bg-gray-900/40 dark:hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => router.push(`/stock/${trade.stock.symbol}`)}
                  >
                    {/* Stock Info */}
                    <div className="flex items-center gap-3 mb-3">
                      {trade.stock.logo_url && (
                        <div className="w-12 h-12 relative rounded-full overflow-hidden bg-white flex-shrink-0">
                          <Image
                            src={trade.stock.logo_url}
                            alt={trade.stock.symbol}
                            fill
                            className="object-contain p-1.5"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="font-bold text-white dark:text-gray-900">
                          {trade.stock.symbol}
                        </div>
                        <div className="text-sm text-gray-400 dark:text-gray-600">
                          {trade.stock.name}
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-md text-xs font-medium uppercase ${
                          trade.trade_type === "buy"
                            ? "bg-green-500/20 dark:bg-green-100 text-green-400 dark:text-green-600"
                            : "bg-red-500/20 dark:bg-red-100 text-red-400 dark:text-red-600"
                        }`}
                      >
                        {trade.trade_type}
                      </span>
                    </div>

                    {/* Trade Details */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <div className="text-xs text-gray-400 dark:text-gray-600 mb-1">
                          Shares
                        </div>
                        <div className="text-sm font-medium text-white dark:text-gray-900">
                          {parseFloat(trade.shares).toFixed(4)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 dark:text-gray-600 mb-1">
                          Price/Share
                        </div>
                        <div className="text-sm font-medium text-white dark:text-gray-900">
                          ${parseFloat(trade.price_per_share).toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 dark:text-gray-600 mb-1">
                          Total Amount
                        </div>
                        <div className="text-sm font-semibold text-white dark:text-gray-900">
                          {trade.formatted_total}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 dark:text-gray-600 mb-1">
                          Profit/Loss
                        </div>
                        <div className="text-sm font-semibold">
                          {trade.profit_loss ? (
                            <span
                              className={
                                parseFloat(trade.profit_loss) >= 0
                                  ? "text-green-500"
                                  : "text-red-500"
                              }
                            >
                              {trade.formatted_profit_loss}
                            </span>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Date and Reference */}
                    <div className="pt-3 border-t border-gray-800 dark:border-gray-200">
                      <div className="text-xs text-gray-400 dark:text-gray-600 mb-1">
                        {formatDateTime(trade.executed_at)}
                      </div>
                      <div className="text-xs font-mono text-gray-500 dark:text-gray-500">
                        {trade.reference}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
