"use client";
import React from "react";
import {
  UserPlus,
  Search,
  Trophy,
  Globe,
  Users,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import Link from "next/link";

const ReadyToStartSection = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Create Your Account.",
      description: "Join now to unlock options-focused copy trading.",
    },
    {
      icon: Search,
      title: "Find Your Match.",
      description:
        "Explore leaders known for success in options—contracts, spreads, tickers—you name it.",
    },
    {
      icon: Trophy,
      title: "Copy and Grow.",
      description:
        "Replicate trades, refine strategies, and learn—all while staying in control.",
    },
  ];

  const trustFeatures = [
    {
      icon: Globe,
      title: "Global",
      description: "Providing services around the world",
    },
    {
      icon: Users,
      title: "More than 35M+",
      description: "Active traders worldwide",
    },
    {
      icon: TrendingUp,
      title: "Regulated",
      description: "Licensed and compliant globally",
    },
  ];

  const bankLogos = [
    { name: "UBS", logo: "/logos/logo_11.png" },
    { name: "UBS", logo: "/logos/logo_2.png" },
    {
      name: "Credit Suisse",
      logo: "/logos/logo_6.png",
    },
    {
      name: "Zelle",
      logo: "/logos/logo_7.png",
    },
    { name: "Citi", logo: "/logos/logo_4.png" },
    { name: "Standard", logo: "/logos/logo_5.png" },
  ];

  return (
    <section className=" dark:bg-black py-20 px-6 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Ready to Start Header */}
        <ScrollReveal direction="up" delay={0.2}>
          <h2 className="text-4xl lg:text-5xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Ready to Start?
          </h2>
        </ScrollReveal>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={index} direction="up" delay={0.1 * index}>
                <div className="bg-gray-100 dark:bg-gray-900 rounded-3xl p-8 border-2 border-gray-200 dark:border-gray-800 hover:border-emerald-400 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/20">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/20 rounded-2xl flex items-center justify-center">
                      <Icon className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-gray-900 dark:text-white text-2xl font-bold text-center mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Banking Partners Section */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="mb-20">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
              Your funds are held in top-tier institutions
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center text-lg mb-12 max-w-3xl mx-auto">
              The Citadel Markets Pro works with globally renowned banking
              partners including:
            </p>

            {/* Bank Logos Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center w-fit mx-auto justify-items-center mb-8">
              {bankLogos.map((bank, index) => (
                
                  <div key={index} className="w-full flex items-center justify-center transition-all duration-300">
                    <Image
                      src={bank.logo}
                      alt={bank.name}
                      width={120}
                      height={60}
                      className="object-cover"
                      unoptimized
                    />
                  </div>
               
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Trusted Worldwide Section */}
        <ScrollReveal direction="up" delay={0.2}>
          <div>
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
              Trusted worldwide
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center text-lg mb-12">
              Discover why millions of investors from over 100 countries joined
              Citadel Markets Pro
            </p>

            {/* Trust Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trustFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <ScrollReveal key={index} direction="up" delay={0.1 * index}>
                    <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-800 hover:border-emerald-400 transition-all duration-300 text-center">
                      {/* Icon */}
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center">
                          <Icon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                        </div>
                      </div>

                      {/* Content */}
                      <h4 className="text-gray-900 dark:text-white text-xl font-bold mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* CTA Button */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="flex justify-center mt-12">
            <Link
              href="/register"
              className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50"
            >
              Get Started Today
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ReadyToStartSection;
