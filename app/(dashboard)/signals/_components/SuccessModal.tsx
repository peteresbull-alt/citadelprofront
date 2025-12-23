"use client";

import React from "react";
import {
  CheckCircle,
  Activity,
  Target,
  TrendingUp,
  Shield,
} from "lucide-react";
import { Signal } from "./signal-types";

interface SuccessModalProps {
  signal: Signal;
  onClose: () => void;
}

export default function SuccessModal({ signal, onClose }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-[#151922] dark:bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white dark:text-gray-900 mb-2">
            Signal Purchased Successfully!
          </h3>
          <p className="text-gray-400 dark:text-gray-600">
            Here&apos;s your trading signal information
          </p>
        </div>

        {/* Market Analysis */}
        <div className="bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500 rounded-lg p-4 mb-4">
          <h4 className="text-emerald-500 dark:text-emerald-600 font-semibold mb-2 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Market Analysis
          </h4>
          <p className="text-gray-300 dark:text-gray-700 text-sm leading-relaxed">
            {signal.market_analysis}
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
              {signal.entry_point}
            </p>
          </div>

          <div className="bg-gray-800/50 dark:bg-gray-100 rounded-lg p-4">
            <div className="flex items-center gap-2 text-emerald-500 dark:text-emerald-600 mb-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">Target Price</span>
            </div>
            <p className="text-white dark:text-gray-900 font-medium">
              {signal.target_price}
            </p>
          </div>

          <div className="bg-gray-800/50 dark:bg-gray-100 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-500 dark:text-red-600 mb-2">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-semibold">Stop Loss</span>
            </div>
            <p className="text-white dark:text-gray-900 font-medium">
              {signal.stop_loss}
            </p>
          </div>
        </div>

        {/* Technical Indicators */}
        {signal.technical_indicators && (
          <div className="bg-gray-800/50 dark:bg-gray-100 rounded-lg p-4 mb-4">
            <h4 className="text-emerald-500 dark:text-emerald-600 font-semibold mb-2">
              Technical Indicators
            </h4>
            <p className="text-gray-300 dark:text-gray-700 text-sm">
              {signal.technical_indicators}
            </p>
          </div>
        )}

        {/* Fundamental Analysis */}
        {signal.fundamental_analysis && (
          <div className="bg-gray-800/50 dark:bg-gray-100 rounded-lg p-4 mb-4">
            <h4 className="text-emerald-500 dark:text-emerald-600 font-semibold mb-2">
              Fundamental Analysis
            </h4>
            <p className="text-gray-300 dark:text-gray-700 text-sm">
              {signal.fundamental_analysis}
            </p>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors"
        >
          Got It!
        </button>
      </div>
    </div>
  );
}
