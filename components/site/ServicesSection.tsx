"use client";
import React, { useState } from "react";
import {
  DollarSign,
  Send,
  Clock,
  LineChart,
  Shield,
  GraduationCap,
  Copy,
  Globe,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";
// import ScrollReveal from "@/components/ui/ScrollReveal"; // ✅ Scroll animation wrapper

const ServicesSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const steps = [
    {
      number: "01",
      title: "Global Reach & Regulation",
      description:
        "Join a trusted community spanning 150+ countries with millions of accounts and leaders. Regulated globally, offering secure and reliable access to options and stock contracts.",
      icon: Globe,
    },
    {
      number: "02",
      title: "Stock-Focused Copy Trading",
      description:
        "Tailor your strategy: copy entire options chains, specific tickers, or tactical contracts—such as calls, puts, or spreads. Manage risk, leverage, and exposure—automatically.",
      icon: Copy,
    },
    {
      number: "03",
      title: "Advanced Tools",
      description:
        "Beyond copying, leverage in-house features like Backtest, Watchlist, Risk-score, and AutoGuard™ tailored for options strategies.",
      icon: LineChart,
    },
    {
      number: "04",
      title: "Stay In Control",
      description:
        "Each copy trade adapts to your capital, risk appetite, and contract preferences—even across varying strike prices and expiration dates.",
      icon: Shield,
    },
    {
      number: "05",
      title: "Learning through Copying",
      description:
        "Engage directly with leaders—understand their rationale for options trades, ask questions, learn in a social investing environment.",
      icon: GraduationCap,
    },
  ];

  return (
    <section className="bg-white dark:bg-black py-20 px-6 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Trade Stocks on Citadel?
            </h2>
            <p className="text-gray-600 dark:text-white text-lg">
              Learn Steps to Capitalize on Price Differences and Maximize Your
              Returns
            </p>
          </div>
        </ScrollReveal>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => {
            const isActive = index === 1;
            const isHovered = hoveredCard === index;
            const Icon = step.icon;

            return (
              <ScrollReveal key={index} direction="up" delay={0.1 * index}>
                <div
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative z-10"
                >
                  {/* Step Number Badge */}
                  <div className="flex justify-center mb-6">
                    <div
                      className={`px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 ${
                        isActive
                          ? "bg-emerald-400 text-white shadow-lg shadow-emerald-400/50"
                          : isHovered
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-gray-300 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      }`}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`relative bg-gray-200 dark:bg-gray-900 rounded-2xl p-8 min-h-64 transition-all duration-300 ${
                      isActive
                        ? "border-2 border-emerald-400 shadow-xl shadow-emerald-400/20"
                        : isHovered
                        ? "border-2 border-emerald-300 shadow-lg"
                        : "border-2 dark:border-gray-800 border-gray-200"
                    }`}
                  >
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${
                        isActive || isHovered
                          ? "bg-emerald-400/20"
                          : "bg-gray-800/20 dark:bg-gray-700"
                      }`}
                    >
                      <Icon
                        className={`w-7 h-7 transition-colors duration-300 ${
                          isActive || isHovered
                            ? "text-emerald-400"
                            : "text-gray-400"
                        }`}
                      />
                    </div>

                    {/* Content */}
                    <h3 className="text-black dark:text-white text-xl font-semibold mb-3">
                      {step.title}
                    </h3>
                    <p className="text-black dark:text-gray-200 text-sm leading-relaxed">
                      {step.description}
                    </p>

                    {/* Hover Glow Effect */}
                    {(isActive || isHovered) && (
                      <div className="absolute inset-0 bg-emerald-400/5 rounded-2xl pointer-events-none"></div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
