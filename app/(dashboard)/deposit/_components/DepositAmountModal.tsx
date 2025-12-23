"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { X, Info } from "lucide-react";
import { AdminWallet } from "./deposit-types";

interface DepositAmountModalProps {
  wallet: AdminWallet;
  onSubmit: (data: { dollarAmount: string; currencyAmount: string }) => void;
  onClose: () => void;
}

const getCryptoIcon = (currency: string): React.ReactNode => {
  // Reuse the same icon logic from your original component
  const CryptoIcons: Record<string, React.ReactNode> = {
    BTC: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#F7931A" />
        <path
          d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.921-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z"
          fill="white"
        />
      </svg>
    ),
    ETH: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#627EEA" />
        <path
          d="M16.498 4v8.87l7.497 3.35L16.498 4z"
          fill="white"
          fillOpacity="0.602"
        />
        <path d="M16.498 4L9 16.22l7.498-3.35V4z" fill="white" />
        <path
          d="M16.498 21.968v6.027L24 17.616l-7.502 4.352z"
          fill="white"
          fillOpacity="0.602"
        />
        <path d="M16.498 27.995v-6.028L9 17.616l7.498 10.38z" fill="white" />
        <path
          d="M16.498 20.573l7.497-4.353-7.497-3.348v7.701z"
          fill="white"
          fillOpacity="0.2"
        />
        <path
          d="M9 16.22l7.498 4.353v-7.701L9 16.22z"
          fill="white"
          fillOpacity="0.602"
        />
      </svg>
    ),
    SOL: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#14F195" />
        <path
          d="M8.5 18.5l3-3h13l-3 3h-13zm0-5l3-3h13l-3 3h-13zm13 10l3-3h-13l-3 3h13z"
          fill="#000"
        />
      </svg>
    ),
    USDT: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#26A17B" />
        <path
          d="M17.922 17.383v-.002c-.11.008-.677.042-1.942.042-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658 0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061 1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658 0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118 0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116 0-1.043-3.301-1.914-7.694-2.117"
          fill="white"
        />
      </svg>
    ),
  };

  if (currency.includes("USDT")) {
    return CryptoIcons.USDT;
  }
  return CryptoIcons[currency] || CryptoIcons.BTC;
};

export default function DepositAmountModal({
  wallet,
  onSubmit,
  onClose,
}: DepositAmountModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      dollarAmount: "",
    },
  });

  const dollarAmount = watch("dollarAmount");
  const [currencyAmount, setCurrencyAmount] = useState("");

  // Calculate currency amount when dollar amount changes
  useEffect(() => {
    if (dollarAmount && wallet) {
      const dollars = parseFloat(dollarAmount);
      const rate = parseFloat(wallet.amount);

      if (!isNaN(dollars) && !isNaN(rate) && rate > 0) {
        const units = dollars / rate;
        setCurrencyAmount(units.toFixed(8));
      } else {
        setCurrencyAmount("");
      }
    } else {
      setCurrencyAmount("");
    }
  }, [dollarAmount, wallet]);

  const handleFormSubmit = (data: { dollarAmount: string }) => {
    if (!currencyAmount) {
      return;
    }
    onSubmit({
      dollarAmount: data.dollarAmount,
      currencyAmount,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-[#151922] dark:bg-white rounded-2xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white dark:text-gray-900">
            Deposit {wallet.currency_display}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 dark:text-gray-600 hover:text-gray-200 dark:hover:text-gray-900 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Currency Info */}
        <div className="bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-800/50 dark:bg-gray-200">
              {getCryptoIcon(wallet.currency)}
            </div>
            <div>
              <div className="text-emerald-500 dark:text-emerald-600 font-semibold text-lg">
                {wallet.currency_display}
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-600">
                Rate: ${wallet.amount} per unit
              </p>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-500/10 dark:bg-blue-50 border border-blue-500/30 dark:border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-blue-400 dark:text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-300 dark:text-gray-700 mb-2">
                Don&apos;t have cryptocurrency? Purchase from:
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://www.binance.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-gray-700 dark:bg-white rounded-md text-xs text-gray-200 dark:text-gray-800 hover:bg-gray-600 dark:hover:bg-gray-100 transition-colors"
                >
                  Binance
                </a>
                <a
                  href="https://www.coinbase.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-gray-700 dark:bg-white rounded-md text-xs text-gray-200 dark:text-gray-800 hover:bg-gray-600 dark:hover:bg-gray-100 transition-colors"
                >
                  Coinbase
                </a>
                <a
                  href="https://www.crypto.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-gray-700 dark:bg-white rounded-md text-xs text-gray-200 dark:text-gray-800 hover:bg-gray-600 dark:hover:bg-gray-100 transition-colors"
                >
                  crypto.com
                </a>
                <a
                  href="https://www.robinhood.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-gray-700 dark:bg-white rounded-md text-xs text-gray-200 dark:text-gray-800 hover:bg-gray-600 dark:hover:bg-gray-100 transition-colors"
                >
                  Robinhood
                </a>
                <a
                  href="https://www.kraken.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-gray-700 dark:bg-white rounded-md text-xs text-gray-200 dark:text-gray-800 hover:bg-gray-600 dark:hover:bg-gray-100 transition-colors"
                >
                  Kraken
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-300 dark:text-gray-700 mb-2 font-medium">
              Amount (USD)
            </label>
            <input
              type="number"
              step="0.01"
              {...register("dollarAmount", {
                required: "Amount is required",
                min: {
                  value: 0.01,
                  message: "Amount must be greater than 0",
                },
              })}
              className="w-full px-4 py-3 bg-gray-800 dark:bg-gray-100 border border-gray-700 dark:border-gray-300 rounded-lg text-white dark:text-gray-900 focus:outline-none focus:border-emerald-500 text-lg font-semibold"
              placeholder="0.00"
            />
            {errors.dollarAmount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.dollarAmount.message}
              </p>
            )}
          </div>

          {/* Conversion Display */}
          {currencyAmount && dollarAmount && (
            <div className="bg-gray-800/50 dark:bg-gray-100 rounded-lg p-4 border border-gray-700 dark:border-gray-300">
              <p className="text-xs text-gray-400 dark:text-gray-600 mb-1">
                You will send:
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-emerald-500 dark:text-emerald-600">
                  {currencyAmount}
                </p>
                <p className="text-gray-400 dark:text-gray-600 font-medium">
                  {wallet.currency}
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-700 dark:bg-gray-300 hover:bg-gray-600 dark:hover:bg-gray-400 text-white dark:text-gray-900 rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!dollarAmount || !currencyAmount}
              className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
