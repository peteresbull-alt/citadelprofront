"use client";
import React from "react";
import { Globe } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const GlobalStatsSection = () => {
  const stats = [
    {
      value: "150+",
      label: "Countries",
    },
    {
      value: "2M+",
      label: "Accounts",
    },
    {
      value: "800K+",
      label: "Leaders",
    },
  ];

  return (
    <section className=" py-16 px-6 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <ScrollReveal key={index} direction="up" delay={0.1 * index}>
              <div className="bg-gray-200  dark:bg-gray-800 rounded-2xl p-8 text-center border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-400 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/20">
                <h3 className="text-4xl lg:text-5xl font-bold text-emerald-400 mb-2">
                  {stat.value}
                </h3>
                <p className="text-black dark:text-gray-300 text-lg font-medium">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Regulated Badge */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="flex items-center justify-center gap-3 text-black dark:text-gray-300">
            <Globe className="w-6 h-6 text-emerald-400" />
            <span className="text-lg font-medium">Regulated Globally</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default GlobalStatsSection;
