"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function TradingChart({ symbol }: { symbol?: string | null }) {
  const container = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const el = container.current;
    if (!el) return;

    // Clear old chart before rendering a new one
    el.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      if (!window.TradingView) return; // Ensure TradingView loaded
      new window.TradingView.widget({
        autosize: true,
        symbol: symbol || "EURUSD",
        interval: "1",
        timezone: "Etc/UTC",
        theme: theme === "dark" ? "dark" : "light",
        style: "1",
        locale: "en",
        container_id: "tradingview_chart",
      });
    };

    el.appendChild(script);

    // ✅ Safe cleanup
    return () => {
      if (container.current) {
        container.current.innerHTML = "";
      }
    };
  }, [symbol, theme]);

  return (
    <div
      id="tradingview_chart"
      className="w-full h-full bg-white dark:bg-gray-900 transition-colors"
      ref={container}
    ></div>
  );
}
