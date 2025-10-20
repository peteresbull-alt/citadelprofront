"use client";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/10 dark:bg-black/30 border-b border-emerald-500/20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold  tracking-tight flex items-center gap-1 text-emerald-600 dark:bg-gradient-to-r dark:from-white dark:via-emerald-200 dark:to-emerald-400 dark:bg-clip-text dark:text-transparent"
        >
          <Image
            alt="logo"
            src={"/images/logo.png"}
            className="h-10 w-auto"
            width={1000}
            height={1000}
          />
          <span>Citadel</span>{" "}
          <sup className="dark:text-white text-black">pro</sup>
        </Link>

        {/* Desktop Menu */}

        {/* Mobile Menu Button */}

        <div className="flex gap-2 items-center">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 rounded-full border border-emerald-400/30 hover:bg-emerald-500/10 transition"
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4 text-emerald-500" />
            ) : (
              <Sun className="w-4 h-4 text-emerald-400" />
            )}
          </button>
          <Button
            asChild
            className="bg-green-500  rounded-full  dark:bg-gradient-to-l  dark:from-white dark:via-emerald-200 dark:to-emerald-400 "
          >
            <Link href={"/login"} className="dark:text-black text-white">
              Sign In
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
