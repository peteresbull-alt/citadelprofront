"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { AlertCircle, Info } from "lucide-react";
import DashboardNavbar from "@/components/main/DashboardNavbar";
import { BACKEND_URL } from "@/lib/constants";
import { PulseLoader } from "react-spinners";
import DepositAmountModal from "./DepositAmountModal";
import DepositDetailsModal from "./DepositDetailsModal";
import DepositSuccessModal from "./DepositSuccessModal";
import { AdminWallet, Transaction } from "./deposit-types";



// Cryptocurrency Icons - COMPLETE IMPLEMENTATION
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

// Crypto Icons Component
const getCryptoIcon = (currency: string): React.ReactNode => {
  // Handle USDT variants
  if (currency.includes("USDT")) {
    return CryptoIcons.USDT;
  }
  return CryptoIcons[currency] || CryptoIcons.BTC;
};

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
  const [loading, setLoading] = useState(true);

  // Modal states
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Form data
  const [dollarAmount, setDollarAmount] = useState("");
  const [currencyAmount, setCurrencyAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [depositReference, setDepositReference] = useState("");

  useEffect(() => {
    fetchDepositOptions();
    fetchTransactionHistory();
  }, []);

  const fetchDepositOptions = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/deposits/options/`);
      const data = await response.json();

      if (data.success) {
        setWallets(data.wallets);
      } else {
        toast.error(data.error || "Failed to load deposit options");
      }
    } catch (err) {
      console.error("Error fetching deposit options:", err);
      toast.error("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactionHistory = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const response = await fetch(
        `${BACKEND_URL}/deposits/history/?limit=10`,
        {
          headers: { Authorization: `Token ${token}` },
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

  const handleDepositClick = (wallet: AdminWallet) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please login to make a deposit");
      return;
    }

    setSelectedWallet(wallet);
    setShowAmountModal(true);
  };

  const handleAmountSubmit = (data: {
    dollarAmount: string;
    currencyAmount: string;
  }) => {
    setDollarAmount(data.dollarAmount);
    setCurrencyAmount(data.currencyAmount);
    setShowAmountModal(false);
    setShowDetailsModal(true);
  };

  const handleConfirmDeposit = async (receipt: File) => {
    if (!selectedWallet) return;

    setSubmitting(true);

    try {
      const token = localStorage.getItem("authToken");

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
        setDepositReference(data.transaction.reference);
        setShowDetailsModal(false);
        setShowSuccessModal(true);
        fetchTransactionHistory();
        toast.success("Deposit request submitted successfully!");
      } else {
        toast.error(data.error || "Failed to submit deposit");
      }
    } catch (err) {
      console.error("Error submitting deposit:", err);
      toast.error("Failed to submit deposit request");
    } finally {
      setSubmitting(false);
    }
  };

  const closeAllModals = () => {
    setShowAmountModal(false);
    setShowDetailsModal(false);
    setShowSuccessModal(false);
    setSelectedWallet(null);
    setDollarAmount("");
    setCurrencyAmount("");
    setDepositReference("");
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1f2e] dark:bg-gray-50 flex items-center justify-center pt-20">
        <DashboardNavbar />
        <PulseLoader color="#10b981" size={15} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1f2e] dark:bg-gray-50 transition-colors pt-20">
      <DashboardNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white dark:text-gray-900 mb-2">
            Deposit Funds
          </h1>
          <p className="text-gray-400 dark:text-gray-600">
            Choose your preferred cryptocurrency to deposit
          </p>
        </div>

        {/* Payment Methods */}
        <div className="bg-slate-800/40 dark:bg-white border border-slate-700/40 dark:border-slate-200 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-100 dark:text-slate-900 mb-8">
            Choose Payment Method
          </h2>

          {wallets.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400 dark:text-slate-600">
                No deposit options available
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {wallets.map((wallet) => (
                <div
                  key={wallet.id}
                  className="flex gap-4 md:items-center justify-between p-5 flex-col md:flex-row bg-slate-900/40 dark:bg-slate-50 border border-slate-700/40 dark:border-slate-200 rounded-xl hover:border-slate-600/60 dark:hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-slate-700/50 dark:bg-slate-200">
                      {getCryptoIcon(wallet.currency)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-100 dark:text-slate-900">
                        {wallet.currency_display}
                      </h3>
                      <p className="text-sm text-slate-400 dark:text-slate-600">
                        {getNetworkName(wallet.currency)} Network
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                        Rate: ${wallet.amount} per unit
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDepositClick(wallet)}
                    className="bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition-all shadow-lg"
                  >
                    Deposit
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Transaction History */}
        <div className="bg-slate-800/40 dark:bg-white border border-slate-700/40 dark:border-slate-200 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-slate-100 dark:text-slate-900 mb-8">
            Recent Deposits
          </h2>

          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <Info className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400 dark:text-slate-600">
                No deposits yet
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="bg-slate-900/40 dark:bg-slate-50 border border-slate-700/40 dark:border-slate-200 rounded-xl p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-sm font-medium text-slate-200 dark:text-slate-800">
                        {transaction.reference}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-600">
                        {formatDate(transaction.created_at)}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-md text-xs font-medium ${getStatusColor(
                        transaction.status
                      )}`}
                    >
                      {transaction.status_display}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400 dark:text-slate-600">
                      {transaction.currency}
                    </span>
                    <span className="text-lg font-bold text-emerald-400 dark:text-emerald-600">
                      +${parseFloat(transaction.amount).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showAmountModal && selectedWallet && (
        <DepositAmountModal
          wallet={selectedWallet}
          onSubmit={handleAmountSubmit}
          onClose={closeAllModals}
        />
      )}

      {showDetailsModal && selectedWallet && (
        <DepositDetailsModal
          wallet={selectedWallet}
          dollarAmount={dollarAmount}
          currencyAmount={currencyAmount}
          submitting={submitting}
          onConfirm={handleConfirmDeposit}
          onCancel={() => {
            setShowDetailsModal(false);
            setShowAmountModal(true);
          }}
        />
      )}

      {showSuccessModal && selectedWallet && (
        <DepositSuccessModal
          dollarAmount={dollarAmount}
          currencyAmount={currencyAmount}
          currency={selectedWallet.currency}
          reference={depositReference}
          onClose={closeAllModals}
        />
      )}
    </div>
  );
}
