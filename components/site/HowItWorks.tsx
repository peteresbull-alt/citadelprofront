"use client";
import Image from "next/image";
import React, { useState } from "react";
import ScrollReveal from "./ScrollReveal";
// import ScrollReveal from "@/components/ui/ScrollReveal"; // ✅ Import ScrollReveal wrapper

const HowItWorks = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const features = [
    {
      title: "Browse Our Leaders",
      description:
        "Discover top-rated options traders using over 40 filters—sort by performance, risk score, strategy type (long calls, puts, spreads), contract volume, and more.",
      image: "/images/support.png",
    },
    {
      title: "Copy in Real Time",
      description:
        "When a leader places an options trade—whether a single contract or a complex spread—your linked account mirrors that exact action instantly.",
      image: "/images/rates.png",
    },
    {
      title: "Speedy Transactions",
      description:
        "We achieved an average transaction speed of 2–10 minutes to ensure you get the best out of the crypto market.",
      image: "/images/security.png",
    },
    {
      title: "Monitor, Adjust, Automate",
      description:
        "Track performance, customize contract sizes, set stop-loss levels, or disengage at any time. We offer risk tools like Backtest simulations, AutoGuard™, and real-time contract alerts.",
      image: "/images/speed.png",
    },
  ];

  return (
    <section className="bg-white dark:bg-black py-24 px-6 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works: Copying Stocks Made Easy
            </h2>
            <div className="w-24 h-[2px] bg-emerald-400 mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
              Discover why our platform offers unmatched performance and
              transparency in stock trading.
            </p>
          </div>
        </ScrollReveal>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => {
            const isHovered = hoveredCard === index;
            return (
              <ScrollReveal key={index} direction="up" delay={0.1 * index}>
                <div
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`group relative rounded-3xl p-2 text-center border-2 transition-all duration-500 hover:shadow-xl ${
                    isHovered
                      ? "border-emerald-400 shadow-emerald-400/30"
                      : "border-transparent"
                  }`}
                >
                  {/* Image */}
                  <ScrollReveal key={index} direction="up" delay={0.4 * index}>
                    <div className="flex justify-center mb-2">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        height={316}
                        width={552}
                        className="w-25 h-25 object-contain transition-transform duration-500 group-hover:scale-120"
                      />
                    </div>
                  </ScrollReveal>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Glow Effect */}
                  {isHovered && (
                    <div className="absolute inset-0 rounded-3xl bg-emerald-400/5 pointer-events-none transition-all duration-300"></div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
