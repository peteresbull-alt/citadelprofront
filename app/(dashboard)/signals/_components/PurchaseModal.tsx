"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Signal } from "./signal-types";

interface PurchaseModalProps {
  signal: Signal;
  onSubmit: (data: { amount: string }) => void;
  onClose: () => void;
}

export default function PurchaseModal({
  signal,
  onSubmit,
  onClose,
}: PurchaseModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: signal.price,
    },
  });

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-[#151922] dark:bg-white rounded-2xl max-w-md w-full p-6">
        <h3 className="text-2xl font-bold text-white dark:text-gray-900 mb-4">
          Purchase Signal
        </h3>

        <div className="bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500 rounded-lg p-4 mb-6">
          <div className="text-emerald-500 dark:text-emerald-600 font-semibold mb-2">
            {signal.name}
          </div>
          <div className="text-2xl font-bold text-white dark:text-gray-900">
            $
            {parseFloat(signal.price).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-300 dark:text-gray-700 mb-2">
              Amount (USD)
            </label>
            <input
              type="number"
              step="0.01"
              {...register("amount", {
                required: "Amount is required",
                min: {
                  value: 0.01,
                  message: "Amount must be greater than 0",
                },
              })}
              className="w-full px-4 py-3 bg-gray-800 dark:bg-gray-100 border border-gray-700 dark:border-gray-300 rounded-lg text-white dark:text-gray-900 focus:outline-none focus:border-emerald-500"
              placeholder="0.00"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-700 dark:bg-gray-300 hover:bg-gray-600 dark:hover:bg-gray-400 text-white dark:text-gray-900 rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
