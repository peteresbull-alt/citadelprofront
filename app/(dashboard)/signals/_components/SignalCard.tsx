"use client";

import React from "react";
import { CheckCircle } from "lucide-react";
import { Signal } from "./signal-types";

interface SignalCardProps {
  signal: Signal;
  onPurchaseClick: (signal: Signal) => void;
}

export default function SignalCard({
  signal,
  onPurchaseClick,
}: SignalCardProps) {
  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "low":
        return "text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/20";
      case "medium":
        return "text-yellow-500 bg-yellow-500/10 dark:bg-yellow-500/20";
      case "high":
        return "text-red-500 bg-red-500/10 dark:bg-red-500/20";
      default:
        return "text-gray-500 bg-gray-500/10 dark:bg-gray-500/20";
    }
  };

  const getActionColor = (action: string) => {
    const upperAction = action.toUpperCase();
    if (upperAction.includes("BUY")) return "text-emerald-500";
    if (upperAction.includes("SELL")) return "text-red-500";
    return "text-yellow-500";
  };

  return (
    <div className="bg-[#151922] dark:bg-white rounded-2xl p-6 border-2 border-gray-700 dark:border-gray-300 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold text-emerald-500 dark:text-emerald-600 mb-1">
            {signal.name}
          </h3>
          <p className="text-sm text-gray-400 dark:text-gray-600">
            {signal.signal_type.charAt(0).toUpperCase() +
              signal.signal_type.slice(1)}
          </p>
        </div>
        {signal.is_purchased && (
          <div className="bg-emerald-500/20 px-3 py-1 rounded-full">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <div className="text-sm text-gray-400 dark:text-gray-600 mb-1">
            Signal Price
          </div>
          <div className="text-2xl font-bold text-white dark:text-gray-900">
            $
            {parseFloat(signal.price).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-400 dark:text-gray-600 mb-1">
            Signal Strength
          </div>
          <div className="text-2xl font-bold text-emerald-500 dark:text-emerald-600">
            {parseFloat(signal.signal_strength).toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 dark:text-gray-600 text-sm">
            Action
          </span>
          <span className={`font-semibold ${getActionColor(signal.action)}`}>
            {signal.action}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400 dark:text-gray-600 text-sm">
            Risk Level
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(
              signal.risk_level
            )}`}
          >
            {signal.risk_level.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400 dark:text-gray-600 text-sm">
            Timeframe
          </span>
          <span className="text-white dark:text-gray-900 font-medium text-sm">
            {signal.timeframe}
          </span>
        </div>
      </div>

      {/* Purchase Button */}
      <button
        onClick={() => onPurchaseClick(signal)}
        disabled={signal.is_purchased}
        className={`w-full py-3 rounded-lg font-semibold transition-all ${
          signal.is_purchased
            ? "bg-gray-600 dark:bg-gray-300 text-gray-400 dark:text-gray-600 cursor-not-allowed"
            : "bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white"
        }`}
      >
        {signal.is_purchased ? "Already Purchased" : "Purchase Signal"}
      </button>
    </div>
  );
}
