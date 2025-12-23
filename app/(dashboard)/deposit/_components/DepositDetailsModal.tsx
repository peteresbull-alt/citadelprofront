"use client";

import React, { useState, useEffect, useCallback } from "react";
import { PulseLoader } from "react-spinners";
import {
  AlertCircle,
  Clock,
  Copy,
  Check,
  Upload,
  X,
  Target,
  Shield,
} from "lucide-react";
import Image from "next/image";
import { AdminWallet } from "./deposit-types";

interface DepositDetailsModalProps {
  wallet: AdminWallet;
  dollarAmount: string;
  currencyAmount: string;
  submitting: boolean;
  onConfirm: (receipt: File) => void;
  onCancel: () => void;
}

const getCryptoIcon = (currency: string): React.ReactNode => {
  // Same icon component as above
  const CryptoIcons: Record<string, React.ReactNode> = {
    BTC: (
      <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#F7931A" />
        <path
          d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.921-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z"
          fill="white"
        />
      </svg>
    ),
    // Add other icons...
  };

  if (currency.includes("USDT")) {
    return CryptoIcons.BTC; // Use USDT icon
  }
  return CryptoIcons[currency] || CryptoIcons.BTC;
};

export default function DepositDetailsModal({
  wallet,
  dollarAmount,
  currencyAmount,
  submitting,
  onConfirm,
  onCancel,
}: DepositDetailsModalProps) {
  const [countdown, setCountdown] = useState(7200); // 2 hour
  const [copied, setCopied] = useState(false);
  const [receipt, setReceipt] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdown]);

  const formatCountdown = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(wallet.wallet_address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // File drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        setReceipt(file);
        setError("");
      } else {
        setError("Please upload an image file");
      }
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        setReceipt(file);
        setError("");
      } else {
        setError("Please upload an image file");
      }
    }
  };

  const handleSubmit = () => {
    if (!receipt) {
      setError("Please upload payment receipt");
      return;
    }
    onConfirm(receipt);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-[#151922] dark:bg-white rounded-2xl max-w-3xl w-full my-8 max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-700 dark:border-gray-300">
            <h3 className="text-2xl font-bold text-white dark:text-gray-900">
              Complete Your Deposit
            </h3>
            <button
              onClick={onCancel}
              disabled={submitting}
              className="text-gray-400 dark:text-gray-600 hover:text-gray-200 dark:hover:text-gray-900 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Order Confirmation Banner */}
          <div className="bg-blue-500/10 dark:bg-blue-50 border border-blue-500/30 dark:border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-200 dark:text-gray-800 mb-2">
              Your deposit order of{" "}
              <span className="text-blue-400 dark:text-blue-600 font-bold">
                ${dollarAmount} USD
              </span>{" "}
              has been initiated.
            </p>
            <p className="text-xs text-gray-300 dark:text-gray-700">
              Please send{" "}
              <span className="text-blue-400 dark:text-blue-600 font-bold">
                {currencyAmount} {wallet.currency}
              </span>{" "}
              to the address below.
            </p>
          </div>

          {/* Transaction Steps */}
          <div className="bg-gray-800/50 dark:bg-gray-100 rounded-lg p-5 space-y-4">
            {/* Step 1: Check Coin */}
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
                1
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400 dark:text-gray-600 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Check coin ticker
                </p>
                <div className="flex items-center gap-2 bg-gray-700/50 dark:bg-white px-4 py-2.5 rounded-md">
                  <div className="w-6 h-6">
                    {getCryptoIcon(wallet.currency)}
                  </div>
                  <span className="text-base text-white dark:text-gray-900 font-semibold">
                    {wallet.currency}
                  </span>
                </div>
              </div>
            </div>

            {/* Step 2: Check Amount */}
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
                2
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400 dark:text-gray-600 mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Check the total amount
                </p>
                <div className="bg-gray-700/50 dark:bg-white px-4 py-3 rounded-md">
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-emerald-500 dark:text-emerald-600">
                      {currencyAmount}
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-600">
                      {wallet.currency}
                    </p>
                  </div>
                  <div className="flex items-baseline gap-2 mt-2">
                    <p className="text-lg text-gray-300 dark:text-gray-700">
                      ≈ ${dollarAmount}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      USD
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Wallet Address */}
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
                3
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400 dark:text-gray-600 mb-2">
                  Send to this wallet address
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={wallet.wallet_address}
                    readOnly
                    className="flex-1 px-4 py-3 bg-gray-700/50 dark:bg-white border border-gray-700 dark:border-gray-300 rounded-lg text-gray-300 dark:text-gray-700 text-sm font-mono focus:outline-none"
                  />
                  <button
                    onClick={handleCopy}
                    className="px-4 py-3 bg-gray-700 dark:bg-gray-300 hover:bg-gray-600 dark:hover:bg-gray-400 text-white dark:text-gray-900 rounded-lg transition-all"
                  >
                    {copied ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="bg-red-500/10 dark:bg-red-50 border-2 border-red-500/40 dark:border-red-300 rounded-lg p-5">
            <div className="text-center">
              <p className="text-sm text-gray-300 dark:text-gray-700 mb-2">
                This address is valid for:
              </p>
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-6 h-6 text-red-400 dark:text-red-600 animate-pulse" />
                <p className="text-3xl font-bold text-red-400 dark:text-red-600 font-mono">
                  {formatCountdown(countdown)}
                </p>
              </div>
            </div>
          </div>

          {/* QR Code */}
          {wallet.qr_code_url && (
            <div className="flex justify-center">
              <div className="bg-white p-5 rounded-lg shadow-lg">
                <Image
                  src={wallet.qr_code_url}
                  alt={`${wallet.currency} QR Code`}
                  width={220}
                  height={220}
                  className="rounded"
                />
                <p className="text-center text-sm text-gray-600 mt-3 font-medium">
                  Scan to Pay
                </p>
              </div>
            </div>
          )}

          {/* Important Warning */}
          <div className="bg-red-500/10 dark:bg-red-50 border border-red-500/30 dark:border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 dark:text-red-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-200 dark:text-gray-800 space-y-2">
                <p className="font-semibold">
                  Important: Send exact amount only
                </p>
                <p>
                  Please send exactly{" "}
                  <span className="font-bold">{currencyAmount}</span>{" "}
                  {wallet.currency} to avoid processing delays.
                </p>
              </div>
            </div>
          </div>

          {/* Receipt Upload */}
          <div>
            <label className="block text-base font-medium text-gray-300 dark:text-gray-700 mb-2">
              Upload Payment Receipt:
            </label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
                isDragging
                  ? "border-emerald-500 bg-emerald-500/10"
                  : "border-gray-700 dark:border-gray-300 bg-gray-800/50 dark:bg-gray-100"
              }`}
            >
              <input
                type="file"
                id="receipt-upload"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />

              {receipt ? (
                <div className="space-y-2">
                  <Check className="w-12 h-12 text-emerald-500 mx-auto" />
                  <p className="text-sm text-gray-300 dark:text-gray-700">
                    {receipt.name}
                  </p>
                  <button
                    onClick={() => setReceipt(null)}
                    className="text-sm text-red-400 dark:text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label htmlFor="receipt-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                  <p className="text-base text-gray-300 dark:text-gray-700 font-medium mb-1">
                    Drop receipt here or click to browse
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    JPG, PNG, GIF (Max 10MB)
                  </p>
                </label>
              )}
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-700 dark:border-gray-300">
            <button
              onClick={onCancel}
              disabled={submitting}
              className="flex-1 py-3 bg-gray-700 dark:bg-gray-300 hover:bg-gray-600 dark:hover:bg-gray-400 text-white dark:text-gray-900 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting || !receipt}
              className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <PulseLoader color="#fff" size={8} />
                  <span>Processing...</span>
                </>
              ) : (
                "Confirm Deposit"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
