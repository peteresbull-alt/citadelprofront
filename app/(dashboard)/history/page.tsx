"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  Loader2,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Search,
  Briefcase,
  History,
  Users,
  X,
  AlertCircle,
  BarChart3,
} from "lucide-react";
import { toast } from "sonner";
import DashboardNavbar from "@/components/main/DashboardNavbar";
import { BACKEND_URL } from "@/lib/constants";
import { PulseLoader } from "react-spinners";

// ==================== TYPES ====================

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

interface CopyTradeSummary {
  open_trades: number;
  closed_trades: number;
  total_profit_loss: string;
}

interface Stock {
  id: number;
  symbol: string;
  name: string;
  price: string;
  logo_url: string;
}

interface Position {
  id: number;
  stock: Stock;
  shares: string;
  average_buy_price: string;
  total_invested: string;
  current_value: string;
  profit_loss: string;
  profit_loss_percent: string;
  opened_at: string;
  is_active: boolean;
  use_admin_profit?: boolean;
  admin_profit_loss?: string;
}

interface PositionSummary {
  total_invested: string;
  total_current_value: string;
  total_profit_loss: string;
  total_profit_loss_percent: string;
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

type TabType = "positions" | "copy-trading" | "history";

// ==================== SELL MODAL ====================

interface SellModalProps {
  position: Position;
  onClose: () => void;
  onSuccess: () => void;
}

function SellModal({ position, onClose, onSuccess }: SellModalProps) {
  const [shares, setShares] = useState("");
  const [processing, setProcessing] = useState(false);

  const availableShares = parseFloat(position.shares);
  const currentPrice = parseFloat(position.stock.price);
  const sharesToSell = parseFloat(shares) || 0;
  const totalInvested = parseFloat(position.total_invested);
  const averageBuyPrice = parseFloat(position.average_buy_price);

  let estimatedValue = 0;
  let costBasis = 0;
  let estimatedPL = 0;
  let plPercent = 0;

  if (position.use_admin_profit && position.admin_profit_loss) {
    const totalAdminPL = parseFloat(position.admin_profit_loss);
    const proportion = sharesToSell / availableShares;
    if (sharesToSell === availableShares) {
      estimatedValue = totalInvested + totalAdminPL;
      costBasis = totalInvested;
      estimatedPL = totalAdminPL;
    } else {
      costBasis = totalInvested * proportion;
      estimatedPL = totalAdminPL * proportion;
      estimatedValue = costBasis + estimatedPL;
    }
    plPercent = costBasis > 0 ? (estimatedPL / costBasis) * 100 : 0;
  } else {
    estimatedValue = sharesToSell * currentPrice;
    costBasis = sharesToSell * averageBuyPrice;
    estimatedPL = estimatedValue - costBasis;
    plPercent = costBasis > 0 ? (estimatedPL / costBasis) * 100 : 0;
  }

  const isProfitable = estimatedPL >= 0;

  const handleSell = async () => {
    if (!shares || parseFloat(shares) <= 0) {
      toast.error("Please enter a valid number of shares");
      return;
    }
    if (parseFloat(shares) > availableShares) {
      toast.error("You don't have enough shares");
      return;
    }
    setProcessing(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${BACKEND_URL}/stocks/sell/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ symbol: position.stock.symbol, shares }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        onSuccess();
      } else {
        toast.error(data.error || "Failed to sell stock");
      }
    } catch (error) {
      toast.error("An error occurred while selling stock");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-[#151922] dark:bg-white rounded-xl w-full max-w-md p-4 sm:p-6 border border-slate-700/50 dark:border-slate-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-white dark:text-gray-900">
            Sell {position.stock.symbol}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-700/50"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
          </button>
        </div>

        {/* Warning */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex items-start gap-2 sm:gap-3">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-red-400">
              This action will sell your shares at the current market price.
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="bg-slate-800/50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 space-y-2 sm:space-y-3">
          <div className="flex justify-between text-sm sm:text-base">
            <span className="text-gray-400">Current Price</span>
            <span className="font-semibold text-white">
              ${currentPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm sm:text-base">
            <span className="text-gray-400">Available</span>
            <span className="font-semibold text-white">
              {availableShares.toFixed(4)}
            </span>
          </div>
        </div>

        {/* Input */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-gray-400 text-xs sm:text-sm mb-2">
            Shares to Sell
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={shares}
              onChange={(e) => setShares(e.target.value)}
              placeholder="0.0000"
              className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-slate-800/50 text-white rounded-lg border border-slate-700/50 focus:border-emerald-500 focus:outline-none"
            />
            <button
              onClick={() => setShares(position.shares)}
              className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-slate-700 text-white rounded-lg font-medium"
            >
              Max
            </button>
          </div>
        </div>

        {/* Summary */}
        {sharesToSell > 0 && (
          <div className="bg-slate-800/50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="flex justify-between mb-2 text-sm sm:text-base">
              <span className="text-gray-400">You Receive</span>
              <span className="font-bold text-white text-base sm:text-lg">
                ${estimatedValue.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm sm:text-base">
              <span className="text-gray-400">P/L</span>
              <span
                className={`font-semibold ${
                  isProfitable ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {isProfitable ? "+" : ""}${estimatedPL.toFixed(2)} (
                {plPercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 sm:py-3 text-sm sm:text-base bg-slate-700 text-white rounded-lg font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSell}
            disabled={processing || !shares || parseFloat(shares) <= 0}
            className="flex-1 py-2.5 sm:py-3 text-sm sm:text-base bg-red-500 hover:bg-red-600 disabled:bg-gray-600 text-white rounded-lg font-medium flex items-center justify-center gap-2"
          >
            {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {processing ? "Selling..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN COMPONENT ====================

export default function TradingDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("positions");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Copy Trading
  const [copyTradeStatus, setCopyTradeStatus] = useState<"open" | "closed">(
    "open"
  );
  const [copyTrades, setCopyTrades] = useState<CopyTradeHistory[]>([]);
  const [copyTradeSummary, setCopyTradeSummary] =
    useState<CopyTradeSummary | null>(null);
  const [expandedCopyTrade, setExpandedCopyTrade] = useState<number | null>(
    null
  );
  const [closingTrade, setClosingTrade] = useState<number | null>(null);

  // Positions
  const [positions, setPositions] = useState<Position[]>([]);
  const [positionSummary, setPositionSummary] =
    useState<PositionSummary | null>(null);
  const [expandedPosition, setExpandedPosition] = useState<number | null>(null);
  const [sellModalPosition, setSellModalPosition] = useState<Position | null>(
    null
  );

  // Trade History
  const [trades, setTrades] = useState<Trade[]>([]);
  const [tradeSummary, setTradeSummary] = useState<TradeSummary | null>(null);
  const [tradeFilter, setTradeFilter] = useState<"all" | "buy" | "sell">("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAllData();
  }, []);
  useEffect(() => {
    if (activeTab === "copy-trading") fetchCopyTrades();
  }, [copyTradeStatus]);
  useEffect(() => {
    if (activeTab === "history") fetchTradeHistory();
  }, [tradeFilter]);

  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([
      fetchPositions(),
      fetchCopyTrades(),
      fetchTradeHistory(),
    ]);
    setLoading(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAllData();
    setRefreshing(false);
    toast.success("Data refreshed successfully");
  };

  const fetchPositions = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;
      const res = await fetch(
        `${BACKEND_URL}/stocks/positions/list/?active_only=true`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      const data = await res.json();
      if (data.success) {
        setPositions(data.positions);
        setPositionSummary(data.summary);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchCopyTrades = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;
      const res = await fetch(
        `${BACKEND_URL}/copy-trade-history/?status=${copyTradeStatus}`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      const data = await res.json();
      if (data.success) {
        setCopyTrades(data.history);
        setCopyTradeSummary(data.summary);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchTradeHistory = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;
      let url = `${BACKEND_URL}/trades/history/?limit=100`;
      if (tradeFilter !== "all") url += `&trade_type=${tradeFilter}`;
      const res = await fetch(url, {
        headers: { Authorization: `Token ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setTrades(data.trades);
        setTradeSummary(data.summary);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCloseCopyTrade = async (tradeId: number) => {
    setClosingTrade(tradeId);
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(
        `${BACKEND_URL}/copy-trade-history/${tradeId}/close/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success("Trade closed successfully");
        fetchCopyTrades();
      } else throw new Error(data.error);
    } catch {
      toast.error("Failed to close trade");
    } finally {
      setClosingTrade(null);
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  const formatDateTime = (d: string) =>
    new Date(d).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const filteredTrades = trades.filter(
    (t) =>
      !searchTerm ||
      t.stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalPositions: positions.length,
    openCopyTrades: copyTradeSummary?.open_trades || 0,
    totalTrades: tradeSummary?.total_trades || 0,
    overallPL:
      (positionSummary ? parseFloat(positionSummary.total_profit_loss) : 0) +
      (copyTradeSummary ? parseFloat(copyTradeSummary.total_profit_loss) : 0),
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e17] dark:bg-slate-50">
        <DashboardNavbar />
        <div className="flex justify-center items-center h-[calc(100vh-80px)]">
          <PulseLoader color="#10b981" size={12} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e17] dark:bg-slate-50 text-slate-100 dark:text-slate-900">
      <DashboardNavbar />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 pt-16 sm:pt-20 lg:pt-24">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
              Trading History
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Manage your positions, copy trades, and trading history
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs sm:text-sm font-medium transition-all disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
            />
            <span>{refreshing ? "Refreshing..." : "Refresh"}</span>
          </button>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
          {/* Positions */}
          <div className="bg-slate-800/60 dark:bg-white border border-slate-700/50 dark:border-slate-200 rounded-xl p-3 sm:p-4 lg:p-5">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="p-1.5 sm:p-2 rounded-lg bg-emerald-500/10">
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
              </div>
              <span className="text-[10px] sm:text-xs text-slate-400">
                Active Positions
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">
              {stats.totalPositions}
            </div>
          </div>

          {/* Copy Trades */}
          <div className="bg-slate-800/60 dark:bg-white border border-slate-700/50 dark:border-slate-200 rounded-xl p-3 sm:p-4 lg:p-5">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="p-1.5 sm:p-2 rounded-lg bg-blue-500/10">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              </div>
              <span className="text-[10px] sm:text-xs text-slate-400">
                Copy Trades
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">
              {stats.openCopyTrades}
            </div>
          </div>

          {/* Total Trades */}
          <div className="bg-slate-800/60 dark:bg-white border border-slate-700/50 dark:border-slate-200 rounded-xl p-3 sm:p-4 lg:p-5">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="p-1.5 sm:p-2 rounded-lg bg-purple-500/10">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
              </div>
              <span className="text-[10px] sm:text-xs text-slate-400">
                Total Trades
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">
              {stats.totalTrades}
            </div>
          </div>

          {/* P/L */}
          <div className="bg-slate-800/60 dark:bg-white border border-slate-700/50 dark:border-slate-200 rounded-xl p-3 sm:p-4 lg:p-5">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div
                className={`p-1.5 sm:p-2 rounded-lg ${
                  stats.overallPL >= 0 ? "bg-emerald-500/10" : "bg-red-500/10"
                }`}
              >
                {stats.overallPL >= 0 ? (
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                )}
              </div>
              <span className="text-[10px] sm:text-xs text-slate-400">
                Total P/L
              </span>
            </div>
            <div
              className={`text-xl sm:text-2xl font-bold ${
                stats.overallPL >= 0 ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {stats.overallPL >= 0 ? "+" : ""}$
              {Math.abs(stats.overallPL).toFixed(2)}
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="bg-slate-800/50 dark:bg-white border border-slate-700/50 dark:border-slate-200 rounded-xl p-1 sm:p-1.5 mb-4 sm:mb-6">
          <div className="flex gap-1">
            {[
              {
                id: "positions" as TabType,
                label: "Positions",
                icon: Briefcase,
              },
              {
                id: "copy-trading" as TabType,
                label: "Copy Trading",
                icon: Users,
              },
              {
                id: "history" as TabType,
                label: "Trade History",
                icon: History,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">
                  {tab.id === "copy-trading"
                    ? "Copy"
                    : tab.id === "history"
                    ? "History"
                    : "Positions"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ========== POSITIONS TAB ========== */}
        {activeTab === "positions" && (
          <div className="space-y-3 sm:space-y-4">
            {/* Summary */}
            {positionSummary && positions.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
                <div className="bg-slate-800/50 dark:bg-white border border-slate-700/50 dark:border-slate-200 rounded-xl p-3 sm:p-4">
                  <div className="text-[10px] sm:text-xs text-slate-400 mb-1">
                    Total Invested
                  </div>
                  <div className="text-lg sm:text-xl font-bold">
                    ${parseFloat(positionSummary.total_invested).toFixed(2)}
                  </div>
                </div>
                <div className="bg-slate-800/50 dark:bg-white border border-slate-700/50 dark:border-slate-200 rounded-xl p-3 sm:p-4">
                  <div className="text-[10px] sm:text-xs text-slate-400 mb-1">
                    Current Value
                  </div>
                  <div className="text-lg sm:text-xl font-bold">
                    $
                    {parseFloat(positionSummary.total_current_value).toFixed(2)}
                  </div>
                </div>
                <div className="bg-slate-800/50 dark:bg-white border border-slate-700/50 dark:border-slate-200 rounded-xl p-3 sm:p-4">
                  <div className="text-[10px] sm:text-xs text-slate-400 mb-1">
                    Unrealized P/L
                  </div>
                  <div
                    className={`text-lg sm:text-xl font-bold ${
                      parseFloat(positionSummary.total_profit_loss) >= 0
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {parseFloat(positionSummary.total_profit_loss) >= 0
                      ? "+"
                      : ""}
                    $
                    {Math.abs(
                      parseFloat(positionSummary.total_profit_loss)
                    ).toFixed(2)}
                    <span className="text-xs sm:text-sm ml-1">
                      (
                      {parseFloat(
                        positionSummary.total_profit_loss_percent
                      ).toFixed(2)}
                      %)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Empty State */}
            {positions.length === 0 ? (
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 sm:p-12 text-center">
                <Briefcase className="w-12 h-12 sm:w-16 sm:h-16 text-slate-600 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-xl font-semibold mb-2">
                  No Active Positions
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mb-4 sm:mb-6">
                  Start trading to see your positions here
                </p>
                <button
                  onClick={() => router.push("/stock")}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 bg-emerald-500 text-white rounded-xl text-sm font-medium"
                >
                  Browse Stocks
                </button>
              </div>
            ) : (
              /* Positions List */
              <div className="space-y-2 sm:space-y-3">
                {positions
                  .filter((p) => p.stock?.symbol)
                  .map((pos) => {
                    const pl = parseFloat(pos.profit_loss || "0");
                    const plPct = parseFloat(pos.profit_loss_percent || "0");
                    const isPos = pl >= 0;

                    return (
                      <div
                        key={pos.id}
                        className="bg-slate-800/50 dark:bg-white border border-slate-700/50 dark:border-slate-200 rounded-xl overflow-hidden"
                      >
                        {/* Main Row */}
                        <div
                          onClick={() =>
                            setExpandedPosition(
                              expandedPosition === pos.id ? null : pos.id
                            )
                          }
                          className="p-3 sm:p-4 cursor-pointer hover:bg-slate-700/30 transition-colors"
                        >
                          <div className="flex items-center gap-3 sm:gap-4">
                            {/* Logo */}
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-white flex-shrink-0">
                              {pos.stock.logo_url ? (
                                <Image
                                  src={pos.stock.logo_url}
                                  alt=""
                                  width={48}
                                  height={48}
                                  className="object-contain p-1.5 sm:p-2"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-600 text-sm sm:text-lg font-bold">
                                  {pos.stock.symbol?.charAt(0)}
                                </div>
                              )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="font-bold text-sm sm:text-base lg:text-lg">
                                  {pos.stock.symbol}
                                </span>
                                <span className="text-[10px] sm:text-xs text-slate-400">
                                  {parseFloat(pos.shares).toFixed(2)} shares
                                </span>
                              </div>
                              <div className="text-xs sm:text-sm text-slate-400 truncate">
                                {pos.stock.name}
                              </div>
                            </div>

                            {/* P/L */}
                            <div className="text-right flex-shrink-0">
                              <div
                                className={`text-sm sm:text-base lg:text-lg font-bold ${
                                  isPos ? "text-emerald-400" : "text-red-400"
                                }`}
                              >
                                {isPos ? "+" : ""}${Math.abs(pl).toFixed(2)}
                              </div>
                              <div
                                className={`text-[10px] sm:text-xs ${
                                  isPos
                                    ? "text-emerald-400/70"
                                    : "text-red-400/70"
                                }`}
                              >
                                {isPos ? "+" : ""}
                                {plPct.toFixed(2)}%
                              </div>
                            </div>

                            {/* Sell (desktop) */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSellModalPosition(pos);
                              }}
                              className="hidden sm:block px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-xs sm:text-sm font-medium"
                            >
                              Sell
                            </button>

                            {/* Chevron */}
                            {expandedPosition === pos.id ? (
                              <ChevronUp className="w-5 h-5 text-slate-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-slate-400" />
                            )}
                          </div>

                          {/* Sell (mobile) */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSellModalPosition(pos);
                            }}
                            className="sm:hidden w-full mt-3 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-xs font-medium"
                          >
                            Sell Order
                          </button>
                        </div>

                        {/* Expanded */}
                        {expandedPosition === pos.id && (
                          <div className="border-t border-slate-700/50 p-3 sm:p-4 bg-slate-900/50">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                              <div>
                                <div className="text-[10px] sm:text-xs text-slate-400 mb-1">
                                  Avg Buy Price
                                </div>
                                <div className="text-sm sm:text-base font-semibold">
                                  $
                                  {parseFloat(pos.average_buy_price).toFixed(2)}
                                </div>
                              </div>
                              <div>
                                <div className="text-[10px] sm:text-xs text-slate-400 mb-1">
                                  Current Price
                                </div>
                                <div className="text-sm sm:text-base font-semibold">
                                  ${parseFloat(pos.stock.price).toFixed(2)}
                                </div>
                              </div>
                              <div>
                                <div className="text-[10px] sm:text-xs text-slate-400 mb-1">
                                  Total Invested
                                </div>
                                <div className="text-sm sm:text-base font-semibold">
                                  ${parseFloat(pos.total_invested).toFixed(2)}
                                </div>
                              </div>
                              <div>
                                <div className="text-[10px] sm:text-xs text-slate-400 mb-1">
                                  Current Value
                                </div>
                                <div className="text-sm sm:text-base font-semibold">
                                  ${parseFloat(pos.current_value).toFixed(2)}
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-700/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                              <span className="text-xs sm:text-sm text-slate-400">
                                Opened: {formatDate(pos.opened_at)}
                              </span>
                              <button
                                onClick={() =>
                                  router.push(`/stock/${pos.stock.symbol}`)
                                }
                                className="text-xs sm:text-sm text-emerald-400 font-medium"
                              >
                                View Stock →
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}

        {/* ========== COPY TRADING TAB ========== */}
        {activeTab === "copy-trading" && (
          <div className="space-y-3 sm:space-y-4">
            {/* Summary */}
            {copyTradeSummary && (
              <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 sm:p-4">
                  <div className="text-[10px] sm:text-xs text-slate-400 mb-1">
                    Open Trades
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-emerald-400">
                    {copyTradeSummary.open_trades}
                  </div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 sm:p-4">
                  <div className="text-[10px] sm:text-xs text-slate-400 mb-1">
                    Closed Trades
                  </div>
                  <div className="text-lg sm:text-xl font-bold">
                    {copyTradeSummary.closed_trades}
                  </div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 sm:p-4">
                  <div className="text-[10px] sm:text-xs text-slate-400 mb-1">
                    Total P/L
                  </div>
                  <div
                    className={`text-lg sm:text-xl font-bold ${
                      parseFloat(copyTradeSummary.total_profit_loss) >= 0
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    ${parseFloat(copyTradeSummary.total_profit_loss).toFixed(2)}
                  </div>
                </div>
              </div>
            )}

            {/* Toggle */}
            <div className="flex gap-2 sm:gap-3">
              {(["open", "closed"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setCopyTradeStatus(s)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium capitalize transition-all ${
                    copyTradeStatus === s
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                      : "bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:bg-slate-700/50"
                  }`}
                >
                  {s} Trades
                </button>
              ))}
            </div>

            {/* Empty */}
            {copyTrades.length === 0 ? (
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 sm:p-12 text-center">
                <Users className="w-12 h-12 sm:w-16 sm:h-16 text-slate-600 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-xl font-semibold mb-2">
                  No {copyTradeStatus} copy trades
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Your {copyTradeStatus} copy trades will appear here
                </p>
              </div>
            ) : (
              /* List */
              <div className="space-y-2 sm:space-y-3">
                {copyTrades.map((trade) => (
                  <div
                    key={trade.id}
                    className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden"
                  >
                    <div
                      onClick={() =>
                        setExpandedCopyTrade(
                          expandedCopyTrade === trade.id ? null : trade.id
                        )
                      }
                      className="p-3 sm:p-4 cursor-pointer hover:bg-slate-700/30 transition-colors"
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        {/* Icon */}
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-xs sm:text-sm flex-shrink-0">
                          {trade.market.substring(0, 3).toUpperCase()}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 flex-wrap">
                            <span className="font-bold text-sm sm:text-base">
                              {trade.market}
                            </span>
                            <span className="text-[9px] sm:text-xs bg-blue-500/20 text-blue-400 px-1.5 sm:px-2 py-0.5 rounded">
                              {trade.leverage}
                            </span>
                            <span
                              className={`text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded ${
                                trade.direction === "buy"
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {trade.direction.toUpperCase()}
                            </span>
                          </div>
                          <div className="text-[10px] sm:text-xs text-slate-400 truncate">
                            {trade.trader_name} • {trade.time_ago}
                          </div>
                        </div>

                        {/* P/L */}
                        <div
                          className={`text-sm sm:text-base lg:text-lg font-bold flex-shrink-0 ${
                            trade.is_profit
                              ? "text-emerald-400"
                              : "text-red-400"
                          }`}
                        >
                          {trade.is_profit ? "+" : ""}$
                          {parseFloat(trade.profit_loss).toFixed(2)}
                        </div>

                        {/* Close (desktop) */}
                        {trade.status === "open" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCloseCopyTrade(trade.id);
                            }}
                            disabled={closingTrade === trade.id}
                            className="hidden sm:block px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs sm:text-sm font-medium disabled:opacity-50"
                          >
                            {closingTrade === trade.id ? "Closing..." : "Close"}
                          </button>
                        )}

                        {expandedCopyTrade === trade.id ? (
                          <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                        )}
                      </div>

                      {/* Close (mobile) */}
                      {trade.status === "open" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCloseCopyTrade(trade.id);
                          }}
                          disabled={closingTrade === trade.id}
                          className="sm:hidden w-full mt-3 py-2 bg-slate-700 text-white rounded-lg text-xs font-medium disabled:opacity-50"
                        >
                          {closingTrade === trade.id
                            ? "Closing..."
                            : "Close Trade"}
                        </button>
                      )}
                    </div>

                    {/* Expanded */}
                    {expandedCopyTrade === trade.id && (
                      <div className="border-t border-slate-700/50 p-3 sm:p-4 bg-slate-900/50">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                          <div>
                            <div className="text-[10px] sm:text-xs text-slate-400 mb-1">
                              Entry Price
                            </div>
                            <div className="text-sm sm:text-base font-semibold">
                              ${parseFloat(trade.entry_price).toLocaleString()}
                            </div>
                          </div>
                          {trade.exit_price && (
                            <div>
                              <div className="text-[10px] sm:text-xs text-slate-400 mb-1">
                                Exit Price
                              </div>
                              <div className="text-sm sm:text-base font-semibold">
                                ${parseFloat(trade.exit_price).toLocaleString()}
                              </div>
                            </div>
                          )}
                          <div>
                            <div className="text-[10px] sm:text-xs text-slate-400 mb-1">
                              Amount
                            </div>
                            <div className="text-sm sm:text-base font-semibold">
                              {parseFloat(trade.amount).toFixed(6)}
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] sm:text-xs text-slate-400 mb-1">
                              Duration
                            </div>
                            <div className="text-sm sm:text-base font-semibold">
                              {trade.duration}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-700/50">
                          <div className="text-[10px] sm:text-xs text-slate-400 mb-1">
                            Reference
                          </div>
                          <div className="font-mono text-xs sm:text-sm bg-slate-800 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg break-all">
                            {trade.reference}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========== HISTORY TAB ========== */}
        {activeTab === "history" && (
          <div className="space-y-3 sm:space-y-4">
            {/* Summary */}
            {tradeSummary && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 sm:p-4">
                  <div className="text-[10px] sm:text-xs text-slate-400 mb-1">
                    Total Trades
                  </div>
                  <div className="text-lg sm:text-xl font-bold">
                    {tradeSummary.total_trades}
                  </div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 sm:p-4">
                  <div className="text-[10px] sm:text-xs text-slate-400 mb-1">
                    Buy Orders
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-emerald-400">
                    {tradeSummary.buy_orders}
                  </div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 sm:p-4">
                  <div className="text-[10px] sm:text-xs text-slate-400 mb-1">
                    Sell Orders
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-red-400">
                    {tradeSummary.sell_orders}
                  </div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 sm:p-4">
                  <div className="text-[10px] sm:text-xs text-slate-400 mb-1">
                    Realized P/L
                  </div>
                  <div
                    className={`text-lg sm:text-xl font-bold ${
                      parseFloat(tradeSummary.total_profit_loss) >= 0
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    ${parseFloat(tradeSummary.total_profit_loss).toFixed(2)}
                  </div>
                </div>
              </div>
            )}

            {/* Search + Filter */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by symbol or name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 text-sm bg-slate-900/50 border border-slate-700/50 rounded-lg focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="flex gap-2">
                  {(["all", "buy", "sell"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setTradeFilter(f)}
                      className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium capitalize transition-colors ${
                        tradeFilter === f
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-700/50 text-slate-400 hover:bg-slate-600/50"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Empty */}
            {filteredTrades.length === 0 ? (
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 sm:p-12 text-center">
                <History className="w-12 h-12 sm:w-16 sm:h-16 text-slate-600 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-xl font-semibold mb-2">
                  No Trading History
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  {searchTerm
                    ? "No trades found matching your search"
                    : "Start trading to see your history here"}
                </p>
              </div>
            ) : (
              /* List */
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
                {/* Desktop Table */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700/50">
                        <th className="text-left py-4 px-5 text-xs font-semibold text-slate-400">
                          Stock
                        </th>
                        <th className="text-left py-4 px-5 text-xs font-semibold text-slate-400">
                          Type
                        </th>
                        <th className="text-left py-4 px-5 text-xs font-semibold text-slate-400">
                          Shares
                        </th>
                        <th className="text-left py-4 px-5 text-xs font-semibold text-slate-400">
                          Price
                        </th>
                        <th className="text-left py-4 px-5 text-xs font-semibold text-slate-400">
                          Total
                        </th>
                        <th className="text-left py-4 px-5 text-xs font-semibold text-slate-400">
                          P/L
                        </th>
                        <th className="text-left py-4 px-5 text-xs font-semibold text-slate-400">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTrades.map((trade) => (
                        <tr
                          key={trade.id}
                          onClick={() =>
                            router.push(`/stock/${trade.stock.symbol}`)
                          }
                          className="border-b border-slate-700/30 hover:bg-slate-700/30 cursor-pointer transition-colors"
                        >
                          <td className="py-4 px-5">
                            <div className="flex items-center gap-3">
                              {trade.stock.logo_url && (
                                <div className="w-10 h-10 rounded-lg overflow-hidden bg-white flex-shrink-0">
                                  <Image
                                    src={trade.stock.logo_url}
                                    alt=""
                                    width={40}
                                    height={40}
                                    className="object-contain p-1"
                                  />
                                </div>
                              )}
                              <div>
                                <div className="font-semibold">
                                  {trade.stock.symbol}
                                </div>
                                <div className="text-xs text-slate-400 truncate max-w-[120px]">
                                  {trade.stock.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-5">
                            <span
                              className={`inline-block px-2.5 py-1 rounded text-xs font-medium uppercase ${
                                trade.trade_type === "buy"
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {trade.trade_type}
                            </span>
                          </td>
                          <td className="py-4 px-5 font-medium">
                            {parseFloat(trade.shares).toFixed(4)}
                          </td>
                          <td className="py-4 px-5">
                            ${parseFloat(trade.price_per_share).toFixed(2)}
                          </td>
                          <td className="py-4 px-5 font-semibold">
                            {trade.formatted_total}
                          </td>
                          <td className="py-4 px-5">
                            {trade.profit_loss ? (
                              <span
                                className={`font-semibold ${
                                  parseFloat(trade.profit_loss) >= 0
                                    ? "text-emerald-400"
                                    : "text-red-400"
                                }`}
                              >
                                {trade.formatted_profit_loss}
                              </span>
                            ) : (
                              <span className="text-slate-500">-</span>
                            )}
                          </td>
                          <td className="py-4 px-5 text-slate-400 text-sm">
                            {formatDateTime(trade.executed_at)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile List */}
                <div className="lg:hidden divide-y divide-slate-700/50">
                  {filteredTrades.map((trade) => (
                    <div
                      key={trade.id}
                      onClick={() =>
                        router.push(`/stock/${trade.stock.symbol}`)
                      }
                      className="p-3 sm:p-4 hover:bg-slate-700/30 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {trade.stock.logo_url && (
                          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg overflow-hidden bg-white flex-shrink-0">
                            <Image
                              src={trade.stock.logo_url}
                              alt=""
                              width={44}
                              height={44}
                              className="object-contain p-1"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm sm:text-base">
                              {trade.stock.symbol}
                            </span>
                            <span
                              className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded uppercase ${
                                trade.trade_type === "buy"
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {trade.trade_type}
                            </span>
                          </div>
                          <div className="text-[10px] sm:text-xs text-slate-400 truncate">
                            {trade.stock.name}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-sm sm:text-base font-semibold">
                            {trade.formatted_total}
                          </div>
                          {trade.profit_loss ? (
                            <div
                              className={`text-xs sm:text-sm font-medium ${
                                parseFloat(trade.profit_loss) >= 0
                                  ? "text-emerald-400"
                                  : "text-red-400"
                              }`}
                            >
                              {trade.formatted_profit_loss}
                            </div>
                          ) : (
                            <div className="text-xs text-slate-500">-</div>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-[10px] sm:text-xs text-slate-400">
                        <span>
                          {parseFloat(trade.shares).toFixed(4)} shares @ $
                          {parseFloat(trade.price_per_share).toFixed(2)}
                        </span>
                        <span>{formatDateTime(trade.executed_at)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sell Modal */}
      {sellModalPosition && (
        <SellModal
          position={sellModalPosition}
          onClose={() => setSellModalPosition(null)}
          onSuccess={() => {
            setSellModalPosition(null);
            fetchPositions();
          }}
        />
      )}
    </div>
  );
}
