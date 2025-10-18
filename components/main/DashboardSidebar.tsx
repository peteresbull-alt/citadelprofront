"use client";

import { BarChart2, Briefcase, Menu, Users, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const DashboardSidebar = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <aside
      className="
        hidden lg:flex lg:flex-col lg:w-20 lg:border-r
        bg-white dark:bg-[#0b0b0b]
        border-gray-200 dark:border-gray-800
        py-6 space-y-6 shadow-sm dark:shadow-[0_0_10px_rgba(0,0,0,0.4)]
        fixed top-0 left-0 h-screen transition-colors duration-300
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
            flex flex-col items-center justify-center w-full py-2
            text-gray-600 dark:text-gray-300
            hover:text-teal-600 dark:hover:text-emerald-400
            transition-colors duration-200
          "
        >
          <Icon className="h-[22px] w-[22px]" />
          <span className="mt-1 text-[10px]">{name}</span>
        </button>
      ))}
    </aside>
  );
};

export default DashboardSidebar;
