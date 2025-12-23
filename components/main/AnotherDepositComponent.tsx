"use client";
import React, { useState, useEffect, useCallback } from "react";
import { X, Copy, Check, Upload, AlertCircle, Info, Clock } from "lucide-react";
import Image from "next/image";
import { BACKEND_URL } from "@/lib/constants";

// Types
interface AdminWallet {
  id: number;
  currency: string;
  currency_display: string;
  amount: string;
  wallet_address: string;
  qr_code: string | null;
  qr_code_url: string | null;
  is_active: boolean;
}

interface Transaction {
  id: number;
  reference: string;
  transaction_type: string;
  transaction_type_display: string;
  amount: string;
  currency: string;
  unit: string;
  status: string;
  status_display: string;
  created_at: string;
  receipt_url: string | null;
}

// Cryptocurrency Icons
const CryptoIcons: Record<string, React.ReactNode> = {
  BTC: (
    <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#F7931A" />
      <path
        d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.921-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z"
        fill="white"
      />
    </svg>
  ),
  ETH: (
    <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none">
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
    <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#14F195" />
      <path
        d="M8.5 18.5l3-3h13l-3 3h-13zm0-5l3-3h13l-3 3h-13zm13 10l3-3h-13l-3 3h13z"
        fill="#000"
      />
    </svg>
  ),
  USDT: (
    <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#26A17B" />
      <path
        d="M17.922 17.383v-.002c-.11.008-.677.042-1.942.042-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658 0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061 1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658 0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118 0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116 0-1.043-3.301-1.914-7.694-2.117"
        fill="white"
      />
    </svg>
  ),
  BNB: (
    <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#F3BA2F" />
      <path
        d="M16 6l-2.5 2.5L16 11l2.5-2.5L16 6zm-6 6l-2.5 2.5L10 17l2.5-2.5L10 12zm12 0l-2.5 2.5L22 17l2.5-2.5L22 12zm-6 2l-2.5 2.5L16 19l2.5-2.5L16 14zm0 7l-2.5 2.5L16 26l2.5-2.5L16 21z"
        fill="white"
      />
    </svg>
  ),
  TRX: (
    <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#FF060A" />
      <path d="M7 6l18 7-7 13L7 6zm11.5 8.5L12 11l-3 9 8.5-5.5z" fill="white" />
    </svg>
  ),
  USDC: (
    <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#2775CA" />
      <path
        d="M20 14c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2s.9 2 2 2h4c1.1 0 2 .9 2 2s-.9 2-2 2h-4c-1.1 0-2-.9-2-2"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <path d="M16 8v4m0 8v4" stroke="white" strokeWidth="2" />
    </svg>
  ),
};

// Get icon for currency
const getCryptoIcon = (currency: string): React.ReactNode => {
  // Handle USDT variants
  if (currency.includes("USDT")) {
    return CryptoIcons.USDT;
  }
  return CryptoIcons[currency] || CryptoIcons.BTC;
};

// Get network name from currency
const getNetworkName = (currency: string): string => {
  if (currency === "BTC") return "Bitcoin";
  if (currency === "ETH") return "ERC20";
  if (currency === "SOL") return "Solana";
  if (currency === "USDT ERC20") return "ERC20";
  if (currency === "USDT TRC20") return "TRC20";
  if (currency === "BNB") return "BSC";
  if (currency === "TRX") return "Tron";
  if (currency === "USDC") return "BASE";
  return currency;
};

export default function DepositClientComponent() {
  const [wallets, setWallets] = useState<AdminWallet[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<AdminWallet | null>(
    null
  );
  const [dollarAmount, setDollarAmount] = useState("");
  const [currencyAmount, setCurrencyAmount] = useState("");
  const [receipt, setReceipt] = useState<File | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [countdown, setCountdown] = useState(3600); // 1 hour in seconds
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Fetch deposit options on mount
  useEffect(() => {
    fetchDepositOptions();
    fetchTransactionHistory();
  }, []);

  // Countdown timer effect
  useEffect(() => {
    if (selectedWallet && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [selectedWallet, countdown]);

  // Format countdown as HH:MM:SS
  const formatCountdown = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const fetchDepositOptions = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/deposits/options/`);
      const data = await response.json();

      if (data.success) {
        setWallets(data.wallets);
      } else {
        setError(data.error || "Failed to load deposit options");
      }
    } catch (err) {
      console.error("Error fetching deposit options:", err);
      setError("Failed to connect to server");
    }
  };

  const fetchTransactionHistory = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const response = await fetch(
        `${BACKEND_URL}/deposits/history/?limit=10`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      const data = await response.json();

      if (data.success) {
        setTransactions(data.transactions);
      }
    } catch (err) {
      console.error("Error fetching transaction history:", err);
    }
  };

  // Calculate currency amount when dollar amount changes
  useEffect(() => {
    if (dollarAmount && selectedWallet) {
      const dollars = parseFloat(dollarAmount);
      const rate = parseFloat(selectedWallet.amount);

      if (!isNaN(dollars) && !isNaN(rate) && rate > 0) {
        const units = dollars / rate;
        setCurrencyAmount(units.toFixed(8));
      } else {
        setCurrencyAmount("");
      }
    } else {
      setCurrencyAmount("");
    }
  }, [dollarAmount, selectedWallet]);

  const handleCopy = () => {
    if (selectedWallet) {
      navigator.clipboard.writeText(selectedWallet.wallet_address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDeposit = (wallet: AdminWallet) => {
    setSelectedWallet(wallet);
    setDollarAmount("");
    setCurrencyAmount("");
    setReceipt(null);
    setError("");
    setSuccess("");
    setCountdown(3600); // Reset countdown to 1 hour
    setOrderPlaced(false);
  };

  const closeModal = () => {
    setSelectedWallet(null);
    setDollarAmount("");
    setCurrencyAmount("");
    setReceipt(null);
    setError("");
    setSuccess("");
    setCountdown(3600);
    setOrderPlaced(false);
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

  const handleConfirmDeposit = async () => {
    if (!selectedWallet || !dollarAmount || !currencyAmount || !receipt) {
      setError("Please fill all fields and upload receipt");
      return;
    }

    const dollars = parseFloat(dollarAmount);
    if (isNaN(dollars) || dollars <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Please login to make a deposit");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("currency", selectedWallet.currency);
      formData.append("dollar_amount", dollarAmount);
      formData.append("currency_unit", currencyAmount);
      formData.append("receipt", receipt);

      const response = await fetch(`${BACKEND_URL}/deposits/create/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("Deposit request submitted successfully!");
        setTimeout(() => {
          closeModal();
          fetchTransactionHistory(); // Refresh transaction list
        }, 2000);
      } else {
        setError(data.error || "Failed to submit deposit");
      }
    } catch (err) {
      console.error("Error submitting deposit:", err);
      setError("Failed to submit deposit request");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "successful":
      case "completed":
        return "bg-green-500/20 dark:bg-green-100 text-green-400 dark:text-green-600";
      case "failed":
        return "bg-red-500/20 dark:bg-red-100 text-red-400 dark:text-red-600";
      default:
        return "bg-yellow-500/20 dark:bg-yellow-100 text-yellow-400 dark:text-yellow-600";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-20 bg-[#061124] dark:bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Payment Methods */}
        <div className="bg-slate-800/40 dark:bg-white border border-slate-700/40 dark:border-slate-200 rounded-xl sm:rounded-2xl p-5 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 dark:text-slate-900 mb-6 sm:mb-8">
            Choose Method of Payment
          </h2>

          {wallets.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400 dark:text-slate-600">
                No deposit options available at this time
              </p>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-5">
              {wallets.map((wallet) => (
                <div
                  key={wallet.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 p-4 sm:p-5 bg-slate-900/40 dark:bg-slate-50 border border-slate-700/40 dark:border-slate-200 rounded-xl hover:border-slate-600/60 dark:hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-700/50 dark:bg-slate-200">
                      {getCryptoIcon(wallet.currency)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-lg font-semibold text-slate-100 dark:text-slate-900">
                        {wallet.currency_display}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-600">
                        {getNetworkName(wallet.currency)} Network
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                        Rate: ${wallet.amount} per unit
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col-reverse md:flex-row md:items-center gap-3 sm:gap-6">
                    <div className="text-xs sm:text-sm text-slate-300 dark:text-slate-600 space-y-1">
                      <p>Processing Time: Instant - 30 minutes</p>
                      <p>Fee: 0%</p>
                    </div>
                    <button
                      onClick={() => handleDeposit(wallet)}
                      className="bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all whitespace-nowrap shadow-lg"
                    >
                      Deposit {wallet.currency}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Latest Deposits Table */}
        <div className="bg-slate-800/40 dark:bg-white border border-slate-700/40 dark:border-slate-200 rounded-xl sm:rounded-2xl p-5 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 dark:text-slate-900 mb-6 sm:mb-8">
            Latest Deposits
          </h2>

          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <Info className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400 dark:text-slate-600">
                No deposit transactions yet
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700/40 dark:border-slate-200">
                      <th className="text-left py-4 px-4 text-sm font-semibold text-slate-400 dark:text-slate-600 uppercase tracking-wider">
                        Reference
                      </th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-slate-400 dark:text-slate-600 uppercase tracking-wider">
                        Date/Time
                      </th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-slate-400 dark:text-slate-600 uppercase tracking-wider">
                        Currency
                      </th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-slate-400 dark:text-slate-600 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-slate-400 dark:text-slate-600 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="border-b border-slate-700/20 dark:border-slate-100 hover:bg-slate-900/20 dark:hover:bg-slate-50 transition-colors"
                      >
                        <td className="py-5 px-4 text-sm text-slate-300 dark:text-slate-700 font-medium">
                          {transaction.reference}
                        </td>
                        <td className="py-5 px-4 text-sm text-slate-300 dark:text-slate-700">
                          {formatDate(transaction.created_at)}
                        </td>
                        <td className="py-5 px-4">
                          <span className="inline-block px-3 py-1 bg-slate-700/40 dark:bg-slate-200 text-slate-200 dark:text-slate-700 rounded-md text-sm font-medium">
                            {transaction.currency}
                          </span>
                        </td>
                        <td className="py-5 px-4 text-sm font-semibold text-emerald-400 dark:text-emerald-600">
                          +${parseFloat(transaction.amount).toFixed(2)}
                        </td>
                        <td className="py-5 px-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-md text-sm font-medium ${getStatusColor(
                              transaction.status
                            )}`}
                          >
                            {transaction.status_display}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile/Tablet Card View */}
              <div className="lg:hidden space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="bg-slate-900/40 dark:bg-slate-50 border border-slate-700/40 dark:border-slate-200 rounded-xl p-4 space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs text-slate-400 dark:text-slate-600 uppercase tracking-wider mb-1">
                          Reference
                        </p>
                        <p className="text-sm font-medium text-slate-200 dark:text-slate-800">
                          {transaction.reference}
                        </p>
                      </div>
                      <span
                        className={`inline-block px-3 py-1 rounded-md text-xs font-medium ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        {transaction.status_display}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400 dark:text-slate-600 uppercase tracking-wider mb-1">
                        Date/Time
                      </p>
                      <p className="text-sm text-slate-300 dark:text-slate-700">
                        {formatDate(transaction.created_at)}
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-slate-700/20 dark:border-slate-200">
                      <div>
                        <p className="text-xs text-slate-400 dark:text-slate-600 uppercase tracking-wider mb-1">
                          Currency
                        </p>
                        <span className="inline-block px-3 py-1 bg-slate-700/40 dark:bg-slate-200 text-slate-200 dark:text-slate-700 rounded-md text-sm font-medium">
                          {transaction.currency}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400 dark:text-slate-600 uppercase tracking-wider mb-1">
                          Amount
                        </p>
                        <p className="text-lg font-bold text-emerald-400 dark:text-emerald-600">
                          +${parseFloat(transaction.amount).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Enhanced Deposit Modal */}
      {selectedWallet && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
          <div className="bg-slate-800 dark:bg-white border border-slate-700/40 dark:border-slate-200 rounded-xl sm:rounded-2xl w-full max-w-3xl my-4 sm:my-8 shadow-2xl">
            <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between sticky top-0 bg-slate-800 dark:bg-white pb-3 sm:pb-4 border-b border-slate-700/40 dark:border-slate-200 z-10">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-100 dark:text-slate-900">
                  Deposit {selectedWallet.currency_display}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-slate-400 dark:text-slate-600 hover:text-slate-200 dark:hover:text-slate-900 transition-colors"
                  disabled={loading}
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Crypto Purchase Info */}
              <div className="bg-blue-500/10 dark:bg-blue-50 border border-blue-500/30 dark:border-blue-200 rounded-lg p-3 sm:p-4">
                <div className="flex items-start gap-2 sm:gap-3">
                  <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 dark:text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs sm:text-sm text-slate-200 dark:text-slate-800 font-medium mb-2">
                      Don&apos;t have cryptocurrency? Purchase from trusted
                      platforms:
                    </p>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      <a
                        href="https://www.binance.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-slate-700 dark:bg-white rounded-md text-xs text-slate-200 dark:text-slate-800 hover:bg-slate-600 dark:hover:bg-slate-100 transition-colors"
                      >
                        <span className="font-semibold">Binance</span>
                      </a>
                      <a
                        href="https://www.coinbase.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-slate-700 dark:bg-white rounded-md text-xs text-slate-200 dark:text-slate-800 hover:bg-slate-600 dark:hover:bg-slate-100 transition-colors"
                      >
                        <span className="font-semibold">Coinbase</span>
                      </a>
                      <a
                        href="https://www.kraken.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-slate-700 dark:bg-white rounded-md text-xs text-slate-200 dark:text-slate-800 hover:bg-slate-600 dark:hover:bg-slate-100 transition-colors"
                      >
                        <span className="font-semibold">Kraken</span>
                      </a>
                      <a
                        href="https://crypto.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-slate-700 dark:bg-white rounded-md text-xs text-slate-200 dark:text-slate-800 hover:bg-slate-600 dark:hover:bg-slate-100 transition-colors"
                      >
                        <span className="font-semibold">Crypto.com</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dollar Amount Input */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-slate-300 dark:text-slate-700 mb-2">
                  Enter Amount (USD):
                </label>
                <input
                  type="number"
                  value={dollarAmount}
                  onChange={(e) => setDollarAmount(e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 sm:py-4 bg-slate-900/60 dark:bg-slate-100 border border-slate-700/40 dark:border-slate-300 rounded-lg text-slate-100 dark:text-slate-900 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600 transition-all text-base sm:text-lg font-semibold"
                />
                {/* Conversion Display */}
                {currencyAmount && dollarAmount && (
                  <div className="mt-3 bg-slate-800/60 dark:bg-white px-4 py-3 rounded-md border border-slate-700/40 dark:border-slate-300">
                    <p className="text-xs text-slate-400 dark:text-slate-600 mb-1">
                      You will send:
                    </p>
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <p className="text-xl sm:text-2xl font-bold text-emerald-400 dark:text-emerald-600">
                        {currencyAmount}
                      </p>
                      <p className="text-slate-400 dark:text-slate-600 font-medium">
                        {selectedWallet.currency}
                      </p>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                      Rate: 1 {selectedWallet.currency} = $
                      {selectedWallet.amount}
                    </p>
                  </div>
                )}
              </div>

              {/* Order Confirmation Banner */}
              {dollarAmount && currencyAmount && (
                <div className="bg-blue-500/10 dark:bg-blue-50 border border-blue-500/30 dark:border-blue-200 rounded-lg p-4 sm:p-5">
                  <p className="text-sm sm:text-base text-slate-200 dark:text-slate-800 mb-2 sm:mb-3">
                    Your deposit order of{" "}
                    <span className="text-blue-400 dark:text-blue-600 font-bold">
                      ${dollarAmount} USD
                    </span>{" "}
                    has been initiated.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-700">
                    Please send{" "}
                    <span className="text-blue-400 dark:text-blue-600 font-bold">
                      {currencyAmount} {selectedWallet.currency}
                    </span>{" "}
                    to the address below. The amount will appear in your account
                    only after transaction is approved.
                  </p>
                </div>
              )}

              {/* Transaction Details Card */}
              <div className="bg-slate-900/60 dark:bg-slate-100 border border-slate-700/40 dark:border-slate-300 rounded-lg p-3 sm:p-5 space-y-3 sm:space-y-4">
                {/* Step 1: Check Coin */}
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 text-white text-xs sm:text-sm font-bold">
                    1
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-600 mb-1.5 sm:mb-2">
                      Check coin ticker
                    </p>
                    <div className="flex items-center gap-2 bg-slate-800/60 dark:bg-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-md">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0">
                        {getCryptoIcon(selectedWallet.currency)}
                      </div>
                      <span className="text-sm sm:text-base text-slate-200 dark:text-slate-800 font-semibold truncate">
                        {selectedWallet.currency}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-400 dark:text-slate-600 truncate">
                        {getNetworkName(selectedWallet.currency)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step 2: Check Amount */}
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 text-white text-xs sm:text-sm font-bold">
                    2
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-600 mb-1.5 sm:mb-2">
                      Check the total amount
                    </p>
                    <div className="bg-slate-800/60 dark:bg-white px-3 py-2.5 sm:px-4 sm:py-3 rounded-md">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <p className="text-lg sm:text-2xl font-bold text-emerald-400 dark:text-emerald-600 break-all">
                          {currencyAmount || "0.00000000"}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-600">
                          {selectedWallet.currency}
                        </p>
                      </div>
                      <div className="flex items-baseline gap-2 flex-wrap mt-1.5 sm:mt-2">
                        <p className="text-base sm:text-lg text-slate-300 dark:text-slate-700">
                          ≈ ${dollarAmount || "0.00"}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-500">
                          USD
                        </p>
                      </div>
                      {dollarAmount && (
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1.5 sm:mt-2">
                          Rate: 1 {selectedWallet.currency} = $
                          {selectedWallet.amount}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Step 3: Wallet Address */}
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 text-white text-xs sm:text-sm font-bold">
                    3
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-600 mb-1.5 sm:mb-2">
                      Send to this wallet address
                    </p>
                    <div className="flex gap-1.5 sm:gap-2">
                      <input
                        type="text"
                        value={selectedWallet.wallet_address}
                        readOnly
                        className="flex-1 px-2.5 py-2 sm:px-4 sm:py-3 bg-slate-800/60 dark:bg-white border border-slate-700/40 dark:border-slate-300 rounded-lg text-slate-300 dark:text-slate-700 text-xs sm:text-sm font-mono break-all focus:outline-none min-w-0"
                      />
                      <button
                        onClick={handleCopy}
                        className="px-2.5 py-2 sm:px-4 sm:py-3 bg-slate-700 dark:bg-slate-300 hover:bg-slate-600 dark:hover:bg-slate-400 text-slate-200 dark:text-slate-800 rounded-lg transition-all flex items-center justify-center flex-shrink-0"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Countdown Timer - Prominent Display */}
                <div className="bg-red-500/10 dark:bg-red-50 border-2 border-red-500/40 dark:border-red-300 rounded-lg p-4 sm:p-5">
                  <div className="flex items-center justify-center gap-3">
                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-700 mb-1">
                        This address is valid for a specific period only:
                      </p>
                      <div className="flex items-center gap-1 mx-auto w-fit  md:flex-row">
                        <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 dark:text-red-600 animate-pulse" />
                        <p className="text-xl sm:text-3xl font-bold text-red-400 dark:text-red-600 font-mono">
                          {formatCountdown(countdown)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code - Display if available */}
              {selectedWallet.qr_code_url && (
                <div className="flex justify-center">
                  <div className="bg-white p-4 sm:p-5 rounded-lg shadow-lg">
                    <Image
                      src={selectedWallet.qr_code_url}
                      alt={`${selectedWallet.currency} QR Code`}
                      width={180}
                      height={180}
                      className="rounded w-[180px] h-[180px] sm:w-[220px] sm:h-[220px]"
                    />
                    <p className="text-center text-xs sm:text-sm text-slate-600 mt-2 sm:mt-3 font-medium">
                      Scan QR Code to Pay
                    </p>
                  </div>
                </div>
              )}

              {/* Important Warning */}
              <div className="bg-red-500/10 dark:bg-red-50 border border-red-500/30 dark:border-red-200 rounded-lg p-3 sm:p-4">
                <div className="flex items-start gap-2 sm:gap-3">
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 dark:text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-slate-200 dark:text-slate-800 space-y-1.5 sm:space-y-2">
                    <p className="font-semibold">
                      Important: Please ensure exact amount
                    </p>
                    <p>
                      Kindly make sure to check that you are sending to the
                      above generated wallet address to avoid loss of funds. The
                      service must receive the{" "}
                      <span className="font-bold">exact amount</span> specified
                      in the payment form. If the amount received differs even
                      by one digit, the payment cannot be processed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Receipt Upload */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-slate-300 dark:text-slate-700 mb-2">
                  Upload Payment Receipt or Screenshot:
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-4 sm:p-6 text-center transition-all ${
                    isDragging
                      ? "border-emerald-500 bg-emerald-500/10"
                      : "border-slate-700/40 dark:border-slate-300 bg-slate-900/60 dark:bg-slate-100"
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
                      <Check className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-500 mx-auto" />
                      <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-700 break-all px-2">
                        {receipt.name}
                      </p>
                      <button
                        onClick={() => setReceipt(null)}
                        className="text-xs sm:text-sm text-red-400 dark:text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label htmlFor="receipt-upload" className="cursor-pointer">
                      <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400 dark:text-slate-500 mx-auto mb-2 sm:mb-3" />
                      <p className="text-sm sm:text-base text-slate-300 dark:text-slate-700 font-medium mb-1">
                        Drop your receipt here or click to browse
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">
                        Supports: JPG, PNG, GIF (Max 10MB)
                      </p>
                    </label>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0" />
                    <p className="text-xs sm:text-sm text-red-400 dark:text-red-600">
                      {error}
                    </p>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                    <p className="text-xs sm:text-sm text-green-400 dark:text-green-600">
                      {success}
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4 pt-3 sm:pt-4 border-t border-slate-700/40 dark:border-slate-200">
                <button
                  onClick={closeModal}
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 sm:px-6 sm:py-3 md:py-4 bg-red-500/20 hover:bg-red-500/30 dark:bg-red-100 dark:hover:bg-red-200 text-red-400 dark:text-red-600 rounded-lg font-medium transition-all text-xs sm:text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed border border-red-500/30 dark:border-red-300"
                >
                  Cancel Transaction
                </button>
                <button
                  onClick={handleConfirmDeposit}
                  disabled={
                    loading || !dollarAmount || !currencyAmount || !receipt
                  }
                  className="flex-1 px-4 py-2.5 sm:px-6 sm:py-3 md:py-4 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white rounded-lg font-medium transition-all shadow-lg text-xs sm:text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Processing..." : "Confirm Deposit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
