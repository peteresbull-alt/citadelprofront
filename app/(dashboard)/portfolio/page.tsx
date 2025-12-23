"use client";
import React, { useEffect, useState } from "react";
import CopyTradingSection from "./_components/CopyTradingSection";
import TradingStatsSection from "./_components/TradingStatsSection";
import DashboardNavbar from "@/components/main/DashboardNavbar";
import GuidedTour from "./_components/GuidedTour";
import { BACKEND_URL } from "@/lib/constants";
import { PulseLoader } from "react-spinners";
import { Info, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AssetOverviewSection from "./_components/AssetOverviewSection";
import QuickActions from "./_components/QuickActions";

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

interface DashboardData {
  email: string;
  first_name: string;
  last_name: string;
  account_id: string;
  currency: string;
  balance: number;
  profit: number;
  current_loyalty_status: string;
  next_loyalty_status: string;
  next_amount_to_upgrade: number;
  has_submitted_kyc: boolean;
  is_verified: boolean;
  date_joined: string;
  total_deposits: number;
  total_withdrawals: number;
}

export default function Dashboard() {
  const router = useRouter();
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchDashboardData();
      fetchTransactionHistory();
    }
  }, [mounted]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch(`${BACKEND_URL}/dashboard/`, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/login");
          return;
        }
        throw new Error("Failed to fetch dashboard data");
      }

      const data = await response.json();
      setDashboardData(data);
    } catch (err) {
      setError("Failed to load dashboard data. Please try again later.");
      console.error("Error fetching dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactionHistory = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const response = await fetch(
        `${BACKEND_URL}/transactions/history/?limit=10`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setTransactions(data.transactions);
        }
      }
    } catch (err) {
      console.error("Error fetching transaction history:", err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getLoyaltyImage = (status: string) => {
    const images = {
      iron: "/images/iron.png",
      silver: "/images/silver.png",
      gold: "/images/gold.png",
    };
    return images[status as keyof typeof images] || images.iron;
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

  const getTransactionColor = (type: string) => {
    return type.toLowerCase() === "deposit"
      ? "text-emerald-400 dark:text-emerald-600"
      : "text-red-400 dark:text-red-600";
  };

  const getTransactionSign = (type: string) => {
    return type.toLowerCase() === "deposit" ? "+" : "-";
  };

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-[#061124] dark:bg-slate-50 text-slate-100 dark:text-slate-900">
        <DashboardNavbar />
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
          <PulseLoader color="#10b981" size={15} />
        </div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="min-h-screen bg-[#061124] dark:bg-slate-50 text-slate-100 dark:text-slate-900">
        <DashboardNavbar />
        <div className="flex flex-col justify-center items-center h-[calc(100vh-200px)] gap-4">
          <p className="text-red-500 text-lg">
            {error || "Failed to load dashboard"}
          </p>
          <button
            onClick={fetchDashboardData}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-[#061124] dark:bg-slate-50 text-slate-100 dark:text-slate-900 transition-colors">
      <DashboardNavbar />

      {/* Hero section */}
      <header className="w-full px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24 lg:pb-28 pt-20 sm:pt-30 bg-gradient-to-br from-[#1a0f2e] via-[#2d1b4e] to-[#5533aa] dark:from-slate-100 dark:via-slate-200 dark:to-slate-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/account_background.png')] bg-cover bg-center pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col sm:flex-row items-start justify-between gap-6">
          <div>
            <h1 className="text-xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white">
              Welcome, {dashboardData.first_name || "Trader"}. 👋
            </h1>
            <p className="mt-3 sm:mt-4 text-slate-200 text-base sm:text-sm lg:text-lg">
              We hope you enjoy your trading experience with us. Explore the app
              to get started.
            </p>
          </div>

          <div className="relative inline-block">
            <div className="absolute -inset-[5px] overflow-hidden">
              <div className="absolute inset-0 animate-border-spotlight">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur"></div>
              </div>
            </div>

            <Link
              href={"/connect-wallet"}
              id="connectWalletToggle"
              className="relative text-sm md:text-base inline-block px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-medium shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
            >
              Wallet Connect
            </Link>
          </div>
        </div>
      </header>

      {/* Main content cards */}
      <main className="w-full px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 pb-20 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Balance Overview */}
          <section
            id="balanceOverviewToggle"
            className="bg-slate-800/60 dark:bg-white border border-slate-700/40 dark:border-slate-200 rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-sm"
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 dark:text-slate-900">
              Balance Overview
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 dark:text-slate-600">
              Available balance including the converted total balance
            </p>

            <div className="mt-5 sm:mt-6 p-6 sm:p-8 bg-[url('/images/asset-bg.png')] bg-[#040a17cc] bg-blend-color-burn bg-cover bg-center rounded-xl relative">
              <div className="absolute left-5 sm:left-6 top-5 sm:top-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-200 border border-slate-300 grid place-items-center">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-slate-900"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.72-2.81-.01-2.2-1.9-2.96-3.65-3.38z" />
                </svg>
              </div>

              <div className="text-right mb-6">
                <span className="text-basis text-lg sm:text-xl font-semibold text-slate-300">
                  {dashboardData.currency}
                </span>
              </div>

              <div className="text-2xl sm:text-5xl font-light text-white mb-5 sm:mb-6">
                $
                {dashboardData.balance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>

              <div className="text-xs sm:text-sm text-slate-400">
                Reg. Date:{" "}
                <span className="font-semibold text-slate-200">
                  {formatDate(dashboardData.date_joined)}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <QuickActions
                onDepositClick={() => router.push("/deposit")}
                onWithdrawClick={() => router.push("/withdraw")}
                onOrdersClick={() => router.push("/orders")}
                onHistoryClick={() => router.push("/history")}
              />
              <AssetOverviewSection
                totalDeposits={dashboardData.total_deposits}
                totalWithdrawals={dashboardData.total_withdrawals}
                totalProfits={dashboardData.profit}
              />
            </div>
          </section>

          {/* Loyalty Program - UPDATED WITH IMAGES */}
          <div className="">
            <aside className="bg-slate-800/60 dark:bg-white border border-slate-700/40 dark:border-slate-200 rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-sm">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 dark:text-slate-900">
                Loyalty Program
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-400 dark:text-slate-600">
                Deposit more to increase your Loyalty Rank
              </p>

              <div className="mt-5 sm:mt-6 space-y-4 sm:space-y-5">
                {/* Current Loyalty Status - WITH IMAGE ON RIGHT */}
                <div className="p-4 sm:p-5 bg-slate-900/80 dark:bg-slate-50 rounded-xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-800/60 dark:bg-slate-200 border border-slate-700/40 dark:border-slate-300 grid place-items-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 dark:text-slate-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <span className="text-sm sm:text-base text-slate-300 dark:text-slate-700 truncate">
                      Current Loyalty Status
                    </span>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                      <Image
                        src={getLoyaltyImage(
                          dashboardData.current_loyalty_status
                        )}
                        alt={dashboardData.current_loyalty_status}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-sm sm:text-base font-medium text-slate-200 dark:text-slate-800 capitalize">
                      {dashboardData.current_loyalty_status}
                    </span>
                  </div>
                </div>

                {/* Next Loyalty Status - WITH IMAGE ON RIGHT */}
                <div className="p-4 sm:p-5 bg-slate-900/80 dark:bg-slate-50 rounded-xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-800/60 dark:bg-slate-200 border border-slate-700/40 dark:border-slate-300 grid place-items-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 dark:text-slate-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <span className="text-sm sm:text-base text-slate-300 dark:text-slate-700 truncate">
                      Next Loyalty Status
                    </span>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                      <Image
                        src={getLoyaltyImage(dashboardData.next_loyalty_status)}
                        alt={dashboardData.next_loyalty_status}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-sm sm:text-base font-medium text-slate-200 dark:text-slate-800 capitalize">
                      {dashboardData.next_loyalty_status}
                    </span>
                  </div>
                </div>

                {/* UPGRADE AMOUNT DISPLAY - NEW SECTION */}
                {dashboardData.current_loyalty_status !== "gold" && (
                  <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-900/40 to-green-900/40 dark:from-emerald-50 dark:to-green-50 border border-emerald-700/40 dark:border-emerald-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 dark:bg-emerald-100 border border-emerald-500/40 dark:border-emerald-300 grid place-items-center flex-shrink-0">
                        <TrendingUp className="w-5 h-5 text-emerald-400 dark:text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm text-emerald-300 dark:text-emerald-700 font-medium mb-1">
                          Deposit to upgrade to{" "}
                          {dashboardData.next_loyalty_status}
                        </p>
                        <p className="text-xl sm:text-2xl font-bold text-emerald-400 dark:text-emerald-600">
                          $
                          {dashboardData.next_amount_to_upgrade.toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
                        </p>
                        <p className="text-xs text-emerald-400/70 dark:text-emerald-600/70 mt-1">
                          Make a deposit to reach the next tier
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Gold Tier Achievement Message */}
                {dashboardData.current_loyalty_status === "gold" && (
                  <div className="p-4 sm:p-5 bg-gradient-to-r from-yellow-900/40 to-amber-900/40 dark:from-yellow-50 dark:to-amber-50 border border-yellow-700/40 dark:border-yellow-200 rounded-xl text-center">
                    <div className="inline-flex items-center gap-2 text-yellow-400 dark:text-yellow-600 font-semibold">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      You&apos;ve reached the highest tier!
                    </div>
                    <p className="text-xs text-yellow-400/70 dark:text-yellow-600/70 mt-2">
                      Congratulations on achieving Gold status
                    </p>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>

        <TradingStatsSection
          balance={dashboardData.balance}
          totalDeposits={dashboardData.total_deposits}
          totalWithdrawals={dashboardData.total_withdrawals}
          profit={dashboardData.profit}
          hasSubmittedKyc={dashboardData.has_submitted_kyc}
        />
        <CopyTradingSection />

        {/* Transaction History Section */}
        <div className="max-w-7xl mx-auto mt-4 sm:mt-6">
          <div className="bg-slate-800/60 dark:bg-white border border-slate-700/40 dark:border-slate-200 rounded-xl p-5 sm:p-6 shadow-xl backdrop-blur-sm">
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 dark:text-slate-900 mb-2">
              Transaction History
            </h2>
            <p className="text-slate-400 dark:text-slate-600 text-xs sm:text-sm mb-4">
              Your recent deposits and withdrawals
            </p>

            {transactions.length === 0 ? (
              <div className="text-center py-12">
                <Info className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
                <p className="text-slate-400 dark:text-slate-600">
                  No transactions yet
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
                          Type
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
                          <td className="py-5 px-4">
                            <span
                              className={`inline-block px-3 py-1 rounded-md text-xs font-medium ${
                                transaction.transaction_type.toLowerCase() ===
                                "deposit"
                                  ? "bg-emerald-500/20 dark:bg-emerald-100 text-emerald-400 dark:text-emerald-600"
                                  : "bg-red-500/20 dark:bg-red-100 text-red-400 dark:text-red-600"
                              }`}
                            >
                              {transaction.transaction_type_display}
                            </span>
                          </td>
                          <td className="py-5 px-4 text-sm text-slate-300 dark:text-slate-700">
                            {formatDateTime(transaction.created_at)}
                          </td>
                          <td className="py-5 px-4">
                            <span className="inline-block px-3 py-1 bg-slate-700/40 dark:bg-slate-200 text-slate-200 dark:text-slate-700 rounded-md text-sm font-medium">
                              {transaction.currency}
                            </span>
                          </td>
                          <td
                            className={`py-5 px-4 text-sm font-semibold ${getTransactionColor(
                              transaction.transaction_type
                            )}`}
                          >
                            {getTransactionSign(transaction.transaction_type)}$
                            {parseFloat(transaction.amount).toFixed(2)}
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

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-slate-400 dark:text-slate-600 uppercase tracking-wider mb-1">
                            Type
                          </p>
                          <span
                            className={`inline-block px-3 py-1 rounded-md text-xs font-medium ${
                              transaction.transaction_type.toLowerCase() ===
                              "deposit"
                                ? "bg-emerald-500/20 dark:bg-emerald-100 text-emerald-400 dark:text-emerald-600"
                                : "bg-red-500/20 dark:bg-red-100 text-red-400 dark:text-red-600"
                            }`}
                          >
                            {transaction.transaction_type_display}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-400 dark:text-slate-600 uppercase tracking-wider mb-1">
                            Currency
                          </p>
                          <span className="inline-block px-3 py-1 bg-slate-700/40 dark:bg-slate-200 text-slate-200 dark:text-slate-700 rounded-md text-sm font-medium">
                            {transaction.currency}
                          </span>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400 dark:text-slate-600 uppercase tracking-wider mb-1">
                          Date/Time
                        </p>
                        <p className="text-sm text-slate-300 dark:text-slate-700">
                          {formatDateTime(transaction.created_at)}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-700/20 dark:border-slate-200">
                        <p className="text-xs text-slate-400 dark:text-slate-600 uppercase tracking-wider mb-1">
                          Amount
                        </p>
                        <p
                          className={`text-lg font-bold ${getTransactionColor(
                            transaction.transaction_type
                          )}`}
                        >
                          {getTransactionSign(transaction.transaction_type)}$
                          {parseFloat(transaction.amount).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <GuidedTour />

      <style jsx>{`
        @keyframes border-spotlight {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(0deg);
          }
          25% {
            transform: translateX(100%) translateY(-100%) rotate(90deg);
          }
          50% {
            transform: translateX(100%) translateY(100%) rotate(180deg);
          }
          75% {
            transform: translateX(-100%) translateY(100%) rotate(270deg);
          }
          100% {
            transform: translateX(-100%) translateY(-100%) rotate(360deg);
          }
        }

        .animate-border-spotlight {
          animation: border-spotlight 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
