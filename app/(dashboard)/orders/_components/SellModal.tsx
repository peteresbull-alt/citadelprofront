"use client";

import { useState, useEffect } from "react";
import {
  X,
  Loader2,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Info,
} from "lucide-react";
import { BACKEND_URL } from "@/lib/constants";
import { toast } from "sonner";

interface Position {
  id: number;
  stock: {
    symbol: string;
    name: string;
    price: string;
  };
  shares: string;
  average_buy_price: string;
  current_value: string;
  profit_loss: string;
  profit_loss_percent: string;
  total_invested: string;
  use_admin_profit?: boolean;
  admin_profit_loss?: string;
}

interface SellModalProps {
  position: Position;
  onClose: () => void;
  onSuccess: () => void;
}

export default function SellModal({
  position,
  onClose,
  onSuccess,
}: SellModalProps) {
  const [shares, setShares] = useState("");
  const [processing, setProcessing] = useState(false);

  const availableShares = parseFloat(position.shares);
  const currentPrice = parseFloat(position.stock.price);
  const sharesToSell = parseFloat(shares) || 0;
  const totalInvested = parseFloat(position.total_invested);
  const averageBuyPrice = parseFloat(position.average_buy_price);

  // Calculate values based on whether admin profit is being used
  let estimatedValue = 0;
  let costBasis = 0;
  let estimatedPL = 0;
  let plPercent = 0;

  if (position.use_admin_profit && position.admin_profit_loss) {
    // Use admin-set profit/loss
    const totalAdminPL = parseFloat(position.admin_profit_loss);
    const proportion = sharesToSell / availableShares;

    if (sharesToSell === availableShares) {
      // Selling all shares
      estimatedValue = totalInvested + totalAdminPL;
      costBasis = totalInvested;
      estimatedPL = totalAdminPL;
    } else {
      // Partial sale
      costBasis = totalInvested * proportion;
      estimatedPL = totalAdminPL * proportion;
      estimatedValue = costBasis + estimatedPL;
    }

    plPercent = costBasis > 0 ? (estimatedPL / costBasis) * 100 : 0;
  } else {
    // Calculate based on current market price
    estimatedValue = sharesToSell * currentPrice;
    costBasis = sharesToSell * averageBuyPrice;
    estimatedPL = estimatedValue - costBasis;
    plPercent = costBasis > 0 ? (estimatedPL / costBasis) * 100 : 0;
  }

  const isProfitable = estimatedPL >= 0;

  const handleSellAll = () => {
    setShares(position.shares);
  };

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
        body: JSON.stringify({
          symbol: position.stock.symbol,
          shares: shares,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        onSuccess();
      } else {
        toast.error(data.error || "Failed to sell stock");
      }
    } catch (error) {
      console.error("Error selling stock:", error);
      toast.error("An error occurred while selling stock");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-[#151922] dark:bg-white rounded-lg w-full max-w-md p-4 sm:p-6 border-2 border-gray-800 dark:border-gray-200 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-white dark:text-gray-900 truncate pr-2">
            Sell {position.stock.symbol}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-gray-900 transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Admin Profit Badge */}
        {/* {position.use_admin_profit && (
          <div className="bg-blue-500/10 dark:bg-blue-50 border border-blue-500/30 dark:border-blue-200 rounded-lg p-2.5 sm:p-3 mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 dark:text-blue-600 flex-shrink-0" />
              <p className="text-[11px] sm:text-xs text-blue-400 dark:text-blue-600">
                This position uses admin-managed profit/loss
              </p>
            </div>
          </div>
        )} */}

        {/* Warning */}
        <div className="bg-red-500/10 dark:bg-red-50 border border-red-500/30 dark:border-red-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex items-start gap-2 sm:gap-3">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 dark:text-red-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-red-400 dark:text-red-600">
              <p className="font-semibold mb-1">Important</p>
              <p>
                This action will sell your shares
                {position.use_admin_profit
                  ? " with the current profit/loss values"
                  : " at the current market price"}
                . Make sure you want to proceed.
              </p>
            </div>
          </div>
        </div>

        {/* Stock Info */}
        <div className="bg-[#0d1117] dark:bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex justify-between items-center mb-2 sm:mb-3">
            <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-600">
              Stock
            </span>
            <span className="text-sm sm:text-base text-white dark:text-gray-900 font-semibold">
              {position.stock.symbol}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2 sm:mb-3">
            <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-600">
              {position.use_admin_profit
                ? "Average Buy Price"
                : "Current Price"}
            </span>
            <span className="text-sm sm:text-base text-white dark:text-gray-900 font-semibold">
              $
              {position.use_admin_profit
                ? averageBuyPrice.toFixed(2)
                : currentPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-600">
              Available Shares
            </span>
            <span className="text-sm sm:text-base text-white dark:text-gray-900 font-semibold">
              {availableShares.toFixed(4)}
            </span>
          </div>
        </div>

        {/* Shares Input */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-gray-400 dark:text-gray-600 text-xs sm:text-sm mb-2">
            Shares to Sell
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={shares}
              onChange={(e) => setShares(e.target.value)}
              max={availableShares}
              step="0.0001"
              placeholder="0.0000"
              className="flex-1 min-w-0 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-[#0d1117] dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg border-2 border-gray-800 dark:border-gray-300 focus:border-green-500 focus:outline-none"
            />
            <button
              onClick={handleSellAll}
              className="px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-800 hover:bg-gray-700 dark:bg-gray-200 dark:hover:bg-gray-300 text-white dark:text-gray-900 rounded-lg font-medium transition-colors flex-shrink-0"
            >
              Max
            </button>
          </div>
        </div>

        {/* Sale Summary */}
        {sharesToSell > 0 && (
          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            {/* Breakdown Section */}
            <div className="bg-[#0d1117] dark:bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
              <h4 className="text-xs sm:text-sm font-semibold text-white dark:text-gray-900 mb-2 sm:mb-3">
                Sale Breakdown
              </h4>

              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-600">
                  Shares Selling
                </span>
                <span className="text-xs sm:text-sm text-white dark:text-gray-900 font-semibold">
                  {sharesToSell.toFixed(4)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-600">
                  Your Cost Basis
                </span>
                <span className="text-xs sm:text-sm text-white dark:text-gray-900 font-semibold">
                  ${costBasis.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-800 dark:border-gray-300">
                <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-600">
                  You Will Receive
                </span>
                <span className="text-base sm:text-lg text-white dark:text-gray-900 font-bold">
                  ${estimatedValue.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Profit/Loss Section */}
            <div
              className={`rounded-lg p-3 sm:p-4 border-2 ${
                isProfitable
                  ? "bg-green-500/10 dark:bg-green-50 border-green-500/30 dark:border-green-200"
                  : "bg-red-500/10 dark:bg-red-50 border-red-500/30 dark:border-red-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                {isProfitable ? (
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                ) : (
                  <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />
                )}
                <span className="text-xs sm:text-sm font-semibold text-gray-400 dark:text-gray-600">
                  {isProfitable ? "Expected Profit" : "Expected Loss"}
                </span>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex justify-between items-baseline gap-2">
                  <span
                    className={`text-xl sm:text-2xl font-bold ${
                      isProfitable ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {isProfitable ? "+" : ""}${Math.abs(estimatedPL).toFixed(2)}
                  </span>
                  <span
                    className={`text-base sm:text-lg font-semibold ${
                      isProfitable ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {isProfitable ? "+" : ""}
                    {plPercent.toFixed(2)}%
                  </span>
                </div>

                <div className="text-[11px] sm:text-xs text-gray-400 dark:text-gray-600">
                  {isProfitable
                    ? `You're making a profit of $${Math.abs(
                        estimatedPL
                      ).toFixed(2)} on this sale`
                    : `You're taking a loss of $${Math.abs(estimatedPL).toFixed(
                        2
                      )} on this sale`}
                </div>
              </div>
            </div>

            {/* Remaining Position Info */}
            {sharesToSell < availableShares && (
              <div className="bg-[#0d1117] dark:bg-gray-50 rounded-lg p-3 sm:p-4">
                <h4 className="text-xs sm:text-sm font-semibold text-white dark:text-gray-900 mb-2 sm:mb-3">
                  After Sale
                </h4>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-600">
                    Remaining Shares
                  </span>
                  <span className="text-xs sm:text-sm text-white dark:text-gray-900 font-semibold">
                    {(availableShares - sharesToSell).toFixed(4)}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            onClick={onClose}
            disabled={processing}
            className="w-full sm:flex-1 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-800 hover:bg-gray-700 dark:bg-gray-200 dark:hover:bg-gray-300 disabled:bg-gray-700 disabled:cursor-not-allowed text-white dark:text-gray-900 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSell}
            disabled={processing || !shares || parseFloat(shares) <= 0}
            className="w-full sm:flex-1 py-2.5 sm:py-3 text-sm sm:text-base bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            {processing ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                <span>Selling...</span>
              </>
            ) : (
              <>
                <span>Confirm Sale</span>
                {sharesToSell > 0 && (
                  <span className="text-xs sm:text-sm opacity-80">
                    (${estimatedValue.toFixed(2)})
                  </span>
                )}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
