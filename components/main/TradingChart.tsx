"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

// ✅ Define a minimal TradingView type locally
type TradingViewAPI = {
  widget: new (options: Record<string, unknown>) => void;
};

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
      const w = window as unknown as { TradingView?: TradingViewAPI };
      if (!w.TradingView) return; // ✅ Type-safe check

      new w.TradingView.widget({
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

    // ✅ Cleanup
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
