"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import TradingViewWidget from "../_components/TradingViewWidget";
import DashboardNavbar from "@/components/main/DashboardNavbar";
import { ArrowLeft, Loader2 } from "lucide-react";
import { BACKEND_URL } from "@/lib/constants";

import { toast } from "sonner";

interface StockData {
  id: number;
  name: string;
  symbol: string;
  logo_url: string;
  price: string;
  change: string;
  change_percent: string;
  volume: number;
  market_cap: number;
  formatted_market_cap: string;
  sector: string;
  is_positive_change: boolean;
}

interface UserPosition {
  id: number;
  shares: string;
  average_buy_price: string;
  total_invested: string;
  current_value: string;
  profit_loss: string;
  profit_loss_percent: string;
}

interface UserProfile {
  balance: string;
  formatted_balance: string;
}

export default function StockDetailPage() {
  const router = useRouter();
  const params = useParams();
  const symbol = params?.symbol as string;

  const [stock, setStock] = useState<StockData | null>(null);
  const [userPosition, setUserPosition] = useState<UserPosition | null>(null);
  const [userBalance, setUserBalance] = useState<string>("0.00");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = useState("Market Buy");
  const [shares, setShares] = useState("0");
  const [processing, setProcessing] = useState(false);

  // Fetch stock data
  useEffect(() => {
    if (symbol) {
      fetchStockData();
      fetchUserProfile();
    }
  }, [symbol]);

  const fetchStockData = async () => {
    try {
      setLoading(true);
      const apiUrl = BACKEND_URL;
      const token = localStorage.getItem("authToken");

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = `Token ${token}`;
      }

      const response = await fetch(`${apiUrl}/stocks/${symbol}/`, {
        headers,
      });

      const data = await response.json();

      if (data.success) {
        setStock(data.stock);
        setUserPosition(data.user_position);
      } else {
        console.error("Failed to fetch stock:", data.error);
      }
    } catch (error) {
      console.error("Error fetching stock:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const apiUrl = BACKEND_URL;
      const response = await fetch(`${apiUrl}/withdrawals/profile/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setUserBalance(data.user.balance);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleBuyClick = async () => {
    if (!stock || parseFloat(shares) <= 0) {
      toast("Details", {
        description: "Please enter a valid number of shares",
      });
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      toast("Error", {
        description: "Please login to buy stocks",
      });
      router.push("/login");
      return;
    }

    setProcessing(true);

    try {
      const apiUrl = BACKEND_URL;
      const response = await fetch(`${apiUrl}/stocks/buy/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          symbol: stock.symbol,
          shares: shares,
          order_type: orderType,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast(data.message);
        // Refresh data
        fetchStockData();
        fetchUserProfile();
        setShares("0");
        router.push("/orders");
      } else {
        toast(data.error || "Failed to buy stock");
      }
    } catch (error) {
      console.error("Error buying stock:", error);
      toast("An error occurred while buying stock");
    } finally {
      setProcessing(false);
    }
  };

  const handleSellClick = async () => {
    if (!stock || parseFloat(shares) <= 0) {
      toast("Please enter a valid number of shares");
      return;
    }

    if (!userPosition) {
      toast("You don't own any shares of this stock");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      toast("Please login to sell stocks");
      router.push("/login");
      return;
    }

    setProcessing(true);

    try {
      const apiUrl = BACKEND_URL;
      const response = await fetch(`${apiUrl}/stocks/sell/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          symbol: stock.symbol,
          shares: shares,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast(data.message);
        // Refresh data
        fetchStockData();
        fetchUserProfile();
        setShares("0");

        router.push("/orders");
      } else {
        toast(data.error || "Failed to sell stock");
      }
    } catch (error) {
      console.error("Error selling stock:", error);
      toast("An error occurred while selling stock");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1f2e] dark:bg-gray-50 pt-20 flex items-center justify-center">
        <DashboardNavbar />
        <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
      </div>
    );
  }

  if (!stock) {
    return (
      <div className="min-h-screen bg-[#1a1f2e] dark:bg-gray-50 pt-20">
        <DashboardNavbar />
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-400 dark:text-gray-600">Stock not found</p>
        </div>
      </div>
    );
  }

  const estimatedCost = parseFloat(shares) * parseFloat(stock.price);
  const availableShares = userPosition ? parseFloat(userPosition.shares) : 0;

  return (
    <div className="min-h-screen bg-[#1a1f2e] dark:bg-gray-50 transition-colors pt-20">
      <DashboardNavbar />
      <button
        onClick={() => router.back()}
        className="px-2 ml-5 lg:px-4 py-2 lg:py-3 flex items-center gap-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-xs md:text-sm lg:text-base"
      >
        <ArrowLeft className="w-[18px] h-[18px] sm:h-[20px] sm:w-[20px] md:h-[22px] md:w-[22px]" />
        Go Back
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-6 min-h-screen lg:h-screen">
        <div className="lg:col-span-2 bg-[#1a1f2e] dark:bg-white p-4 lg:p-6 min-h-[500px] lg:overflow-hidden">
          {/* TradingView Chart */}
          <div className="h-full lg:h-full bg-[#1a1f2e] dark:bg-white rounded-lg overflow-hidden">
            <TradingViewWidget symbol={stock.symbol} />
          </div>
        </div>

        {/* Right Section - Trading Panel */}
        <div className="bg-[#151922] dark:bg-white p-4 lg:p-6 flex flex-col min-h-screen lg:min-h-0">
          {/* Buy/Sell Tabs */}
          <div className="flex gap-2 lg:gap-3 mb-4 lg:mb-6">
            <button
              onClick={() => setActiveTab("buy")}
              className={`flex-1 py-2.5 lg:py-3 px-4 lg:px-6 rounded-lg font-semibold text-sm lg:text-base transition-all ${
                activeTab === "buy"
                  ? "bg-green-500 text-white"
                  : "bg-transparent text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-gray-900"
              }`}
            >
              BUY {symbol}
            </button>
            <button
              onClick={() => setActiveTab("sell")}
              className={`flex-1 py-2.5 lg:py-3 px-4 lg:px-6 rounded-lg font-semibold text-sm lg:text-base transition-all ${
                activeTab === "sell"
                  ? "bg-green-500 text-white"
                  : "bg-transparent text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-gray-900"
              }`}
            >
              SELL {symbol}
            </button>
          </div>

          {/* Trading Form */}
          {activeTab === "buy" ? (
            <div className="space-y-3 lg:space-y-4 flex-1">
              {/* Order Type */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <label className="text-gray-400 dark:text-gray-600 text-sm">
                  Order Type
                </label>
                <select
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value)}
                  className="bg-[#1e2532] dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 rounded-lg border-2 border-gray-700 dark:border-gray-300 focus:border-green-500 focus:outline-none w-full sm:w-64"
                >
                  <option>Market Buy</option>
                  <option>Limit Buy</option>
                  <option>Stop Loss</option>
                </select>
              </div>

              {/* Shares */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <label className="text-gray-400 dark:text-gray-600 text-sm">
                  Shares
                </label>
                <div className="relative w-full sm:w-64">
                  <input
                    type="number"
                    value={shares}
                    onChange={(e) => setShares(e.target.value)}
                    className="bg-[#1e2532] dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 rounded-lg border-2 border-gray-700 dark:border-gray-300 focus:border-green-500 focus:outline-none w-full pr-16"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600 text-sm">
                    {symbol}
                  </span>
                </div>
              </div>

              {/* Market Price */}
              <div className="flex justify-between items-center py-3 lg:py-4 border-t border-gray-800 dark:border-gray-300">
                <span className="text-gray-400 dark:text-gray-600 text-sm">
                  Market Price
                </span>
                <span className="text-white dark:text-gray-900 font-semibold">
                  $
                  {parseFloat(stock.price).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              {/* Estimated Cost */}
              <div className="flex justify-between items-center">
                <span className="text-gray-400 dark:text-gray-600 text-sm">
                  Estimated Cost
                </span>
                <span className="text-white dark:text-gray-900 font-semibold">
                  $
                  {estimatedCost.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              {/* Wallet Balance */}
              <div className="flex justify-between items-center pb-4 lg:pb-6">
                <span className="text-gray-400 dark:text-gray-600 text-sm">
                  Wallet Balance
                </span>
                <span className="text-white dark:text-gray-900 font-semibold">
                  $
                  {parseFloat(userBalance).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              {/* Buy Button */}
              <button
                onClick={handleBuyClick}
                disabled={processing}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 lg:py-4 rounded-lg transition-colors mt-auto flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `BUY ${symbol}`
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-3 lg:space-y-4 flex-1">
              {/* Order Type */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <label className="text-gray-400 dark:text-gray-600 text-sm">
                  Order Type
                </label>
                <select
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value)}
                  className="bg-[#1e2532] dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 rounded-lg border-2 border-green-500 focus:border-green-500 focus:outline-none w-full sm:w-64"
                >
                  <option>Limit Sell</option>
                  <option>Market Sell</option>
                  <option>Stop Loss</option>
                </select>
              </div>

              {/* Shares */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <label className="text-gray-400 dark:text-gray-600 text-sm">
                  Shares
                </label>
                <div className="relative w-full sm:w-64">
                  <input
                    type="number"
                    value={shares}
                    onChange={(e) => setShares(e.target.value)}
                    max={availableShares}
                    className="bg-[#1e2532] dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 rounded-lg border-2 border-gray-700 dark:border-gray-300 focus:border-green-500 focus:outline-none w-full pr-16"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600 text-sm">
                    {symbol}
                  </span>
                </div>
              </div>

              {/* Available Shares */}
              <div className="flex justify-between items-center py-4 lg:py-6 border-t border-gray-800 dark:border-gray-300">
                <span className="text-gray-400 dark:text-gray-600 text-sm">
                  Available Shares
                </span>
                <span className="text-white dark:text-gray-900 font-semibold">
                  {availableShares.toFixed(4)}
                </span>
              </div>

              {/* Sell Button */}
              <button
                onClick={handleSellClick}
                disabled={processing || availableShares <= 0}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 lg:py-4 rounded-lg transition-colors mt-auto flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `SELL ${symbol}`
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Key Statistics Section */}
      <div className="bg-[#1a1f2e] dark:bg-white p-4 lg:p-8 border-t border-gray-800 dark:border-gray-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 lg:mb-6 gap-3">
            <h2 className="text-lg lg:text-xl font-semibold text-white dark:text-gray-900">
              Key Statistics
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Total Shares */}
            <div>
              <div className="text-gray-400 dark:text-gray-600 text-sm mb-2">
                Total Shares
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl lg:text-4xl font-bold text-white dark:text-gray-900">
                  {userPosition
                    ? parseFloat(userPosition.shares).toFixed(4)
                    : "0.0000"}
                </span>
                <span className="text-gray-400 dark:text-gray-600">
                  {symbol}
                </span>
              </div>
            </div>

            {/* Total Profit */}
            <div>
              <div className="text-gray-400 dark:text-gray-600 text-sm mb-2">
                Total Profit/Loss
              </div>
              <div
                className={`text-3xl lg:text-4xl font-bold ${
                  userPosition && parseFloat(userPosition.profit_loss) >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {userPosition
                  ? `$${parseFloat(userPosition.profit_loss).toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}`
                  : "$0.00"}
                {userPosition && (
                  <span className="text-lg ml-2">
                    ({parseFloat(userPosition.profit_loss_percent).toFixed(2)}
                    %)
                  </span>
                )}
              </div>
            </div>

            {/* Cost of Purchase */}
            <div className="flex justify-between items-center py-3 lg:py-4 border-t border-gray-800 dark:border-gray-300">
              <span className="text-gray-400 dark:text-gray-600 text-sm lg:text-base">
                Cost of Purchase
              </span>
              <span className="text-white dark:text-gray-900 font-semibold">
                $
                {userPosition
                  ? parseFloat(userPosition.total_invested).toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )
                  : "0.00"}
              </span>
            </div>

            {/* Current Value */}
            <div className="flex justify-between items-center py-3 lg:py-4 border-t border-gray-800 dark:border-gray-300">
              <span className="text-gray-400 dark:text-gray-600 text-sm lg:text-base">
                Current Value
              </span>
              <span className="text-white dark:text-gray-900 font-semibold">
                $
                {userPosition
                  ? parseFloat(userPosition.current_value).toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )
                  : "0.00"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
