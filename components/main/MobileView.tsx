"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/lib/constants";
import { BeatLoader } from "react-spinners";

export interface Instrument {
  symbol: string;
  flag?: string;
  change: number;
  bid: number;
  ask: number;
  low: number;
  high: number;
  time: string;
}

export default function MarketWatch() {
  const [assets, setAssets] = useState<Record<string, Instrument[]>>({});
  const [filter, setFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const setInstrument = useInstrumentStore((s) => s.setInstrument);
  const router = useRouter();

  useEffect(() => {
    const fetchAssets = async () => {
      const authToken = localStorage.getItem("authToken");

      try {
        setLoading(true);
        const res = await fetch(`${BACKEND_URL}/assets/grouped/`, {
          method: "GET",
          headers: { Authorization: `Token ${authToken}` },
        });
        if (!res.ok) throw new Error("Failed to fetch assets");
        const data: Record<string, Instrument[]> = await res.json();
        setAssets(data);
      } catch (error) {
        console.error("Error fetching assets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssets();
  }, []);

  const displayedAssets: Instrument[] = useMemo(() => {
    let allAssets: Instrument[] = [];

    if (filter === "All") {
      Object.values(assets).forEach((list) => {
        allAssets = allAssets.concat(list);
      });
    } else {
      allAssets = assets[filter] ?? [];
    }

    if (searchQuery.trim()) {
      allAssets = allAssets.filter((item) =>
        item.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return allAssets;
  }, [assets, filter, searchQuery]);

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center bg-teal-900 dark:bg-gray-800 text-white px-3 md:px-4 py-2 md:py-3 shadow-sm">
        <div onClick={() => router.back()} className="cursor-pointer mr-2">
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <h1 className="text-base md:text-lg font-semibold">{filter} Market</h1>
      </div>

      {/* Search + Filters */}
      <div className="p-2 md:p-3 border-b border-gray-200 dark:border-gray-700">
        {/* Search Bar */}
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded px-2 py-2 md:px-3 md:py-3 mb-2">
          <Search size={16} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent flex-1 outline-none text-xs md:text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 text-xs overflow-x-auto pb-1">
          <button
            key="All"
            onClick={() => setFilter("All")}
            className={`px-2 md:px-4 py-1 rounded-full text-xs md:text-sm font-medium transition ${
              filter === "All"
                ? "bg-[#00B074] text-white shadow"
                : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            All
          </button>

          {Object.keys(assets).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-2 md:px-4 py-1 rounded-full text-xs md:text-sm font-medium transition ${
                filter === tab
                  ? "bg-[#00B074] text-white shadow"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex flex-1 items-center justify-center mt-20">
          <BeatLoader color="#0f766e" size={10} />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          {displayedAssets.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
              No instruments found.
            </div>
          ) : (
            displayedAssets.map((item) => (
              <div
                onClick={() => {
                  setInstrument(item);
                  router.push(`/instrument/${item.symbol}`);
                }}
                key={item.symbol}
                className="cursor-pointer px-2 md:px-3 py-2 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                {/* Left Side */}
                <div>
                  <div className="flex items-center gap-2">
                    {item.flag && (
                      <Image
                        src={item.flag}
                        width={28}
                        height={28}
                        alt={item.symbol}
                        className="md:w-[40px] md:h-[40px]"
                      />
                    )}

                    <span className="font-semibold text-xs md:text-base">
                      {item.symbol}
                    </span>
                    <span
                      className={`text-[10px] md:text-xs font-medium ${
                        item.change >= 0 ? "text-[#00B074]" : "text-red-500"
                      }`}
                    >
                      {item.change >= 0 ? "+" : ""}
                      {item.change}%
                    </span>
                  </div>
                  <div className="text-[10px] md:text-[11px] text-gray-500 dark:text-gray-400">
                    {item.time} &nbsp; L:{item.low} &nbsp; H:{item.high}
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-1 md:gap-2">
                  <button className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-[10px] md:text-sm shadow">
                    {item.bid}
                  </button>
                  <button className="px-2 py-1 bg-[#00B074] hover:bg-[#00915e] text-white rounded text-[10px] md:text-sm shadow">
                    {item.ask}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
