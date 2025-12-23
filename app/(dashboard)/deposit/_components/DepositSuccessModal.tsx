"use client";

import React from "react";
import { CheckCircle, Clock, Info } from "lucide-react";

interface DepositSuccessModalProps {
  dollarAmount: string;
  currencyAmount: string;
  currency: string;
  reference: string;
  onClose: () => void;
}

export default function DepositSuccessModal({
  dollarAmount,
  currencyAmount,
  currency,
  reference,
  onClose,
}: DepositSuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-[#151922] dark:bg-white rounded-2xl max-w-md w-full p-6">
        <div className="text-center mb-6">
          <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white dark:text-gray-900 mb-2">
            Deposit Request Submitted!
          </h3>
          <p className="text-gray-400 dark:text-gray-600">
            Your deposit is being processed
          </p>
        </div>

        {/* Transaction Details */}
        <div className="bg-emerald-500/10 dark:bg-emerald-50 border border-emerald-500/30 dark:border-emerald-200 rounded-lg p-4 mb-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400 dark:text-gray-600">Amount:</span>
            <span className="text-white dark:text-gray-900 font-semibold">
              ${parseFloat(dollarAmount).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 dark:text-gray-600">Currency:</span>
            <span className="text-white dark:text-gray-900 font-semibold">
              {currencyAmount} {currency}
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t border-emerald-500/30 dark:border-emerald-200">
            <span className="text-gray-400 dark:text-gray-600">Reference:</span>
            <span className="text-emerald-500 dark:text-emerald-600 font-semibold font-mono text-sm">
              {reference}
            </span>
          </div>
        </div>

        {/* Processing Time Info */}
        <div className="bg-blue-500/10 dark:bg-blue-50 border border-blue-500/30 dark:border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-blue-400 dark:text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-300 dark:text-gray-700 font-medium mb-1">
                Processing Time
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-600">
                Your deposit will be credited within 30 minutes to 24 hours
                after verification.
              </p>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-gray-800/50 dark:bg-gray-100 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-gray-400 dark:text-gray-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-300 dark:text-gray-700">
              You can track your deposit status in the transaction history
              section.
            </p>
          </div>
        </div>

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
