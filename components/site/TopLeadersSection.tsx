"use client";
import React, { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { PulseLoader } from "react-spinners";
import { BACKEND_URL } from "@/lib/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface Trader {
  id: number;
  name: string;
  username: string;
  avatar_url: string | null;
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

const CountryFlag: React.FC<{ country: string; country_flag?: string }> = ({
  country,
  country_flag,
}) => {
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

const TopLeadersSection = () => {
  const [traders, setTraders] = useState<Trader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTraders();
  }, []);

  const fetchTraders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/traders/`);

      if (!response.ok) {
        throw new Error("Failed to fetch traders");
      }

      const data = await response.json();
      // Limit to top 9 traders for carousel
      console.log(data);
      setTraders(data.slice(0, 9));
    } catch (err) {
      console.error("Error fetching traders:", err);
      setTraders([]);
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

  // Don't render section if no traders and not loading
  if (!loading && traders.length === 0) {
    return null;
  }

  return (
    <section className="dark:bg-black py-20 px-6 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="mb-12 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Citadel Markets&apos; Top Leaders
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
              Discover your perfect match using more than 40 filters. Rank
              Leaders based on your preferences.
            </p>
          </div>
        </ScrollReveal>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <PulseLoader color="#10b981" size={15} />
          </div>
        )}

        {/* Traders Carousel */}
        {!loading && traders.length > 0 && (
          <>
            <ScrollReveal direction="up" delay={0.3}>
              <div className="relative px-12 md:px-16 lg:px-20">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {traders.map((trader) => (
                      <CarouselItem
                        key={trader.id}
                        className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                      >
                        <div className="bg-gray-100 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-2xl p-4 md:p-6 hover:border-emerald-400 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/20 h-full">
                          {/* Header with Avatar and Name */}
                          <div className="flex items-start justify-between mb-4 md:mb-6">
                            <div className="flex items-center gap-2 md:gap-3 min-w-0">
                              <div className="relative flex-shrink-0">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200 font-semibold border-2 border-gray-300 dark:border-gray-700 overflow-hidden">
                                  {trader.avatar ? (
                                    <img
                                      src={getAvatarUrl(
                                        trader.avatar,
                                        trader.name
                                      )}
                                      alt={trader.name}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <span className="text-sm md:text-base">
                                      {trader.name.charAt(0)}
                                    </span>
                                  )}
                                </div>
                                {trader.badge === "gold" && (
                                  <div className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-yellow-500 dark:bg-yellow-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs">
                                      🏆
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col min-w-0">
                                <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                                  {trader.name}
                                </h3>
                                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 truncate">
                                  {trader.username}
                                </p>
                              </div>
                            </div>

                            {/* Country Badge */}
                            <div className="relative w-8 h-8 md:w-10 md:h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center border border-gray-300 dark:border-gray-600 flex-shrink-0">
                              {trader.country_flag ? (
                                <Image
                                  width={40}
                                  height={40}
                                  className="rounded-full w-full h-full object-cover"
                                  src={trader.country_flag}
                                  alt="country-flag"
                                />
                              ) : (
                                <>
                                  <Globe className="w-4 h-4 md:w-5 md:h-5 text-gray-600 dark:text-gray-300" />
                                  <CountryFlag country={trader.country} />
                                </>
                              )}
                            </div>
                          </div>

                          {/* Stats Grid */}
                          <div className="flex flex-row gap-2 md:gap-4 justify-between items-center mb-4 md:mb-6">
                            {/* Gain */}
                            <div className="text-left">
                              <div
                                className={`text-sm md:text-base lg:text-lg font-bold mb-1 ${
                                  parseFloat(trader.gain) >= 0
                                    ? "text-emerald-600 dark:text-emerald-400"
                                    : "text-red-600 dark:text-red-400"
                                }`}
                              >
                                {parseFloat(trader.gain) >= 0 ? "+" : ""}
                                {trader.gain}%
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">
                                Gain
                              </div>
                            </div>

                            {/* Risk */}
                            <div className="flex flex-col items-center">
                              <RiskBadge level={trader.risk} />
                              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                Risk
                              </div>
                            </div>

                            {/* Trades */}
                            <div className="text-center">
                              <div className="text-sm md:text-base lg:text-lg font-semibold text-gray-900 dark:text-gray-200 mb-1">
                                {trader.trades}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">
                                Active Days
                              </div>
                            </div>
                          </div>

                          {/* Footer with Copiers and View Button */}
                          <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-800">
                            <span className="text-xs md:text-sm lg:text-base text-gray-600 dark:text-gray-400 truncate mr-2">
                              {trader.copiers} Copiers
                            </span>
                            <Link
                              href={`/copy-experts/${trader.id}`}
                              className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs md:text-sm font-medium transition-all duration-300 flex-shrink-0"
                            >
                              View
                            </Link>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden md:flex -left-12 lg:-left-16 bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-600" />
                  <CarouselNext className="hidden md:flex -right-12 lg:-right-16 bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-600" />
                </Carousel>
              </div>
            </ScrollReveal>

            {/* View All Button */}
            <ScrollReveal direction="up" delay={0.5}>
              <div className="flex justify-center mt-12">
                <Link
                  href="/copy-experts"
                  className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-8 md:px-10 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50"
                >
                  View All Leaders
                </Link>
              </div>
            </ScrollReveal>
          </>
        )}
      </div>
    </section>
  );
};

export default TopLeadersSection;
