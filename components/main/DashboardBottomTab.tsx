"use client";

import { BarChart2, Briefcase, Menu, Users, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const DashboardBottomTab = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div
      className="
        lg:hidden fixed bottom-0 left-0 right-0 h-16
        border-t border-gray-300 dark:border-gray-800
        flex justify-around items-center
        bg-teal-900 dark:bg-[#0b0b0b]
        text-white dark:text-gray-200
        shadow-inner dark:shadow-[0_-2px_10px_rgba(0,0,0,0.5)]
        transition-colors duration-300
        backdrop-blur-md
      "
    >
      {[
        { name: "Instruments", icon: BarChart2, href: "/instrument" },
        { name: "COOMA", icon: Users, href: "/social" },
        { name: "Portfolio", icon: Briefcase, href: "/portfolio" },
        { name: "Deposit", icon: Wallet, href: "/deposit" },
        { name: "Menu", icon: Menu, href: "/menu" },
      ].map(({ name, icon: Icon, href }) => (
        <button
          key={name}
          onClick={() => router.push(href)}
          className="
            flex flex-col items-center justify-center
            transition-colors duration-200
            text-gray-100 dark:text-gray-300
            hover:text-emerald-400 dark:hover:text-emerald-500
          "
        >
          <Icon className="h-[24px] w-[24px]" />
          <span className="mt-1 text-[11px]">{name}</span>
        </button>
      ))}
    </div>
  );
};

export default DashboardBottomTab;
