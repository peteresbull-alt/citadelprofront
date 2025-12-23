"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardNavbar from "@/components/main/DashboardNavbar";
import { Loader2, TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { BACKEND_URL } from "@/lib/constants";
import PositionCard from "./_components/PositionCard";

interface Position {
  id: number;
  stock: {
    id: number;
    symbol: string;
    name: string;
    price: string;
    logo_url: string;
  };
  shares: string;
  average_buy_price: string;
  total_invested: string;
  current_value: string;
  profit_loss: string;
  profit_loss_percent: string;
  opened_at: string;
  is_active: boolean;
}

interface PositionSummary {
  total_invested: string;
  total_current_value: string;
  total_profit_loss: string;
  total_profit_loss_percent: string;
}

export default function PositionsPage() {
  const router = useRouter();
  const [positions, setPositions] = useState<Position[]>([]);
  const [summary, setSummary] = useState<PositionSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPositions();
  }, []);

  const fetchPositions = async (isRefresh = false) => {
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

      const response = await fetch(
        `${BACKEND_URL}/stocks/positions/list/?active_only=true`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setPositions(data.positions);
        setSummary(data.summary);
      } else {
        console.error("Failed to fetch positions:", data.error);
      }
    } catch (error) {
      console.error("Error fetching positions:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handlePositionUpdate = () => {
    fetchPositions(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1f2e] dark:bg-gray-50 pt-20 flex items-center justify-center">
        <DashboardNavbar />
        <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
      </div>
    );
  }

  const totalProfitLoss = summary ? parseFloat(summary.total_profit_loss) : 0;
  const totalProfitLossPercent = summary
    ? parseFloat(summary.total_profit_loss_percent)
    : 0;
  const isPositive = totalProfitLoss >= 0;

  return (
    <div className="min-h-screen bg-[#1a1f2e] dark:bg-gray-50 transition-colors pt-20">
      <DashboardNavbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white dark:text-gray-900 mb-2">
              Stock Positions
            </h1>
            <p className="text-gray-400 dark:text-gray-600">
              Track all your active trading positions
            </p>
          </div>

          <button
            onClick={() => fetchPositions(true)}
            disabled={refreshing}
            className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            <RefreshCw
              className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`}
            />
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* Summary Cards */}
        {summary && positions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Total Invested */}
            <div className="bg-[#151922] dark:bg-white p-6 rounded-lg border-2 border-gray-800 dark:border-gray-200">
              <div className="text-gray-400 dark:text-gray-600 text-sm mb-2">
                Total Invested
              </div>
              <div className="text-2xl font-bold text-white dark:text-gray-900">
                ${parseFloat(summary.total_invested).toFixed(2)}
              </div>
            </div>

            {/* Current Value */}
            <div className="bg-[#151922] dark:bg-white p-6 rounded-lg border-2 border-gray-800 dark:border-gray-200">
              <div className="text-gray-400 dark:text-gray-600 text-sm mb-2">
                Current Value
              </div>
              <div className="text-2xl font-bold text-white dark:text-gray-900">
                ${parseFloat(summary.total_current_value).toFixed(2)}
              </div>
            </div>

            {/* Total P/L */}
            <div className="bg-[#151922] dark:bg-white p-6 rounded-lg border-2 border-gray-800 dark:border-gray-200">
              <div className="text-gray-400 dark:text-gray-600 text-sm mb-2 flex items-center gap-2">
                {isPositive ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                Total P/L
              </div>
              <div
                className={`text-2xl font-bold ${
                  isPositive ? "text-green-500" : "text-red-500"
                }`}
              >
                {isPositive ? "+" : ""}${Math.abs(totalProfitLoss).toFixed(2)}
                <span className="text-lg ml-2">
                  ({isPositive ? "+" : ""}
                  {totalProfitLossPercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Positions List */}
        {positions.length > 0 ? (
          <div className="space-y-4">
            {positions
              .filter((p) => p.stock && p.stock.symbol)
              .map((position) => (
                <PositionCard
                  key={position.id}
                  position={position}
                  onUpdate={handlePositionUpdate}
                />
              ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-[#151922] dark:bg-white p-12 rounded-lg border-2 border-gray-800 dark:border-gray-200">
              <TrendingUp className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white dark:text-gray-900 mb-2">
                No Active Positions
              </h3>
              <p className="text-gray-400 dark:text-gray-600 mb-6">
                Start trading to see your positions here
              </p>
              <button
                onClick={() => router.push("/stock")}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
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
