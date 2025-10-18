"use client";

import { useUserProfile } from "@/hooks/useUserProfile";
import { getFirstLetter } from "@/lib/utils";
import {
  User,
  History,
  Wallet,
  HelpCircle,
  LogOut,
  Key,
  CheckCircle,
  CircleDollarSign,
  CirclePoundSterling,
  Moon,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";

const menuItems = [
  { label: "Personal Details", icon: User, href: "/profile-details" },
  { label: "Transaction History", icon: History, href: "/history" },
  { label: "Wallet", icon: Wallet, href: "/portfolio" },
  { label: "Payments", icon: CirclePoundSterling, href: "/payments" },
  { label: "Service Desk", icon: HelpCircle, href: "/service" },
  { label: "Withdraw", icon: CircleDollarSign, href: "/withdraw" },
  { label: "Change Password", icon: Key, href: "/change-password" },
];

export default function MenuPage() {
  const { user } = useUserProfile();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const logoutAction = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-800 dark:text-gray-100 font-poppins transition-colors duration-300">
      {/* Profile Header */}
      <div className="bg-teal-900 dark:bg-emerald-700 text-white p-6 flex items-center gap-4 shadow-md">
        <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-800 flex items-center justify-center text-lg font-bold">
          {getFirstLetter(user?.first_name)}
        </div>
        <div>
          <h2 className="font-semibold text-lg">
            {user?.first_name} {user?.last_name}
          </h2>
          <p className="text-sm flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
            Live account
          </p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 p-4 mb-20">
        <h3 className="text-gray-600 dark:text-gray-400 mb-4 font-medium max-w-[900px] ml-auto">
          Menu
        </h3>
        <div className="space-y-4 max-w-[900px] ml-auto">
          {menuItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-[#121212] shadow-sm hover:bg-gray-100 dark:hover:bg-[#1e1e1e] transition-colors"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-teal-700 dark:text-emerald-400" />
                <span>{item.label}</span>
              </div>
            </Link>
          ))}

          {/* Account Verification (if not verified) */}
          {!user?.is_verified && (
            <Link
              href={"/account-verification"}
              className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-[#121212] shadow-sm hover:bg-gray-100 dark:hover:bg-[#1e1e1e] transition-colors"
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-teal-700 dark:text-emerald-400" />
                <span>Account Verification</span>
              </div>
            </Link>
          )}

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-[#121212] shadow-sm transition-colors">
            <div className="flex items-center gap-3">
              {theme === "dark" ? (
                <Moon className="w-5 h-5 text-emerald-400" />
              ) : (
                <Sun className="w-5 h-5 text-emerald-400" />
              )}
              <span>Dark Mode</span>
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) =>
                setTheme(checked ? "dark" : "light")
              }
            />
          </div>

          {/* Logout */}
          <div
            onClick={() => logoutAction()}
            className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-[#121212] shadow-sm hover:bg-gray-100 dark:hover:bg-[#1e1e1e] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5 text-teal-700 dark:text-red-400" />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
