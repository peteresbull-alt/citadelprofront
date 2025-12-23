"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, Info, TrendingUp, TrendingDown, X } from "lucide-react";
import { toast } from "sonner";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import DashboardNavbar from "@/components/main/DashboardNavbar";
import Link from "next/link";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useParams } from "next/navigation";
import { BACKEND_URL } from "@/lib/constants";
import { PulseLoader } from "react-spinners";

interface TraderDetail {
  id: number;
  name: string;
  username: string;
  avatar_url: string | null;
  badge: string;
  country: string;
  gain: string;
  risk: number;
  trades: number;
  capital: string;
  copiers: number;
  avg_trade_time: string;
  subscribers: number;
  current_positions: number;
  min_account_threshold: string;
  expert_rating: string;
  return_ytd: string;
  return_2y: string;
  avg_score_7d: string;
  profitable_weeks: string;
  total_trades_12m: number;
  avg_profit_percent: string;
  avg_loss_percent: string;
  total_wins: number;
  total_losses: number;
  win_rate: number;
  performance_data: Array<{ month: string; value: number }>;
  monthly_performance: Array<{ month: string; percentage: number }>;
  frequently_traded: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface UserProfile {
  user: {
    balance: string;
  };
}

// Recharts-compatible data interface
interface PieChartDataItem {
  name: string;
  value: number;
  [key: string]: string | number;
}

export default function TraderProfilePage() {
  const params = useParams();
  const traderId = params.id;

  const [activeTab, setActiveTab] = useState<"overview" | "stats">("overview");
  const [trader, setTrader] = useState<TraderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userBalance, setUserBalance] = useState<number>(0);
  const [isCopying, setIsCopying] = useState(false);
  const [loadingBalance, setLoadingBalance] = useState(false);
  const [copyActionLoading, setCopyActionLoading] = useState(false);

  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Fetch user balance
  useEffect(() => {
    fetchUserBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch trader details
  useEffect(() => {
    if (traderId) {
      fetchTraderDetails();
      fetchCopyStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [traderId]);

  const fetchUserBalance = async () => {
    try {
      setLoadingBalance(true);
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.warn("No auth token found");
        return;
      }

      const response = await fetch(`${BACKEND_URL}/profile/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: UserProfile = await response.json();
      console.log("USER ULTIMATE DATA: ", data.user);

      if (data?.user?.balance) {
        setUserBalance(parseFloat(data.user.balance));
      }
    } catch (err) {
      console.error("Error fetching balance:", err);
      toast.error("Failed to load balance");
    } finally {
      setLoadingBalance(false);
    }
  };

  const fetchTraderDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("authToken");

      const headers: HeadersInit = token
        ? { Authorization: `Token ${token}` }
        : {};

      const response = await fetch(`${BACKEND_URL}/traders/${traderId}/`, {
        headers,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch trader details");
      }

      const data: TraderDetail = await response.json();
      setTrader(data);
    } catch (err) {
      setError("Failed to load trader details. Please try again later.");
      console.error("Error fetching trader:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCopyStatus = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        // User not logged in, skip fetching copy status
        return;
      }

      const response = await fetch(
        `${BACKEND_URL}/copy-trader/status/${traderId}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.is_copying) {
        setIsCopying(true);
      }
    } catch (err) {
      console.error("Error fetching copy status:", err);
      // Silent fail - user just won't see copy status
    }
  };

  const handleCopyTrader = async () => {
    if (!trader) return;

    const minThreshold = parseFloat(trader.min_account_threshold);

    if (userBalance < minThreshold) {
      toast.error("Insufficient Balance", {
        description: `You need at least $${minThreshold.toLocaleString()} to copy ${
          trader.name
        }. Your current balance: $${userBalance.toLocaleString()}`,
      });
      return;
    }

    setCopyActionLoading(true);

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        toast.error("Authentication Required", {
          description: "Please login to copy traders",
        });
        setCopyActionLoading(false);
        return;
      }

      const response = await fetch(`${BACKEND_URL}/copy-trader/action/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          trader_id: trader.id,
          action: "copy",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to copy trader");
      }

      setIsCopying(true);
      toast.success("Copying Trader", {
        description: data.message || `You are now copying ${trader.name}`,
      });
    } catch (err) {
      console.error("Error copying trader:", err);
      toast.error("Failed to Copy Trader", {
        description: err instanceof Error ? err.message : "An error occurred",
      });
    } finally {
      setCopyActionLoading(false);
    }
  };

  const handleCancelCopy = async () => {
    if (!trader) return;

    setCopyActionLoading(true);

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        toast.error("Authentication Required");
        setCopyActionLoading(false);
        return;
      }

      const response = await fetch(`${BACKEND_URL}/copy-trader/action/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          trader_id: trader.id,
          action: "cancel",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to cancel copy");
      }

      setIsCopying(false);
      toast.info("Copy Cancelled", {
        description: data.message || `You have stopped copying ${trader.name}`,
      });
    } catch (err) {
      console.error("Error canceling copy:", err);
      toast.error("Failed to Cancel Copy", {
        description: err instanceof Error ? err.message : "An error occurred",
      });
    } finally {
      setCopyActionLoading(false);
    }
  };

  const isLight = mounted
    ? resolvedTheme === "light" || theme === "light"
    : false;

  const getAvatarUrl = (avatarUrl: string | null, name: string): string => {
    return (
      avatarUrl ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name
      )}&background=random&size=128`
    );
  };

  // Pie chart colors
  const COLORS = {
    wins: isLight ? "#10b981" : "#34d399",
    losses: isLight ? "#ef4444" : "#f87171",
  };

  // Prepare pie chart data
  const pieChartData: PieChartDataItem[] = trader
    ? [
        { name: "Wins", value: trader.total_wins },
        { name: "Losses", value: trader.total_losses },
      ]
    : [];

  // Custom label render function for Pie chart
  const renderPieLabel = (props: Record<string, unknown>): string => {
    const name = (props.name as string) || "";
    const value = (props.value as number) || 0;
    const percent = (props.percent as number) || 0;
    return `${name}: ${value} (${(percent * 100).toFixed(0)}%)`;
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#061124] dark:bg-slate-50 text-slate-100 dark:text-slate-900">
        <DashboardNavbar />
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
          <PulseLoader color="#10b981" size={15} />
        </div>
      </div>
    );
  }

  // Error State
  if (error || !trader) {
    return (
      <div className="min-h-screen bg-[#061124] dark:bg-slate-50 text-slate-100 dark:text-slate-900">
        <DashboardNavbar />
        <div className="flex flex-col justify-center items-center h-[calc(100vh-200px)] gap-4">
          <p className="text-red-500 text-lg">{error || "Trader not found"}</p>
          <div className="flex gap-4">
            <button
              onClick={fetchTraderDetails}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              Retry
            </button>
            <Link
              href="/copy-experts"
              className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Back to Experts
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const minThreshold = parseFloat(trader.min_account_threshold);
  const hasEnoughBalance = userBalance >= minThreshold;

  return (
    <div className="min-h-screen bg-[#061124] dark:bg-slate-50 text-slate-100 dark:text-slate-900">
      <DashboardNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 justify-between mb-6">
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Image
              src={getAvatarUrl(trader.avatar_url, trader.name)}
              alt={trader.name}
              width={100}
              height={100}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover flex-shrink-0"
              unoptimized
            />
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-bold truncate">
                {trader.name}
              </h1>
              <p className="text-slate-400 dark:text-slate-600 text-xs sm:text-sm truncate">
                {trader.username}
              </p>
            </div>
          </div>

          <div className="flex flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            {!isCopying ? (
              <button
                onClick={handleCopyTrader}
                disabled={loadingBalance || copyActionLoading}
                className={`flex-1 sm:flex-initial px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-all flex items-center justify-center gap-2 ${
                  loadingBalance || copyActionLoading
                    ? "bg-slate-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                }`}
              >
                {loadingBalance
                  ? "Loading..."
                  : copyActionLoading
                  ? "Processing..."
                  : "Copy Trader"}
              </button>
            ) : (
              <>
                <button
                  className="flex-1 sm:flex-initial px-4 sm:px-6 py-2 sm:py-2.5 bg-yellow-500 text-white rounded-lg text-sm sm:text-base font-medium transition-all flex items-center justify-center gap-2 cursor-default"
                  disabled
                >
                  Copying
                </button>
                <button
                  onClick={handleCancelCopy}
                  disabled={copyActionLoading}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm sm:text-base font-medium transition-all flex items-center justify-center gap-2 ${
                    copyActionLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <X className="w-4 h-4" />
                  {copyActionLoading ? "Cancelling..." : "Cancel"}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Balance Warning */}
        {!hasEnoughBalance && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-500 dark:text-red-600 text-sm">
              ⚠️ Minimum balance required: ${minThreshold.toLocaleString()} •
              Your balance: ${userBalance.toLocaleString()}
            </p>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 sm:gap-6 border-b border-slate-700/40 dark:border-slate-200 mb-6 overflow-x-auto scrollbar-hide">
          {[
            { id: "overview", label: "Overview" },
            { id: "stats", label: "Stats" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as "overview" | "stats")}
              className={`pb-3 px-2 text-sm sm:text-base font-medium transition-all relative whitespace-nowrap ${
                activeTab === t.id
                  ? "text-green-500"
                  : "text-slate-400 dark:text-slate-600 hover:text-slate-200 dark:hover:text-slate-800"
              }`}
            >
              <span className="flex items-center gap-2">{t.label}</span>
              {activeTab === t.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Key Metrics */}
            <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-slate-800/60 dark:bg-white border border-slate-700/40 dark:border-slate-200 rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center">
                <div className="text-xl sm:text-2xl font-bold mb-2">
                  $
                  {parseFloat(trader.min_account_threshold).toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}
                </div>
                <div className="text-slate-400 dark:text-slate-600 text-xs sm:text-sm font-medium">
                  Starting Capital
                </div>
              </div>

              <div className="bg-slate-800/60 dark:bg-white border border-slate-700/40 dark:border-slate-200 rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center">
                <div
                  className={`text-xl sm:text-2xl font-bold mb-2 ${
                    parseFloat(trader.gain) >= 0
                      ? "text-emerald-400 dark:text-emerald-600"
                      : "text-red-400 dark:text-red-600"
                  }`}
                >
                  {parseFloat(trader.gain) >= 0 ? "+" : ""}
                  {trader.gain}%
                </div>
                <div className="text-slate-400 dark:text-slate-600 text-xs sm:text-sm font-medium">
                  Total Gain
                </div>
              </div>

              <div className="bg-slate-800/60 dark:bg-white border border-slate-700/40 dark:border-slate-200 rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center gap-2 mb-2">
                  <div
                    className={`${
                      trader.risk <= 2
                        ? "bg-emerald-500 dark:bg-emerald-600"
                        : trader.risk <= 4
                        ? "bg-yellow-500 dark:bg-yellow-600"
                        : "bg-red-500 dark:bg-red-600"
                    } text-white text-sm md:text-xl w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold shadow-lg`}
                  >
                    {trader.risk}
                  </div>
                </div>
                <div className="text-slate-400 dark:text-slate-600 text-xs sm:text-sm font-medium">
                  Risk Level
                </div>
              </div>

              <div className="bg-slate-800/60 dark:bg-white border border-slate-700/40 dark:border-slate-200 rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center">
                <div className="text-xl sm:text-2xl font-bold mb-2">
                  {trader.copiers.toLocaleString()}
                </div>
                <div className="text-slate-400 dark:text-slate-600 text-xs sm:text-sm font-medium">
                  Copiers
                </div>
              </div>
            </div>

            {/* Wins vs Losses Pie Chart */}
            <div className="bg-slate-800/60 dark:bg-white border border-slate-700/40 dark:border-slate-200 rounded-xl p-4 sm:p-6 col-span-1 lg:col-span-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                <h2 className="text-lg sm:text-xl font-bold">Wins vs Losses</h2>
              </div>

              {trader.total_wins + trader.total_losses > 0 ? (
                <div className="h-64 sm:h-72 md:h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderPieLabel as never}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              entry.name === "Wins"
                                ? COLORS.wins
                                : COLORS.losses
                            }
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: isLight ? "#ffffff" : "#1e293b",
                          border: `1px solid ${
                            isLight ? "#e2e8f0" : "#334155"
                          }`,
                          borderRadius: 8,
                          color: isLight ? "#0f1724" : "#fff",
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-slate-400 dark:text-slate-600">
                  <div className="text-center">
                    <Info className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No trading data available</p>
                  </div>
                </div>
              )}

              {/* Win/Loss Summary */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center p-3 bg-green-500/10 rounded-lg">
                  <div className="text-2xl font-bold text-green-500">
                    {trader.total_wins}
                  </div>
                  <div className="text-xs text-slate-400 dark:text-slate-600">
                    Total Wins
                  </div>
                </div>
                <div className="text-center p-3 bg-red-500/10 rounded-lg">
                  <div className="text-2xl font-bold text-red-500">
                    {trader.total_losses}
                  </div>
                  <div className="text-xs text-slate-400 dark:text-slate-600">
                    Total Losses
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-slate-800/60 flex justify-center items-center flex-col gap-6 dark:bg-white border border-slate-700/40 dark:border-slate-200 rounded-xl p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-center">
                About {trader.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 sm:gap-y-10">
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold mb-1">
                    {trader.subscribers}
                  </div>
                  <div className="text-slate-400 dark:text-slate-600 text-xs sm:text-sm">
                    Total Subscribers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold mb-1">
                    {trader.current_positions}
                  </div>
                  <div className="text-slate-400 dark:text-slate-600 text-xs sm:text-sm">
                    Current Positions
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold mb-1">
                    {trader.trades}
                  </div>
                  <div className="text-slate-400 dark:text-slate-600 text-xs sm:text-sm">
                    Active Days
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-lg sm:text-xl">
                        {star <= Math.floor(parseFloat(trader.expert_rating))
                          ? "⭐"
                          : "☆"}
                      </span>
                    ))}
                  </div>
                  <div className="text-slate-400 dark:text-slate-600 text-xs sm:text-sm">
                    Expert Rating ({trader.expert_rating}/5.00)
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  title: "Return YTD",
                  value: `${trader.return_ytd}%`,
                  desc: `This is ${trader.name}'s PnL for the calendar year`,
                  highlight:
                    parseFloat(trader.return_ytd) >= 0
                      ? "text-emerald-400 dark:text-emerald-600"
                      : "text-red-400 dark:text-red-600",
                },
                {
                  title: "Average Score (Last 7D)",
                  value: trader.avg_score_7d,
                  desc: `Measure of ${trader.name}'s risk and portfolio volatility`,
                },
                {
                  title: "Profitable Weeks",
                  value: `${trader.profitable_weeks}%`,
                  desc: `${trader.name}'s profitable weeks as a percentage`,
                  highlight: "text-emerald-400 dark:text-emerald-600",
                },
              ].map((s) => (
                <div
                  key={s.title}
                  className="bg-slate-800/60 dark:bg-white border border-slate-700/40 dark:border-slate-200 rounded-xl p-4 sm:p-6"
                >
                  <h3 className="text-slate-400 dark:text-slate-600 text-xs sm:text-sm mb-2">
                    {s.title}
                  </h3>
                  <div
                    className={`text-xl sm:text-2xl font-bold mb-1 ${
                      s.highlight ? s.highlight : ""
                    }`}
                  >
                    {s.value}
                  </div>
                  <p className="text-slate-400 dark:text-slate-600 text-xs">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "stats" && (
          <div className="space-y-4 sm:space-y-6">
            {/* Trading Stats */}
            <div className="bg-slate-800/60 dark:bg-white border border-slate-700/40 dark:border-slate-200 rounded-xl p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold mb-4">Trading</h2>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <div className="flex flex-col gap-3 mb-2">
                    <div>
                      <span className="text-xl sm:text-2xl font-bold">
                        {trader.total_trades_12m}
                      </span>
                      <p className="text-slate-400 dark:text-slate-600 text-xs sm:text-sm mt-1">
                        Total Trades in past 12 months
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                      <span className="flex items-center gap-1 text-emerald-400 dark:text-emerald-600 text-xs sm:text-sm">
                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                        {trader.avg_profit_percent}% Avg. Profit
                      </span>
                      <span className="flex items-center gap-1 text-red-400 dark:text-red-600 text-xs sm:text-sm">
                        <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />
                        {trader.avg_loss_percent}% Avg. Loss
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 sm:pt-6 border-t border-slate-700/40 dark:border-slate-200">
                  <h3 className="text-base sm:text-lg font-semibold mb-4">
                    Frequently Traded
                  </h3>
                  {trader.frequently_traded.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-slate-400 dark:text-slate-600">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-800/60 dark:bg-slate-200 flex items-center justify-center mb-3">
                        <Info className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <p className="text-sm sm:text-base">No records found</p>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {trader.frequently_traded.map((asset, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-slate-700 dark:bg-slate-200 text-slate-300 dark:text-slate-700 text-sm rounded-full"
                        >
                          {asset}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Back Button */}
            <div className="flex justify-center">
              <Link
                href="/copy-experts"
                className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-slate-100 hover:bg-slate-200 dark:bg-white dark:hover:bg-slate-50 text-slate-900 rounded-full text-sm sm:text-base font-medium transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Experts
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
