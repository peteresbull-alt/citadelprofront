"use client";
import React from "react";
import {
  FileCheck,
  FileText,
  Activity,
  Coins,
  Timer,
  Users,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const VerifiedCompanySection = () => {
  return (
    <section className="bg-white dark:bg-black py-10 px-6 transition-colors duration-500">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <ScrollReveal direction="up" delay={0.2}>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Registered & Verified Company
          </h2>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.2}>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-4xl mx-auto mb-10 leading-relaxed">
            At Citadel Pro, transparency and trust are at the heart of our
            services. We are a legally registered company, giving our clients
            the confidence that they are working with a verified and compliant
            business.
          </p>
        </ScrollReveal>

        {/* Key Points */}
        <ScrollReveal direction="up" delay={0.2}>
          <ul className="text-gray-700 text-center dark:text-gray-400 text-sm max-w-3xl mx-auto  leading-relaxed space-y-2 mb-12">
            <li>
              - <strong>Official Registration:</strong> Citadel Pro is
              incorporated and listed with the relevant government authority.
            </li>
            <li>
              - <strong>Compliance First:</strong> We follow strict regulatory
              and reporting standards to ensure full compliance.
            </li>
            <li>
              - <strong>Secure Operations:</strong> All transactions and
              operations are conducted under a licensed business framework.
            </li>
            <li>
              - <strong>Client Protection:</strong> Being a registered entity
              means our clients enjoy the assurance of accountability, security,
              and professional standards.
            </li>
          </ul>
        </ScrollReveal>

        {/* Company Number */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="text-center mb-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-wider mb-2">
              COMPANY NUMBER: <span className="text-emerald-400">16595885</span>
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              You can verify our company details anytime through the official UK
              government registry.
            </p>
          </div>
        </ScrollReveal>

        {/* Buttons */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
            <button className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-md shadow-emerald-500/30">
              <FileCheck className="w-5 h-5" />
              Verify Certificate
            </button>
            <button className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-md shadow-emerald-500/30">
              <FileText className="w-5 h-5" />
              View Document
            </button>
          </div>
        </ScrollReveal>

        {/* 24-hour Statistics */}
        <div className="mt-10">
          <ScrollReveal direction="up" delay={0.2}>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-8">
              24-hour Statistics
            </h4>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center max-w-4xl mx-auto">
            {/* Stat 1 */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="bg-gray-200 dark:bg-gray-900 p-6 rounded-2xl flex flex-col items-center justify-center border-2 border-transparent hover:border-emerald-400 transition-all duration-300">
                <Coins className="w-7 h-7 text-emerald-400 mb-3" />
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  8,499
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Stock trades made
                </p>
              </div>
            </ScrollReveal>

            {/* Stat 2 */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="bg-gray-200 dark:bg-gray-900 p-6 rounded-2xl flex flex-col items-center justify-center border-2 border-transparent hover:border-emerald-400 transition-all duration-300">
                <Activity className="w-7 h-7 text-emerald-400 mb-3" />
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  TSLA
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Today's champion pair
                </p>
              </div>
            </ScrollReveal>

            {/* Stat 3 */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="bg-gray-200 dark:bg-gray-900 p-6 rounded-2xl flex flex-col items-center justify-center border-2 border-transparent hover:border-emerald-400 transition-all duration-300">
                <Timer className="w-7 h-7 text-emerald-400 mb-3" />
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  3.7 minutes
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Average processing time
                </p>
              </div>
            </ScrollReveal>

            {/* Stat 4 */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="bg-gray-200 dark:bg-gray-900 p-6 rounded-2xl flex flex-col items-center justify-center border-2 border-transparent hover:border-emerald-400 transition-all duration-300">
                <Users className="w-7 h-7 text-emerald-400 mb-3" />
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  2,593
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Active visitors
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifiedCompanySection;
