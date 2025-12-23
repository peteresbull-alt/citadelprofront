"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

interface TradingViewWidgetProps {
  symbol: string;
}

export default function TradingViewWidget({ symbol }: TradingViewWidgetProps) {
  const container = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!container.current || !mounted || !resolvedTheme) return;

    // Clear any existing content
    container.current.innerHTML = "";

    // INVERTED: Your app shows dark UI when theme is "light" and light UI when theme is "dark"
    const tradingViewTheme = resolvedTheme === "light" ? "dark" : "light";

    // Theme-specific colors
    const themeConfig =
      tradingViewTheme === "dark"
        ? {
            colorTheme: "dark",
            backgroundColor: "#0F0F0F",
            widgetFontColor: "#DBDBDB",
            fontColor: "rgb(106, 109, 120)",
            gridLineColor: "rgba(242, 242, 242, 0.06)",
          }
        : {
            colorTheme: "light",
            backgroundColor: "#FFFFFF",
            widgetFontColor: "#2A2E39",
            fontColor: "rgb(106, 109, 120)",
            gridLineColor: "rgba(42, 46, 57, 0.06)",
          };

    console.log("Loading Symbol Overview widget");
    console.log("Symbol:", symbol);
    console.log("Theme:", tradingViewTheme);

    // Create widget container structure
    const widgetContainer = document.createElement("div");
    widgetContainer.className = "tradingview-widget-container__widget";
    container.current.appendChild(widgetContainer);

    // Create script element
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [[symbol, `${symbol}|1D`]],
      chartOnly: false,
      width: "100%",
      height: "100%",
      locale: "en",
      dateRanges: ["1d|1", "1m|30", "3m|60", "12m|1D", "60m|1W", "all|1M"],
      ...themeConfig,
      lineWidth: 2,
      lineType: 0,
      chartType: "area",
      volumeUpColor: "rgba(34, 171, 148, 0.5)",
      volumeDownColor: "rgba(247, 82, 95, 0.5)",
      upColor: "#22ab94",
      downColor: "#f7525f",
      borderUpColor: "#22ab94",
      borderDownColor: "#f7525f",
      wickUpColor: "#22ab94",
      wickDownColor: "#f7525f",
      isTransparent: false,
      scalePosition: "right",
      scaleMode: "Normal",
      fontFamily:
        "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
      fontSize: "10",
      headerFontSize: "medium",
      noTimeScale: false,
      valuesTracking: "1",
      changeMode: "price-and-percent",
      autosize: true,
      hideDateRanges: false,
      hideMarketStatus: false,
      hideSymbolLogo: false,
    });

    container.current.appendChild(script);

    return () => {
      if (container.current) {
        container.current.innerHTML = "";
      }
    };
  }, [symbol, resolvedTheme, mounted]);

  if (!mounted || !resolvedTheme) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#1a1f2e] dark:bg-gray-100">
        <div className="text-gray-400 dark:text-gray-600">Loading chart...</div>
      </div>
    );
  }

  return (
    <div
      key={`symbol-overview-${symbol}-${resolvedTheme}`}
      ref={container}
      className="tradingview-widget-container w-full h-full"
    />
  );
}
