"use client";
import React, { useState } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import Link from "next/link";
import { TrendingUp, TrendingDown } from "lucide-react";

const InstrumentsSection = () => {
  const [activeTab, setActiveTab] = useState("Most Popular");

  const tabs = ["Most Popular", "Commodities", "Indices", "Stocks", "Crypto"];

  const instruments = {
    "Most Popular": [
      {
        name: "Apple",
        logo: "https://logo.clearbit.com/apple.com",
        buyPrice: "192.50",
        sellPrice: "192.30",
      },
      {
        name: "Tesla",
        logo: "https://logo.clearbit.com/tesla.com",
        buyPrice: "245.80",
        sellPrice: "245.55",
      },
      {
        name: "Microsoft",
        logo: "https://logo.clearbit.com/microsoft.com",
        buyPrice: "378.90",
        sellPrice: "378.65",
      },
    ],
    Commodities: [
      {
        name: "Gold",
        logo: "/images/gold_image.webp",
        buyPrice: "2045.30",
        sellPrice: "2044.80",
      },
      {
        name: "Silver",
        logo: "/images/silver_image.jpg",
        buyPrice: "24.15",
        sellPrice: "24.10",
      },
      {
        name: "Oil",
        logo: "https://logo.clearbit.com/exxonmobil.com",
        buyPrice: "78.90",
        sellPrice: "78.75",
      },
    ],
    Indices: [
      {
        name: "S&P 500",
        logo: "https://logo.clearbit.com/spglobal.com",
        buyPrice: "4567.80",
        sellPrice: "4567.20",
      },
      {
        name: "NASDAQ",
        logo: "https://logo.clearbit.com/nasdaq.com",
        buyPrice: "14235.50",
        sellPrice: "14234.80",
      },
      {
        name: "Dow Jones",
        logo: "https://logo.clearbit.com/dowjones.com",
        buyPrice: "35678.90",
        sellPrice: "35677.50",
      },
    ],
    Stocks: [
      {
        name: "Amazon",
        logo: "https://logo.clearbit.com/amazon.com",
        buyPrice: "145.60",
        sellPrice: "145.40",
      },
      {
        name: "Google",
        logo: "https://logo.clearbit.com/google.com",
        buyPrice: "138.75",
        sellPrice: "138.55",
      },
      {
        name: "Meta",
        logo: "https://logo.clearbit.com/meta.com",
        buyPrice: "325.20",
        sellPrice: "325.00",
      },
    ],
    Crypto: [
      {
        name: "Bitcoin",
        logo: "/images/bitcoin.png",
        buyPrice: "43250.00",
        sellPrice: "43200.00",
      },
      {
        name: "Ethereum",
        logo: "https://logo.clearbit.com/ethereum.org",
        buyPrice: "2285.50",
        sellPrice: "2283.00",
      },
      {
        name: "BNB",
        logo: "https://logo.clearbit.com/binance.com",
        buyPrice: "315.80",
        sellPrice: "315.40",
      },
    ],
  };

  return (
    <section className="dark:bg-gray-900  py-20 px-6 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="mb-8">
            <h2 className="text-4xl lg:text-5xl font-bold dark:text-white text-gray-900 mb-6">
              Wide variety of instruments
            </h2>
            <p className="dark:text-gray-300 text-gray-600 text-lg max-w-3xl leading-relaxed mb-8">
              Copy the exact instruments top traders use — not just vague
              signals. Citadel Markets Pro supports a broad set of tradable assets and
              contract types so you can mirror strategies precisely and control
              your exposure.
            </p>
            <Link
              href={"/register"}
              className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50"
            >
              Get Started
            </Link>
          </div>
        </ScrollReveal>

        {/* Trading Dashboard */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="dark:bg-gray-800  rounded-3xl p-6 md:p-8 shadow-2xl border dark:border-gray-700 border-gray-200">
            {/* Tabs */}
            <div className="flex flex-wrap gap-3 md:gap-4 mb-8 border-b dark:border-gray-700 border-gray-300 pb-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                      : "dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-gray-900 dark:hover:bg-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Instruments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {instruments[activeTab as keyof typeof instruments].map(
                (instrument, index) => {
                  return (
                    <div
                      key={index}
                      className="dark:bg-gray-700 bg-gray-50 rounded-2xl p-4 md:p-6 border-2 dark:border-gray-600 border-gray-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/20"
                    >
                      {/* Logo & Name */}
                      <div className="flex flex-col items-center mb-4 md:mb-6">
                        <div className="w-14 h-14 md:w-16 md:h-16 dark:bg-gray-600 bg-gray-200 rounded-full flex items-center justify-center mb-3 overflow-hidden">
                          <Image
                            src={instrument.logo}
                            alt={instrument.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover rounded-full"
                            unoptimized
                          />
                        </div>
                        <h3 className="dark:text-white text-gray-900 text-lg md:text-xl font-semibold">
                          {instrument.name}
                        </h3>
                      </div>

                      {/* Buy/Sell Buttons */}
                      <div className="grid grid-cols-2 gap-2 md:gap-3">
                        <div className="dark:bg-emerald-500/20 bg-emerald-100 rounded-xl p-3 md:p-4 text-center border dark:border-emerald-500/30 border-emerald-300">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <TrendingUp className="w-3 h-3 md:w-4 md:h-4 dark:text-emerald-400 text-emerald-600" />
                            <p className="dark:text-emerald-400 text-emerald-600 text-base md:text-lg font-bold">
                              {instrument.buyPrice}
                            </p>
                          </div>
                          <p className="dark:text-emerald-300 text-emerald-500 uppercase text-xs font-medium">
                            Buy
                          </p>
                        </div>
                        <div className="dark:bg-red-500/20 bg-red-100 rounded-xl p-3 md:p-4 text-center border dark:border-red-500/30 border-red-300">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <TrendingDown className="w-3 h-3 md:w-4 md:h-4 dark:text-red-400 text-red-600" />
                            <p className="dark:text-red-400 text-red-600 text-base md:text-lg font-bold">
                              {instrument.sellPrice}
                            </p>
                          </div>
                          <p className="text-red-500 dark:text-red-300 uppercase text-xs font-medium">
                            Sell
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default InstrumentsSection;
