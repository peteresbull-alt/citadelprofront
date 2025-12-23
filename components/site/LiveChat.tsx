"use client";
import { useEffect } from "react";

// Extend Window interface for TypeScript
declare global {
  interface Window {
    _smartsupp: {
      key: string;
      [key: string]: unknown;
    };
    smartsupp?: SmartsuppFunction;
  }
}

interface SmartsuppFunction {
  (...args: unknown[]): void;
  _: unknown[];
}

const LiveChat = () => {
  useEffect(() => {
    // Check if smartsupp is already defined
    if (typeof window.smartsupp !== "undefined") return;

    // Initialize Smartsupp configuration
    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = "f838a1e625f20f77c708fc2779bac3fd7e3f574a";

    // Load Smartsupp script
    (function (d) {
      const smartsupp = function (...args: unknown[]) {
        smartsupp._.push(args);
      } as SmartsuppFunction;

      smartsupp._ = [];
      window.smartsupp = smartsupp;

      const s = d.getElementsByTagName("script")[0];
      const c = d.createElement("script");
      c.type = "text/javascript";
      c.charset = "utf-8";
      c.async = true;
      c.src = "https://www.smartsuppchat.com/loader.js?";

      if (s && s.parentNode) {
        s.parentNode.insertBefore(c, s);
      }
    })(document);
  }, []);

  return null;
};

export default LiveChat;
