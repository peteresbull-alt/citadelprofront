"use client";

import React from "react";
import { Activity, Target, TrendingUp, Shield } from "lucide-react";
import { PurchasedSignal } from "./signal-types";

interface PurchasedSignalCardProps {
  purchase: PurchasedSignal;
}

export default function PurchasedSignalCard({
  purchase,
}: PurchasedSignalCardProps) {
  const getActionColor = (action: string) => {
    const upperAction = action.toUpperCase();
    if (upperAction.includes("BUY")) return "text-emerald-500";
    if (upperAction.includes("SELL")) return "text-red-500";
    return "text-yellow-500";
  };

  return (
    <div className="bg-[#151922] dark:bg-white rounded-2xl p-6 border-2 border-emerald-500 dark:border-emerald-600">
      {/* Signal Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-bold text-emerald-500 dark:text-emerald-600 mb-2">
            {purchase.signal.name}
          </h3>
          <p className="text-sm text-gray-400 dark:text-gray-600">
            Purchased: {new Date(purchase.purchased_at).toLocaleDateString()}
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400 dark:text-gray-600 mb-1">
            Amount Paid
          </div>
          <div className="text-xl font-bold text-white dark:text-gray-900">
            $
            {parseFloat(purchase.amount_paid).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
      </div>

      {/* Market Analysis */}
      <div className="bg-gray-800/50 dark:bg-gray-100 rounded-lg p-4 mb-4">
        <h4 className="text-emerald-500 dark:text-emerald-600 font-semibold mb-2 flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Market Analysis
        </h4>
        <p className="text-gray-300 dark:text-gray-700 text-sm leading-relaxed">
          {purchase.signal.market_analysis}
        </p>
      </div>

      {/* Trading Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-gray-800/50 dark:bg-gray-100 rounded-lg p-4">
          <div className="flex items-center gap-2 text-emerald-500 dark:text-emerald-600 mb-2">
            <Target className="w-4 h-4" />
            <span className="text-sm font-semibold">Entry Point</span>
          </div>
          <p className="text-white dark:text-gray-900 font-medium">
            {purchase.signal.entry_point}
          </p>
        </div>

        <div className="bg-gray-800/50 dark:bg-gray-100 rounded-lg p-4">
          <div className="flex items-center gap-2 text-emerald-500 dark:text-emerald-600 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold">Target Price</span>
          </div>
          <p className="text-white dark:text-gray-900 font-medium">
            {purchase.signal.target_price}
          </p>
        </div>

        <div className="bg-gray-800/50 dark:bg-gray-100 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-500 dark:text-red-600 mb-2">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-semibold">Stop Loss</span>
          </div>
          <p className="text-white dark:text-gray-900 font-medium">
            {purchase.signal.stop_loss}
          </p>
        </div>
      </div>

      {/* Technical & Fundamental Analysis */}
      {purchase.signal.technical_indicators && (
        <div className="bg-gray-800/50 dark:bg-gray-100 rounded-lg p-4 mb-4">
          <h4 className="text-emerald-500 dark:text-emerald-600 font-semibold mb-2">
            Technical Indicators
          </h4>
          <p className="text-gray-300 dark:text-gray-700 text-sm">
            {purchase.signal.technical_indicators}
          </p>
        </div>
      )}

      {purchase.signal.fundamental_analysis && (
        <div className="bg-gray-800/50 dark:bg-gray-100 rounded-lg p-4">
          <h4 className="text-emerald-500 dark:text-emerald-600 font-semibold mb-2">
            Fundamental Analysis
          </h4>
          <p className="text-gray-300 dark:text-gray-700 text-sm">
            {purchase.signal.fundamental_analysis}
          </p>
        </div>
      )}

      {/* Signal Stats */}
      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-700 dark:border-gray-300">
        <div className="text-center">
          <div className="text-emerald-500 dark:text-emerald-600 text-2xl font-bold">
            {parseFloat(purchase.signal.signal_strength).toFixed(0)}%
          </div>
          <div className="text-gray-400 dark:text-gray-600 text-xs">
            Signal Strength
          </div>
        </div>
        <div className="text-center">
          <div
            className={`text-2xl font-bold ${getActionColor(
              purchase.signal.action
            )}`}
          >
            {purchase.signal.action}
          </div>
          <div className="text-gray-400 dark:text-gray-600 text-xs">Action</div>
        </div>
        <div className="text-center">
          <div className="text-white dark:text-gray-900 text-lg font-bold">
            {purchase.signal.timeframe}
          </div>
          <div className="text-gray-400 dark:text-gray-600 text-xs">
            Timeframe
          </div>
        </div>
      </div>
    </div>
  );
}
