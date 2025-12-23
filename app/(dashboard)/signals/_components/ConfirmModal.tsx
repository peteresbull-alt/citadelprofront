"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { PulseLoader } from "react-spinners";
import { Signal } from "./signal-types";

interface ConfirmModalProps {
  signal: Signal;
  userBalance: number;
  purchasing: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  signal,
  userBalance,
  purchasing,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-[#151922] dark:bg-white rounded-2xl max-w-md w-full p-6">
        <div className="text-center mb-6">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white dark:text-gray-900 mb-2">
            Confirm Purchase
          </h3>
          <p className="text-gray-400 dark:text-gray-600">
            Are you sure you want to purchase this signal?
          </p>
        </div>

        <div className="bg-gray-800/50 dark:bg-gray-100 rounded-lg p-4 mb-6 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400 dark:text-gray-600">Signal:</span>
            <span className="text-white dark:text-gray-900 font-semibold">
              {signal.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 dark:text-gray-600">Amount:</span>
            <span className="text-white dark:text-gray-900 font-semibold">
              $
              {parseFloat(signal.price).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t border-gray-700 dark:border-gray-300">
            <span className="text-gray-400 dark:text-gray-600">
              New Balance:
            </span>
            <span className="text-emerald-500 dark:text-emerald-600 font-semibold">
              $
              {(userBalance - parseFloat(signal.price)).toLocaleString(
                undefined,
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={purchasing}
            className="flex-1 py-3 bg-gray-700 dark:bg-gray-300 hover:bg-gray-600 dark:hover:bg-gray-400 text-white dark:text-gray-900 rounded-lg font-semibold transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={purchasing}
            className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {purchasing ? (
              <>
                <PulseLoader color="#fff" size={8} />
                <span>Processing...</span>
              </>
            ) : (
              "Confirm Purchase"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
