"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { BACKEND_URL } from "@/lib/constants";
import Image from "next/image";
import {
  Activity,
  Gift,
  Medal,
  History,
  ShoppingCart,
  Users,
} from "lucide-react";

interface UserProfile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  account_id: string;
  balance: string;
  formatted_balance: string;
  is_verified: boolean;
}

const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const response = await fetch(`${BACKEND_URL}/withdrawals/profile/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setUserProfile(data.user);
        }
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const getInitials = () => {
    if (userProfile?.first_name && userProfile?.last_name) {
      return `${userProfile.first_name[0]}${userProfile.last_name[0]}`.toUpperCase();
    } else if (userProfile?.email) {
      return userProfile.email.substring(0, 2).toUpperCase();
    }
    return "U";
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      href: "/portfolio",
    },
    {
      id: "deposit",
      label: "Deposit",
      href: "/deposit",
    },
    {
      id: "withdrawal",
      label: "Withdrawal",
      href: "/withdraw",
    },
    {
      id: "news",
      label: "Market News",
      href: "/news",
    },
    {
      id: "settings",
      label: "Settings",
      href: "/settings",
    },
  ];

  const tradingSection = [
    {
      id: "copy-experts",
      label: "Pro Traders",
      href: "/copy-experts",
    },
    // {
    //   id: "copy-trade-history",
    //   label: "Copy Trade History",
    //   href: "/copy-trade-history",
    // },
    {
      id: "trade",
      label: "Trade Stocks",
      href: "/stock",
    },
    // {
    //   id: "orders",
    //   label: "Current Orders",
    //   href: "/orders",
    // },
    {
      id: "trade-history",
      label: "Trade History",
      href: "/history",
    },
    // {
    //   id: "trade-history",
    //   label: "Stock History",
    //   href: "/trade-history",
    // },
    {
      id: "signal",
      label: "Signals",
      href: "/signals",
    },
    {
      id: "live-trading",
      label: "Live Trading",
      href: "/live-trading",
    },
    {
      id: "referral",
      label: "Referral Program",
      href: "/referral",
    },
    {
      id: "notifications",
      label: "Notifications",
      href: "/notifications",
    },
  ];

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        id="hamburgerMenu"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 p-2 rounded-lg bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-slate-300 transition-colors shadow-lg"
      >
        {isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 dark:bg-black/30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-[#1a2332] dark:bg-white text-white dark:text-slate-900 transition-all duration-300 z-40 flex flex-col border-r border-slate-700/50 dark:border-slate-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="py-2 flex justify-center items-center">
          <Link
            href="/"
            className=" hidden dark:flex text-2xl md:text-4xl font-extrabold self-center tracking-tight items-center gap-1 text-emerald-600 dark:bg-gradient-to-r dark:from-white dark:via-emerald-200 dark:to-emerald-600 dark:bg-clip-text dark:text-transparent"
          >
            <Image
              alt="logo"
              src={"/images/logo_dark.png"}
              className="h-15 md:h-20 w-auto"
              width={1000}
              height={1000}
            />
          </Link>
          <Link
            href="/"
            className=" flex dark:hidden text-2xl md:text-4xl font-extrabold self-center tracking-tight items-center gap-1 text-emerald-600 dark:bg-gradient-to-r dark:from-white dark:via-emerald-200 dark:to-emerald-600 dark:bg-clip-text dark:text-transparent"
          >
            <Image
              alt="logo"
              src={"/images/logo_light.png"}
              className="h-15 md:h-20 w-auto"
              width={1000}
              height={1000}
            />
          </Link>
        </div>

        {/* Navigation - Scrollable */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar">
          {/* Main Menu Items */}
          <div className="space-y-1 mb-6">
            {menuItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href === "/stocks" && pathname?.startsWith("/stocks/"));

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-emerald-600 text-white"
                      : "text-slate-300 dark:text-slate-600 hover:bg-slate-700/30 dark:hover:bg-slate-100"
                  }`}
                >
                  {/* Icons */}
                  {item.id === "dashboard" && (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  )}
                  {item.id === "deposit" && (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                      />
                    </svg>
                  )}
                  {item.id === "withdrawal" && (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  )}
                  {item.id === "news" && (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                      />
                    </svg>
                  )}
                  {item.id === "settings" && (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Trading Section */}
          <div>
            <p className="px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Trading
            </p>
            <div className="space-y-1 mt-2">
              {tradingSection.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href === "/stocks" && pathname?.startsWith("/stocks/"));

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-green-500 text-white"
                        : "text-slate-300 dark:text-slate-600 hover:bg-slate-700/30 dark:hover:bg-slate-100"
                    }`}
                  >
                    {/* Icons */}
                    {item.id === "copy-experts" && (
                      <Medal className="h-5 w-5" />
                    )}
                    {item.id === "copy-trade-history" && (
                      <Users className="w-5 h-5" />
                    )}
                    {item.id === "trade" && (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    )}
                    {item.id === "orders" && (
                      <ShoppingCart className="w-5 h-5" />
                    )}
                    {item.id === "trade-history" && (
                      <History className="w-5 h-5" />
                    )}
                    {item.id === "signal" && <Activity className="w-5 h-5" />}
                    {item.id === "live-trading" && (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                    {item.id === "referral" && <Gift className="w-5 h-5" />}
                    {item.id === "notifications" && (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                    )}
                    <span className="font-medium flex-1">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-700/50 dark:border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 dark:from-amber-500 dark:to-amber-700 flex items-center justify-center text-white font-bold text-lg">
              {getInitials()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white dark:text-slate-900 truncate">
                {userProfile?.full_name || "User"}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                {userProfile?.email || ""}
              </p>
            </div>
          </div>
        </div>
      </aside>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.3);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(100, 116, 139, 0.5);
          border-radius: 10px;
          transition: background 0.2s ease;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.7);
        }

        :global(.dark) .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(226, 232, 240, 0.3);
        }

        :global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.5);
        }

        :global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 116, 139, 0.7);
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(100, 116, 139, 0.5) rgba(30, 41, 59, 0.3);
        }

        :global(.dark) .custom-scrollbar {
          scrollbar-color: rgba(148, 163, 184, 0.5) rgba(226, 232, 240, 0.3);
        }
      `}</style>
    </>
  );
};

export default DashboardSidebar;
