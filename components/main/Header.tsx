"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Globe, Moon } from "lucide-react";

export default function Header() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-GB", { hour12: false })); // 24h
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white">
      {/* Left: Logo */}
      <div className="flex items-center gap-2 font-bold text-lg">
        <div className="w-6 h-6 rounded-md bg-primary"></div>
        <span>
          Citadel<sup className="text-primary">pro</sup>
        </span>
      </div>

      {/* Middle: Clock + icons */}
      <div className="flex items-center gap-3 text-sm text-gray-700">
        <div className="flex items-center gap-1 font-mono">
          {time} <ChevronDown size={14} className="text-gray-500" />
        </div>
        <Moon
          size={16}
          className="cursor-pointer text-gray-600 hover:text-primary"
        />
        <Globe
          size={16}
          className="cursor-pointer text-gray-600 hover:text-primary"
        />
      </div>

      {/* Right: Buttons */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="text-sm px-3 py-1 border-gray-300 text-gray-700"
        >
          Sign Up
        </Button>
        <Button className="bg-[#00B074] hover:bg-[#00925f] text-white text-sm px-3 py-1">
          Log In
        </Button>
      </div>
    </header>
  );
}
