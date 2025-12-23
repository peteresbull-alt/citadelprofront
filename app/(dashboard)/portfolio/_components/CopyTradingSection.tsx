"use client";
import React, { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import Link from "next/link";
import { BACKEND_URL } from "@/lib/constants";
import { PulseLoader } from "react-spinners";
import Image from "next/image";

interface Trader {
  id: number;
  name: string;
  username: string;
  avatar: string | null;
  country_flag: string | null;
  badge: string;
  country: string;
  gain: string;
  risk: number;
  trades: string;
  capital: string;
  copiers: string;
  is_active: boolean;
}

const RiskBadge: React.FC<{ level: number }> = ({ level }) => {
  const getBgColor = () => {
    if (level <= 2) return "bg-emerald-500 dark:bg-emerald-600";
    if (level <= 4) return "bg-yellow-500 dark:bg-yellow-600";
    return "bg-red-500 dark:bg-red-600";
  };

  return (
    <div
      className={`${getBgColor()} text-white text-xs md:text-sm w-5 h-5 md:h-7 md:w-7 rounded-full flex items-center justify-center font-bold shadow-lg`}
    >
      {level}
    </div>
  );
};

const CountryFlag: React.FC<{ country: string }> = ({ country }) => {
  const flagColors: Record<string, string> = {
    US: "bg-gradient-to-b from-red-500 via-white to-blue-500",
    GB: "bg-gradient-to-r from-blue-600 via-white to-red-500",
    PL: "bg-gradient-to-b from-white to-red-500",
  };

  return (
    <div className="absolute bottom-0 right-0 w-6 h-4 rounded-sm overflow-hidden border border-slate-700/50 dark:border-slate-300/50">
      <div
        className={`w-full h-full ${flagColors[country] || "bg-slate-600"}`}
      />
    </div>
  );
};

export default function CopyTradingSection() {
  const [traders, setTraders] = useState<Trader[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch first 3 traders from API
  useEffect(() => {
    fetchTraders();
  }, []);

  const fetchTraders = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BACKEND_URL}/traders/`);

      if (!response.ok) {
        throw new Error("Failed to fetch traders");
      }

      const data = await response.json();
      // Get only the first 3 traders
      console.log(data);
      setTraders(data.slice(0, 3));
    } catch (err) {
      setError("Failed to load traders");
      console.error("Error fetching traders:", err);
    } finally {
      setLoading(false);
    }
  };

  const getAvatarUrl = (avatarUrl: string | null, name: string) => {
    return (
      avatarUrl ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name
      )}&background=random&size=128`
    );
  };

  return (
    <section className="w-full px-0 sm:px-6 lg:px-8 py-12 bg-[#061124] dark:bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center flex-col sm:flex-row gap-4 justify-between mb-8">
          <h2 className="text-3xl font-bold text-slate-100 dark:text-slate-900">
            Copy Trading
          </h2>
          <Link
            href={"/copy-experts"}
            className="px-6 py-2 text-sm md:text-lg rounded cursor-pointer border border-green-500/50 dark:border-green-600/50 bg-green-500/10 dark:bg-green-50 hover:bg-green-500/20 dark:hover:bg-green-100 text-green-400 dark:text-cyan-600 font-medium transition-all"
          >
            More Traders
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <PulseLoader color="#10b981" size={15} />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button
              onClick={fetchTraders}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Traders Grid */}
        {!loading && !error && traders.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-9">
            {traders.map((trader) => (
              <div
                key={trader.id}
                className="bg-slate-800/40 dark:bg-white border border-slate-700/40 dark:border-slate-200 rounded-2xl p-6 hover:border-slate-600/60 dark:hover:border-slate-300 transition-all hover:shadow-xl"
              >
                {/* Header with Avatar and Name */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center flex-wrap gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 text-sm md:text-lg rounded-full bg-gradient-to-br from-slate-600 to-slate-700 dark:from-slate-300 dark:to-slate-400 flex items-center justify-center text-slate-200 dark:text-slate-700 font-semibold border-2 border-slate-700/50 dark:border-slate-300 overflow-hidden">
                        {trader.avatar ? (
                          <Image
                            src={getAvatarUrl(trader.avatar, trader.name)}
                            width={48}
                            height={48}
                            alt={trader.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          trader.name.charAt(0)
                        )}
                      </div>
                      {trader.badge === "gold" && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 dark:bg-yellow-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs md:text-sm">
                            🏆
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-sm md:text-lg font-semibold text-slate-100 dark:text-slate-900">
                        {trader.name}
                      </h3>
                      <p className="text-sm md:text-lg text-slate-400 dark:text-slate-600">
                        {trader.username}
                      </p>
                    </div>
                  </div>

                  {/* Country Badge */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative w-10 h-10 bg-slate-700/60 dark:bg-slate-200 rounded-full flex items-center justify-center border border-slate-600/50 dark:border-slate-300">
                      {trader.country_flag ? (
                        <>
                          <Image
                            width={40}
                            height={40}
                            className="rounded-full w-full h-full object-cover"
                            src={trader.country_flag}
                            alt="country-flag"
                          />
                        </>
                      ) : (
                        <>
                          <Globe className="w-4 h-4 md:w-5 md:h-5 text-gray-600 dark:text-gray-300" />
                          <CountryFlag country={trader.country} />
                        </>
                      )}
                    </div>
                    <div className="text-xs font-bold">{trader.country}</div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="flex flex-row flex-wrap gap-4 justify-between items-center mb-6">
                  {/* Gain */}
                  <div className="text-left">
                    <div
                      className={`text-sm md:text-lg font-bold mb-1 ${
                        parseFloat(trader.gain) >= 0
                          ? "text-emerald-400 dark:text-emerald-600"
                          : "text-red-400 dark:text-red-600"
                      }`}
                    >
                      {parseFloat(trader.gain) >= 0 ? "+" : ""}
                      {trader.gain}%
                    </div>
                    <div className="text-xs md:text-sm text-slate-400 dark:text-slate-600">
                      Gain
                    </div>
                  </div>

                  {/* Risk */}
                  <div className="flex flex-col items-center">
                    <RiskBadge level={trader.risk} />
                    <div className="text-xs md:text-sm text-slate-400 dark:text-slate-600 mt-1">
                      Risk
                    </div>
                  </div>

                  {/* Trades */}
                  <div className="text-center">
                    <div className="text-sm md:text-lg font-semibold text-slate-200 dark:text-slate-700 mb-1">
                      {trader.trades}
                    </div>
                    <div className="text-xs md:text-sm text-slate-400 dark:text-slate-600">
                      Trades
                    </div>
                  </div>

                  {/* Inv. Capital */}
                  {/* <div className="text-center">
                    <div className="text-sm md:text-lg font-semibold text-slate-200 dark:text-slate-700 mb-1">
                      {trader.capital}
                    </div>
                    <div className="text-xs md:text-sm text-slate-400 dark:text-slate-600">
                      Inv. Capital
                    </div>
                  </div> */}
                </div>

                {/* Footer with Copiers and View Button */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-700/40 dark:border-slate-200">
                  <span className="text-xs sm:text-sm text-slate-400 dark:text-slate-600">
                    {trader.copiers} Copiers
                  </span>
                  <Link
                    href={`/copy-experts/${trader.id}`}
                    className="px-3 py-2 text-sm inline-block dark:no-underline underline rounded border-green-500  bg-transparent dark:hover:bg-green-600 hover:text-white text-green-600 font-medium shadow-lg hover:shadow-green-500/50 dark:hover:shadow-green-500/30 transition-all"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && traders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 dark:text-slate-600 text-lg">
              No traders available at the moment
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
