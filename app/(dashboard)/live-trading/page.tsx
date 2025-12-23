"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import DashboardNavbar from "@/components/main/DashboardNavbar";

export default function LiveSessionPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !mounted || !resolvedTheme) return;

    // Clear any existing content
    containerRef.current.innerHTML = "";

    // INVERTED: Your app shows dark UI when theme is "light" and light UI when theme is "dark"
    const tradingViewTheme = resolvedTheme === "light" ? "dark" : "light";
    const backgroundColor = tradingViewTheme === "dark" ? "#0F0F0F" : "#FFFFFF";

    console.log(
      "Loading Forex Cross Rates widget with theme:",
      tradingViewTheme
    );

    // Create widget container structure
    const widgetContainer = document.createElement("div");
    widgetContainer.className = "tradingview-widget-container__widget";
    containerRef.current.appendChild(widgetContainer);

    // Create script element
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      currencies: [
        "EUR",
        "USD",
        "JPY",
        "GBP",
        "CHF",
        "AUD",
        "CAD",
        "NZD",
        "CNY",
      ],
      isTransparent: false,
      colorTheme: tradingViewTheme,
      locale: "en",
      backgroundColor: backgroundColor,
    });

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [mounted, resolvedTheme]);

  if (!mounted || !resolvedTheme) {
    return (
      <div className="min-h-screen bg-[#1a1f2e] dark:bg-gray-50 transition-colors pt-20">
        <DashboardNavbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-gray-400 dark:text-gray-600">
            Loading live session...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1f2e] dark:bg-gray-50 transition-colors pt-20">
      <DashboardNavbar />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white dark:text-gray-900 mb-2">
            Live Trade Streaming
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <p className="text-gray-400 dark:text-gray-600">
              To view LiveTrading Sessions kindly contact support.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live Market Data</span>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="mb-6 bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/30 dark:border-blue-500/40 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="font-semibold text-blue-400 dark:text-blue-600 mb-1">
                Real-time Currency Exchange Rates
              </h3>
              <p className="text-sm text-blue-300 dark:text-blue-700">
                Powered by TradingView. Data updates automatically. Click on any
                currency pair for detailed charts and analysis.
              </p>
            </div>
          </div>
        </div>

        {/* Forex Cross Rates Widget */}
        <div className="mb-8">
          <div className="bg-[#151922] dark:bg-white rounded-lg border border-gray-700 dark:border-gray-300 overflow-hidden p-4">
            <div
              ref={containerRef}
              className="tradingview-widget-container w-full h-screen"
              key={`forex-cross-rates-${resolvedTheme}`}
            />
          </div>
        </div>

        

       
      </div>
    </div>
  );
}
