"use client";
import React from "react";
import Image from "next/image";
import ScrollReveal from "@/components/site/ScrollReveal";

const LiquidityProvidersSection = () => {
  // Row 1 - Moving Left
  const row1Providers = [
    { name: "Banks", logo: "/logos/logo_1.png" },
    { name: "Banks", logo: "/logos/logo_4.png" },
    { name: "Banks", logo: "/logos/logo_5.png" },
  ];

  // Row 2 - Moving Right
  const row2Providers = [
    { name: "Banks", logo: "/logos/logo_6.png" },
    { name: "Banks", logo: "/logos/logo_8.png" },
    { name: "Banks", logo: "/logos/logo_9.png" },
    { name: "Banks", logo: "/logos/logo_10.png" },
  ];

  // Row 3 - Moving Left
  const row3Providers = [
    { name: "Banks", logo: "/logos/logo_11.png" },
    { name: "Banks", logo: "/logos/logo_12.png" },
    { name: "Banks", logo: "/logos/logo_13.png" },
    { name: "Banks", logo: "/logos/logo_15.png" },
  ];

  const MarqueeRow = ({
    providers,
    direction,
  }: {
    providers: { name: string; logo: string }[];
    direction: "left" | "right";
  }) => {
    // Duplicate providers for seamless loop
    const duplicatedProviders = [...providers, ...providers, ...providers];

    return (
      <div className="relative overflow-hidden py-6">
        <div
          className={`flex gap-8 ${
            direction === "left"
              ? "animate-marquee-left"
              : "animate-marquee-right"
          }`}
        >
          {duplicatedProviders.map((provider, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-white dark:bg-gray-900 rounded-xl p-6 flex items-center justify-center border-2 border-gray-200 dark:border-gray-800 hover:border-emerald-400 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-emerald-400/20"
            >
              <div className="relative flex justify-center items-center w-full h-full transition-all duration-300">
                <Image
                  src={provider.logo}
                  alt={provider.name}
                  width={200}
                  height={200}
                  className="object-cover h-20"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="dark:bg-black bg-gray-50 py-20 px-6 transition-colors duration-500 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none"></div>

      <div className="max-w-[100vw] mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wide">
              Liquidity Providers
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Citadel Markets Pro currently has a variety of liquidity
              providers, including but not limited to:
            </p>
          </div>
        </ScrollReveal>

        {/* Marquee Rows */}
        <div className="space-y-4">
          {/* Row 1 - Left */}
          <ScrollReveal direction="up" delay={0.2}>
            <MarqueeRow providers={row1Providers} direction="left" />
          </ScrollReveal>

          {/* Row 2 - Right */}
          <ScrollReveal direction="up" delay={0.3}>
            <MarqueeRow providers={row2Providers} direction="right" />
          </ScrollReveal>

          {/* Row 3 - Left */}
          <ScrollReveal direction="up" delay={0.4}>
            <MarqueeRow providers={row3Providers} direction="left" />
          </ScrollReveal>
        </div>

        {/* Additional Info */}
        <ScrollReveal direction="up" delay={0.5}>
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              Trusted partnerships with leading financial institutions worldwide
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes marquee-right {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        .animate-marquee-left {
          animation: marquee-left 30s linear infinite;
        }

        .animate-marquee-right {
          animation: marquee-right 30s linear infinite;
        }

        .animate-marquee-left:hover,
        .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default LiquidityProvidersSection;
