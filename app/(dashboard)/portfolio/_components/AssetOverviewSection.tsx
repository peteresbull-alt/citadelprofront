"use client";

import React from "react";
import { Info } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface AssetOverviewProps {
  totalDeposits: number;
  totalWithdrawals: number;
  totalProfits: number;
}

export default function AssetOverviewSection({
  totalDeposits,
  totalWithdrawals,
  totalProfits,
}: AssetOverviewProps) {
  // Calculate total for percentage
  const total = totalDeposits + totalWithdrawals + totalProfits;

  // Prepare chart data
  const chartData = [
    { name: "Deposits", value: totalDeposits || 0.01 }, // Add small value if 0 to show ring
    { name: "Withdrawals", value: totalWithdrawals || 0.01 },
    { name: "Profits", value: totalProfits || 0.01 },
  ];

  // Colors matching the image
  const COLORS = ["#F59E0B", "#F97316", "#06B6D4"]; // Yellow/Gold, Orange, Cyan/Blue

  return (
    <section className="bg-slate-800/60 dark:bg-white border border-slate-700/40 dark:border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-xl backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-100 dark:text-slate-900">
          Asset overview
        </h2>
        <button className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-700/50 dark:bg-slate-200 hover:bg-slate-700 dark:hover:bg-slate-300 transition-colors flex items-center justify-center flex-shrink-0">
          <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 dark:text-slate-600" />
        </button>
      </div>

      {/* Donut Chart - FULLY RESPONSIVE */}
      <div className="flex justify-center mb-6 sm:mb-8">
        <div className="relative w-48 h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-72 md:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="85%"
                paddingAngle={2}
                dataKey="value"
                strokeWidth={0}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center text - RESPONSIVE SIZING */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center px-2">
              <p className="text-[10px] xs:text-xs sm:text-sm text-slate-400 dark:text-slate-600 mb-0.5 sm:mb-1">
                Total
              </p>
              <p className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-slate-100 dark:text-slate-900 break-all">
                $
                {total.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Legend/Stats - RESPONSIVE SPACING AND TEXT */}
      <div className="space-y-3 sm:space-y-4">
        {/* Total Deposit */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#F59E0B] flex-shrink-0" />
            <span className="text-xs sm:text-sm md:text-base text-slate-300 dark:text-slate-700 truncate">
              Total Deposit
            </span>
          </div>
          <span className="text-xs sm:text-sm md:text-base font-medium text-slate-200 dark:text-slate-800 whitespace-nowrap">
            {totalDeposits.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            USD
          </span>
        </div>

        {/* Total Withdrawals */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#F97316] flex-shrink-0" />
            <span className="text-xs sm:text-sm md:text-base text-slate-300 dark:text-slate-700 truncate">
              Total Withdrawals
            </span>
          </div>
          <span className="text-xs sm:text-sm md:text-base font-medium text-slate-200 dark:text-slate-800 whitespace-nowrap">
            ≈{" "}
            {totalWithdrawals.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            USD
          </span>
        </div>

        {/* Total Profits */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#06B6D4] flex-shrink-0" />
            <span className="text-xs sm:text-sm md:text-base text-slate-300 dark:text-slate-700 truncate">
              Total profits
            </span>
          </div>
          <span className="text-xs sm:text-sm md:text-base font-medium text-slate-200 dark:text-slate-800 whitespace-nowrap">
            ≈{" "}
            {totalProfits.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            USD
          </span>
        </div>
      </div>
    </section>
  );
}
