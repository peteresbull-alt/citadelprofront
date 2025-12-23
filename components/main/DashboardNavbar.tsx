"use client";

import { Bell, Moon, Sun, Settings, LogOut, Key } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { BACKEND_URL } from "@/lib/constants";
import Link from "next/link";

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

const DashboardNavbar = () => {
  const router = useRouter();
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");

    // Fetch user profile
    fetchUserProfile();

    // Fetch unread notification count
    fetchUnreadCount();

    // Poll for unread count every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);

    return () => clearInterval(interval);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const fetchUnreadCount = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const response = await fetch(
        `${BACKEND_URL}/notifications/unread-count/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUnreadCount(data.unread_count);
      }
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleNotificationClick = () => {
    router.push("/notifications");
    setTimeout(fetchUnreadCount, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/login");
  };

  const getInitials = () => {
    if (userProfile?.first_name && userProfile?.last_name) {
      return `${userProfile.first_name[0]}${userProfile.last_name[0]}`.toUpperCase();
    } else if (userProfile?.email) {
      return userProfile.email.substring(0, 2).toUpperCase();
    }
    return "P";
  };

  if (!mounted) return null;

  return (
    <nav className="w-full fixed top-0 left-0 right-0 bg-[#061124] dark:bg-slate-50 text-slate-100 dark:text-slate-900 transition-colors z-30 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
      {/* Left side - Wallet Balance */}
      <div className=""></div>
      

      {/* Right side */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Theme Toggle */}
        <button
          id="themeForToggle"
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-slate-800/40 dark:bg-slate-200/60 hover:bg-slate-800/60 dark:hover:bg-slate-200/80 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-slate-700" />
          )}
        </button>

        {/* Notifications */}
        <div
          onClick={handleNotificationClick}
          className="relative cursor-pointer"
          id="notificationToggle"
        >
          <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-slate-200 dark:text-slate-900 cursor-pointer hover:text-slate-300 dark:hover:text-slate-700 transition-colors" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs w-4 h-4 sm:w-5 sm:h-5 rounded-full grid place-items-center font-medium">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </div>

        {/* User Avatar with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 focus:outline-none"
          >
            <div
              id="profileForToggle"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full ring-2 ring-slate-700/40 dark:ring-slate-300 bg-gradient-to-br from-amber-600 to-amber-800 dark:from-amber-500 dark:to-amber-700 overflow-hidden cursor-pointer"
            >
              <div className="w-full h-full flex items-center justify-center text-xs sm:text-sm font-bold text-white">
                {getInitials()}
              </div>
            </div>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-[#1E2A3A] dark:bg-white rounded-lg shadow-xl border border-slate-700/50 dark:border-slate-200 overflow-hidden">
              {/* User Info Section */}
              <div className="p-4 border-b border-slate-700/50 dark:border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 dark:from-amber-500 dark:to-amber-700 flex items-center justify-center text-white font-bold text-lg">
                    {getInitials()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white dark:text-slate-900 truncate">
                      {userProfile?.full_name || "User"}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-600 truncate">
                      {userProfile?.email || ""}
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                {/* Change Password */}
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    router.push("/settings");
                  }}
                  className="w-full px-4 py-3 flex items-center gap-3 text-slate-300 dark:text-slate-700 hover:bg-slate-700/30 dark:hover:bg-slate-100 transition-colors"
                >
                  <Key className="w-5 h-5" />
                  <span className="font-medium">Change password</span>
                </button>

                {/* Settings */}
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    router.push("/settings");
                  }}
                  className="w-full px-4 py-3 flex items-center gap-3 text-slate-300 dark:text-slate-700 hover:bg-slate-700/30 dark:hover:bg-slate-100 transition-colors"
                >
                  <Settings className="w-5 h-5" />
                  <span className="font-medium">Settings</span>
                </button>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 flex items-center gap-3 text-slate-300 dark:text-slate-700 hover:bg-slate-700/30 dark:hover:bg-slate-100 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
