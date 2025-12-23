"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

export default function TradingChart({ symbol }: { symbol?: string | null }) {
  const container = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!container.current) return;

    // Clear old chart before rendering a new one
    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      // @ts-expect-error TradingView is injected by script
      new TradingView.widget({
        autosize: true,
        symbol: symbol,
        interval: "1",
        timezone: "Etc/UTC",
        theme: theme === "dark" ? "dark" : "light",
        style: "1",
        locale: "en",
        container_id: "tradingview_chart",
      });
    };

    container.current.appendChild(script);
  }, [symbol, theme]);

  return (
    <div
      id="tradingview_chart"
      className="w-full h-full bg-white dark:bg-gray-900 transition-colors"
      ref={container}
    ></div>
  );
}
