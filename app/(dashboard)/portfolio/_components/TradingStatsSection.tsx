"use client";
import React from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  BarChart3,
  TrendingUp,
  AlertCircle,
  Upload,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  iconColor: string;
}

interface TradingStatsSectionProps {
  balance: number;
  totalDeposits: number;
  totalWithdrawals: number;
  profit: number;
  hasSubmittedKyc: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  iconColor,
}) => {
  return (
    <div className="bg-slate-800/60 dark:bg-white border border-slate-700/40 dark:border-slate-200 rounded-xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 hover:border-slate-600/60 dark:hover:border-slate-300 transition-all">
      <div
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg ${iconColor} flex items-center justify-center flex-shrink-0`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-600 mb-1">
          {label}
        </p>
        <p className="text-lg sm:text-xl font-semibold text-slate-100 dark:text-slate-900 truncate">
          {value}
        </p>
      </div>
    </div>
  );
};

export default function TradingStatsSection({
  balance,
  totalDeposits,
  totalWithdrawals,
  profit,
  hasSubmittedKyc,
}: TradingStatsSectionProps) {
  const router = useRouter();

  const stats = [
    {
      icon: <ArrowDownToLine className="w-6 h-6 sm:w-7 sm:h-7 text-white" />,
      label: "Total Deposit",
      value: `$${totalDeposits.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      iconColor: "bg-green-600/80 dark:bg-green-500",
    },
    {
      icon: <ArrowUpFromLine className="w-6 h-6 sm:w-7 sm:h-7 text-white" />,
      label: "Total Withdraw",
      value: `$${totalWithdrawals.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      iconColor: "bg-green-600/80 dark:bg-green-500",
    },
    {
      icon: <BarChart3 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />,
      label: "Total Trade",
      value: "0",
      iconColor: "bg-green-600/80 dark:bg-green-500",
    },
    {
      icon: <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-white" />,
      label: "Total Profit",
      value: `${profit >= 0 ? "+" : ""}$${profit.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      iconColor: "bg-green-600/80 dark:bg-green-500",
    },
  ];

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-[#061124] dark:bg-slate-50">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Alert Banners */}
        <div className="space-y-3 sm:space-y-4">
          {/* Empty Balance Alert */}
          {balance === 0 && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-500 mb-1">
                  Empty Balance
                </h3>
                <p className="text-sm text-slate-300 dark:text-slate-700 mb-3">
                  Your account balance is empty. Please deposit funds to start
                  trading.
                </p>
                <button
                  onClick={() => router.push("/deposit")}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Deposit Now
                </button>
              </div>
            </div>
          )}

          {/* KYC Alert */}
          {!hasSubmittedKyc && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex items-start gap-3">
              <Upload className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-yellow-500 mb-1">
                  KYC Verification Required
                </h3>
                <p className="text-sm text-slate-300 dark:text-slate-700 mb-3">
                  Please upload your KYC documents to verify your account and
                  unlock all features.
                </p>
                <button
                  onClick={() => router.push("/kyc")}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Upload KYC
                </button>
              </div>
            </div>
          )}
        </div>

        
      </div>
    </section>
  );
}
