"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, ChevronDown, ChevronUp, Info } from "lucide-react";
import { BACKEND_URL } from "@/lib/constants";
import { toast } from "sonner";
import SellModal from "./SellModal";

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
  use_admin_profit?: boolean;
  admin_profit_loss?: string;
}

interface PositionCardProps {
  position: Position;
  onUpdate: () => void;
}

export default function PositionCard({
  position,
  onUpdate,
}: PositionCardProps) {
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);

  // Safety check for position.stock
  if (!position.stock || !position.stock.symbol) {
    console.error("Invalid position data:", position);
    return null;
  }

  const profitLoss = parseFloat(position.profit_loss || "0");
  const profitLossPercent = parseFloat(position.profit_loss_percent || "0");
  const isPositive = profitLoss >= 0;
  const currentPrice = parseFloat(position.stock.price || "0");
  const shares = parseFloat(position.shares || "0");
  const averageBuyPrice = parseFloat(position.average_buy_price || "0");

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "2-digit",
      });
    } catch {
      return "N/A";
    }
  };

  return (
    <>
      <div className="bg-[#151922] dark:bg-white rounded-lg border-2 border-gray-800 dark:border-gray-200 overflow-hidden">
        {/* Admin Profit Badge (if applicable) */}
        {/* {position.use_admin_profit && (
          <div className="bg-blue-500/10 dark:bg-blue-50 border-b-2 border-blue-500/30 dark:border-blue-200 px-4 py-2">
            <div className="flex items-center gap-2 text-blue-400 dark:text-blue-600">
              <Info className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs font-medium">
                Admin-managed profit/loss values
              </span>
            </div>
          </div>
        )} */}

        {/* Main Card Content */}
        <div className="p-3 sm:p-4 lg:p-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-start justify-between mb-3 sm:mb-4 gap-3">
            <div className="flex items-center gap-3 sm:gap-4 flex-1 w-full sm:w-auto">
              {/* Stock Logo */}
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 relative rounded-full overflow-hidden bg-white cursor-pointer flex-shrink-0"
                onClick={() => router.push(`/stock/${position.stock.symbol}`)}
              >
                {position.stock.logo_url ? (
                  <Image
                    src={position.stock.logo_url}
                    alt={position.stock.name || position.stock.symbol}
                    fill
                    className="object-contain p-1.5 sm:p-2"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 font-bold text-base sm:text-lg lg:text-xl">
                    {position.stock.symbol?.charAt(0) || "?"}
                  </div>
                )}
              </div>

              {/* Stock Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 mb-1 flex-wrap">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white dark:text-gray-900">
                    {position.stock.symbol}
                  </h3>
                  <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-600">
                    Buy ${averageBuyPrice.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-600 truncate">
                  {position.stock.name || position.stock.symbol}
                </p>
              </div>
            </div>

            {/* Sell Order Button */}
            <button
              onClick={() => setShowSellModal(true)}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 text-sm sm:text-base bg-red-500/20 hover:bg-red-500/30 dark:bg-red-100 dark:hover:bg-red-200 text-red-400 dark:text-red-600 rounded-lg font-medium transition-colors border-2 border-red-500/40 dark:border-red-300 flex-shrink-0"
            >
              Sell Order
            </button>
          </div>

          {/* P/L Display */}
          <div className="mb-3 sm:mb-4">
            <div
              className={`text-2xl sm:text-3xl font-bold ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {isPositive ? "+" : ""}${Math.abs(profitLoss).toFixed(2)}{" "}
              <span className="text-base sm:text-lg">
                ({isPositive ? "+" : ""}
                {profitLossPercent.toFixed(2)}% P/L)
              </span>
            </div>
            {/* {position.use_admin_profit && (
              <div className="mt-2 text-xs text-blue-400 dark:text-blue-600 flex items-center gap-1">
                <span className="w-2 h-2 bg-blue-400 dark:bg-blue-600 rounded-full"></span>
                Managed by admin
              </div>
            )} */}
          </div>

          {/* Three Column Layout - Stacks on mobile */}
          <div className="flex flex-col sm:grid sm:grid-cols-3 gap-4 sm:gap-4 pt-3 sm:pt-4 border-t-2 border-gray-800 dark:border-gray-200">
            {/* TRADE Column */}
            <div className="pb-3 sm:pb-0 border-b sm:border-b-0 border-gray-800 dark:border-gray-200">
              <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">
                TRADE
              </div>
              <div className="space-y-1">
                <div className="text-white dark:text-gray-900 font-bold text-base sm:text-lg">
                  {position.stock.symbol}
                </div>
                <div className="text-gray-400 dark:text-gray-600 text-xs sm:text-sm">
                  {formatDate(position.opened_at)}
                </div>
                <div className="text-green-500 font-medium text-xs sm:text-sm">
                  BUY {shares.toFixed(4)} at ${averageBuyPrice.toFixed(2)}
                </div>
              </div>
            </div>

            {/* COMMISSION Column */}
            <div className="pb-3 sm:pb-0 border-b sm:border-b-0 border-gray-800 dark:border-gray-200">
              <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">
                COMMISSION
              </div>
              <div className="text-white dark:text-gray-900 font-medium text-sm sm:text-base">
                $0.00
              </div>
            </div>

            {/* AMOUNT/P&L Column */}
            <div className="sm:text-right">
              <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">
                AMOUNT/P&L
              </div>
              <div className="space-y-1">
                <div className="text-gray-400 dark:text-gray-600 text-xs sm:text-sm">
                  {formatDate(position.opened_at)}
                </div>
                <div className="text-white dark:text-gray-900 font-bold text-lg sm:text-xl">
                  ${parseFloat(position.current_value || "0").toFixed(2)}
                </div>
                <div
                  className={`font-bold text-sm sm:text-base ${
                    isPositive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {profitLoss.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {/* Toggle Details Button */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full mt-3 sm:mt-4 flex items-center justify-center gap-2 text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-gray-900 transition-colors py-2"
          >
            {showDetails ? (
              <>
                <span className="text-xs sm:text-sm">Hide Details</span>
                <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </>
            ) : (
              <>
                <span className="text-xs sm:text-sm">Show Details</span>
                <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </>
            )}
          </button>
        </div>

        {/* Expandable Details Section */}
        {showDetails && (
          <div className="bg-[#0d1117] dark:bg-gray-50 p-3 sm:p-4 lg:p-6 border-t-2 border-gray-800 dark:border-gray-200">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div>
                <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-500 uppercase mb-1 sm:mb-2">
                  Shares Owned
                </div>
                <div className="text-white dark:text-gray-900 font-semibold text-sm sm:text-base">
                  {shares.toFixed(4)}
                </div>
              </div>

              <div>
                <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-500 uppercase mb-1 sm:mb-2">
                  Avg Buy Price
                </div>
                <div className="text-white dark:text-gray-900 font-semibold text-sm sm:text-base">
                  ${averageBuyPrice.toFixed(2)}
                </div>
              </div>

              <div>
                <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-500 uppercase mb-1 sm:mb-2">
                  Current Price
                </div>
                <div className="text-white dark:text-gray-900 font-semibold text-sm sm:text-base">
                  ${currentPrice.toFixed(2)}
                </div>
              </div>

              <div>
                <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-500 uppercase mb-1 sm:mb-2">
                  Total Invested
                </div>
                <div className="text-white dark:text-gray-900 font-semibold text-sm sm:text-base">
                  ${parseFloat(position.total_invested || "0").toFixed(2)}
                </div>
              </div>
            </div>

            {position.use_admin_profit && (
              <div className="mt-4 p-3 bg-blue-500/10 dark:bg-blue-50 border border-blue-500/30 dark:border-blue-200 rounded-lg">
                {/* <div className="text-xs text-blue-400 dark:text-blue-600 mb-2 font-medium">
                  📊 Admin-Managed Position
                </div> */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[10px] text-blue-400/70 dark:text-blue-600/70 uppercase mb-1">
                      Market Value
                    </div>
                    <div className="text-sm text-blue-400 dark:text-blue-600 font-medium">
                      ${(shares * currentPrice).toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-blue-400/70 dark:text-blue-600/70 uppercase mb-1">
                      Shown Value
                    </div>
                    <div className="text-sm text-blue-400 dark:text-blue-600 font-medium">
                      ${parseFloat(position.current_value).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => router.push(`/stock/${position.stock.symbol}`)}
              className="w-full mt-3 sm:mt-4 py-2 text-sm sm:text-base bg-gray-800 hover:bg-gray-700 dark:bg-gray-200 dark:hover:bg-gray-300 text-white dark:text-gray-900 rounded-lg font-medium transition-colors"
            >
              View Stock Details
            </button>
          </div>
        )}
      </div>

      {/* Sell Modal */}
      {showSellModal && (
        <SellModal
          position={position}
          onClose={() => setShowSellModal(false)}
          onSuccess={() => {
            setShowSellModal(false);
            onUpdate();
          }}
        />
      )}
    </>
  );
}
