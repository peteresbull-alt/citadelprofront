"use client";

import React, { useState, useEffect } from "react";
import { Globe, Search, ChevronDown, ChevronUp } from "lucide-react";
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

const faqs = [
  {
    question: "What is Copy Trading?",
    answer:
      "Copy trading is an investment method that allows individuals to automatically copy the trades of professional or experienced traders. Instead of making trading decisions yourself, you select a trader to follow, and your account mirrors their positions in real time.",
  },
  {
    question: "How do I copy an Expert?",
    answer:
      "Simply browse through our top traders, review their performance metrics, and click the 'Copy' button on their profile. You can set your investment amount and risk parameters before starting to copy their trades.",
  },
  {
    question: "How can I stop copying an Expert?",
    answer:
      "You can stop copying an expert at any time by going to your active copies section and clicking 'Stop Copying'. Your current positions can be closed immediately or you can choose to keep them open.",
  },
  {
    question: "Why don't I receive any trades from copied experts?",
    answer:
      "This could be because the expert hasn't made any trades recently, your account balance is insufficient for the minimum trade size, or there may be trading restrictions on your account. Check your copy trading settings and account status.",
  },
];

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

export default function CopyTradingHero() {
  const [activeTab, setActiveTab] = useState<"experts" | "howItWorks">(
    "experts"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [traders, setTraders] = useState<Trader[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Debounce search input (wait 500ms after user stops typing)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // ✅ Fetch traders when debounced search changes
  useEffect(() => {
    fetchTraders();
  }, [debouncedSearch]);

  const fetchTraders = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build URL with search parameter
      let url = `${BACKEND_URL}/traders/`;

      if (debouncedSearch.trim()) {
        url += `?search=${encodeURIComponent(debouncedSearch.trim())}`;
      }

      console.log("🔍 Fetching traders from:", url); // DEBUG

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch traders");
      }

      const data = await response.json();
      console.log("✅ Traders received:", data.length, "traders"); // DEBUG
      console.log("📊 Search query:", debouncedSearch); // DEBUG

      setTraders(data);
    } catch (err) {
      setError("Failed to load traders. Please try again later.");
      console.error("❌ Error fetching traders:", err);
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
    <div className="w-full min-h-screen bg-[#061124] dark:bg-slate-50">
      {/* Hero Section */}
      <div className="relative px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900/40 via-[#061124] to-green-900/40 pt-30">
        <Image
          src="/images/copytrading-banner.png"
          alt="copytrading-banner"
          width={588}
          height={463}
          className="mx-auto w-full md:w-100"
        />
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex justify-center gap-8 border-b border-slate-700/40 dark:border-slate-200">
          <button
            onClick={() => setActiveTab("experts")}
            className={`pb-4 text-lg font-semibold transition-all relative ${
              activeTab === "experts"
                ? "text-green-500 dark:text-green-600"
                : "text-slate-400 dark:text-slate-600 hover:text-slate-300 dark:hover:text-slate-700"
            }`}
          >
            Top Experts
            {activeTab === "experts" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 dark:bg-green-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("howItWorks")}
            className={`pb-4 text-lg font-semibold transition-all relative ${
              activeTab === "howItWorks"
                ? "text-green-500 dark:text-green-600"
                : "text-slate-400 dark:text-slate-600 hover:text-slate-300 dark:hover:text-slate-700"
            }`}
          >
            How It Works
            {activeTab === "howItWorks" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 dark:bg-green-600" />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === "experts" ? (
          <>
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search traders by name or username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/40 dark:bg-white border border-slate-700/50 dark:border-slate-300 rounded-xl pl-12 pr-4 py-4 text-slate-100 dark:text-slate-900 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-green-500 dark:focus:border-green-600 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 dark:hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Search Query Display (for debugging) */}
            {debouncedSearch && (
              <div className="max-w-2xl mx-auto mb-4 text-center">
                <p className="text-sm text-slate-400 dark:text-slate-600">
                  Searching for:{" "}
                  <span className="font-semibold text-green-500">
                    &quot;{debouncedSearch}&quot;
                  </span>
                </p>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-20">
                <PulseLoader color="#10b981" size={15} />
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-12">
                <p className="text-red-500 text-lg">{error}</p>
                <button
                  onClick={fetchTraders}
                  className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            {/* No Results */}
            {!loading && !error && traders.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-400 dark:text-slate-600 text-lg">
                  {debouncedSearch
                    ? `No traders found matching "${debouncedSearch}"`
                    : "No traders found"}
                </p>
                {debouncedSearch && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}

            {/* Traders Grid */}
            {!loading && !error && traders.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        <div className="text-xs font-bold text-white dark:text-black">
                          {trader.country}
                        </div>
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
                    </div>

                    {/* Footer with Copiers and View Button */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-700/40 dark:border-slate-200">
                      <span className="text-xs sm:text-sm text-slate-400 dark:text-slate-600">
                        {trader.copiers} Copiers
                      </span>
                      <Link
                        href={`/copy-experts/${trader.id}`}
                        className="px-3 py-2 text-sm inline-block dark:no-underline underline rounded border-green-500 bg-transparent dark:hover:bg-green-600 hover:text-white text-green-600 font-medium shadow-lg hover:shadow-green-500/50 dark:hover:shadow-green-500/30 transition-all"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-slate-800/40 dark:bg-white border border-slate-700/40 dark:border-slate-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenFaqIndex(openFaqIndex === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-700/20 dark:hover:bg-slate-50 transition-all"
                >
                  <span className="text-lg font-semibold text-slate-100 dark:text-slate-900 pr-4">
                    {faq.question}
                  </span>
                  {openFaqIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-green-500 dark:text-green-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 dark:text-slate-600 flex-shrink-0" />
                  )}
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-6 text-slate-300 dark:text-slate-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
