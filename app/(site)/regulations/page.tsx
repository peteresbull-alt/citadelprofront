"use client";
import React, { useState } from "react";
import {
  Shield,
  CheckCircle,
  Lock,
  FileText,
  Globe,
  Mail,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/site/ScrollReveal";
import EnhancedNavbar from "@/components/site/EnhancedNavbar";
import Footer from "@/components/site/FooterSection";

const RegulationsPage = () => {
  const [isHovered, setIsHovered] = useState(false);

  const regulatoryBadges = [
    {
      name: "GOV.UK",
      country: "United Kingdom",
      logo: "🇬🇧",
      color: "from-green-500 to-green-600",
    },
    {
      name: "SEC",
      country: "United States",
      logo: "🇺🇸",
      color: "from-blue-600 to-blue-700",
    },
    {
      name: "ASIC",
      country: "Australia",
      logo: "🇦🇺",
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "AUSTRAC",
      country: "Australia",
      logo: "🇦🇺",
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "BAFIN",
      country: "Germany",
      logo: "🇩🇪",
      color: "from-red-500 to-yellow-500",
    },
    {
      name: "CIMA",
      country: "Cayman Islands",
      logo: "🇰🇾",
      color: "from-blue-600 to-blue-700",
    },
    {
      name: "ESCA",
      country: "United Arab Emirates",
      logo: "🇦🇪",
      color: "from-green-500 to-red-500",
    },
    {
      name: "FSC",
      country: "New Zealand",
      logo: "🇳🇿",
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "FMA",
      country: "Austria",
      logo: "🇦🇹",
      color: "from-red-600 to-red-700",
    },
    {
      name: "MAS",
      country: "Singapore",
      logo: "🇸🇬",
      color: "from-red-500 to-white",
    },
    {
      name: "TFG",
      country: "China",
      logo: "🇨🇳",
      color: "from-red-600 to-yellow-500",
    },
    {
      name: "VFSC",
      country: "Vanuatu",
      logo: "🇻🇺",
      color: "from-red-500 to-green-500",
    },
  ];

  return (
    <>
      <EnhancedNavbar />
      <div className="min-h-screen dark:bg-black bg-white">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] pt-50 pb-6 flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 ">
            <Image
              src="/images/regulation-banner.webp"
              alt="Regulations Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/70 dark:bg-black/80" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <ScrollReveal direction="up" delay={0.2}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Regulations
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <p className="text-lg md:text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-8">
                Citadel Markets Pro is authorised and regulated by multiple
                Regulators across the globe. Trade with peace of mind knowing
                that Citadel Markets Pro is monitored by some of the strictest
                financial regulators&apos; bodies in the world.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.4}>
              <button
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => (window.location.href = "/register")}
                className="group relative px-10 py-4 text-lg font-semibold text-white rounded-full overflow-hidden transition-all duration-300"
                style={{
                  background: isHovered
                    ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                    : "rgba(16, 185, 129, 0.2)",
                  border: "2px solid rgba(16, 185, 129, 0.5)",
                  boxShadow: isHovered
                    ? "0 0 30px rgba(16, 185, 129, 0.6)"
                    : "0 0 20px rgba(16, 185, 129, 0.3)",
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Trading
                  <span className="text-xl">→</span>
                </span>
              </button>
            </ScrollReveal>
          </div>
        </section>

        {/* Regulatory Badges Section */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal direction="up" delay={0.2}>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                {regulatoryBadges.map((badge, index) => (
                  <div
                    key={index}
                    className="group relative bg-black dark:bg-white rounded-full px-6 py-3 flex items-center gap-3 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
                  >
                    <span className="text-2xl">{badge.logo}</span>
                    <span className="text-white dark:text-black font-bold text-sm md:text-base">
                      {badge.name}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* FSA Section */}
              <ScrollReveal direction="up" delay={0.2}>
                <div className="lg:col-span-2 bg-gray-100 dark:bg-gray-900 rounded-3xl p-8 border-2 border-gray-200 dark:border-gray-800 hover:border-emerald-400 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        FSA
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Financial Services Authority
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    IC Market Global complies with the FSA regulatory
                    requirements and has in place internal risk management
                    controls to ensure that it is sufficiently capitalized to
                    support its operations. External audits supplement (FCT)
                    Global operational and accounting process and ensure full
                    regulatory compliance.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <div className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                      <span className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
                        ✓ Fully Regulated
                      </span>
                    </div>
                    <div className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                      <span className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
                        ✓ Risk Management
                      </span>
                    </div>
                    <div className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                      <span className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
                        ✓ External Audits
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Contact Us Card */}
              <ScrollReveal direction="up" delay={0.3}>
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-8 text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-3">Contact Us</h3>
                  <p className="text-emerald-50 mb-6">
                    We are here 24hrs a day Monday to Sunday.
                  </p>

                  <div className="space-y-3">
                    <Link
                      href="/email-us"
                      className="flex items-center gap-3 bg-white/20 hover:bg-white/30 rounded-xl p-4 transition-all duration-300"
                    >
                      <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold">Email Us</span>
                    </Link>

                    <Link
                      href="/support"
                      className="flex items-center gap-3 bg-white/20 hover:bg-white/30 rounded-xl p-4 transition-all duration-300"
                    >
                      <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold">
                        Chat Us via Live Chat
                      </span>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Detailed Sections */}
        <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto space-y-12">
            {/* Segregation of Client Funds */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="bg-white dark:bg-black rounded-3xl p-8 md:p-12 border-2 border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                    <Lock className="w-8 h-8 text-blue-500" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    Segregation of Client Funds
                  </h2>
                </div>

                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  When funding your trading account your funds are held in
                  client segregated accounts with top tier banking institutions.
                  (FCT) Global complies with the Securities Act and the
                  Securities (Conduct of Business) Regulations and employs
                  strict policies and procedures regarding the maintenance and
                  operation of these accounts.
                </p>
              </div>
            </ScrollReveal>

            {/* Anti-Money Laundering */}
            <ScrollReveal direction="up" delay={0.3}>
              <div className="bg-white dark:bg-black rounded-3xl p-8 md:p-12 border-2 border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center">
                    <Shield className="w-8 h-8 text-purple-500" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    Anti-Money Laundering
                  </h2>
                </div>

                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  In accordance with the FSA Anti-Money Laundering and Counter
                  Terrorism Financial Act, (FCT) Global has in place policies
                  and procedures to ensure compliance with the law. These
                  policies and procedures are designed to prevent money
                  laundering activities from occurring. (FCT) Global Anti-Money
                  Laundering policy outlines the documents that you must provide
                  us before opening an account.
                </p>
              </div>
            </ScrollReveal>

            {/* Licence */}
            <ScrollReveal direction="up" delay={0.4}>
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-8 md:p-12 text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">Licence</h2>
                </div>

                <p className="text-emerald-50 text-lg leading-relaxed">
                  Raw Trading Ltd, (FCT) Global, is authorised by the Seychelles
                  Financial Services Authority as a Security Dealer for the
                  provision of financial services under License NO SD018.
                </p>

                <div className="mt-8 p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <Globe className="w-6 h-6 text-white" />
                    <span className="text-lg font-semibold">
                      License Number: SD018
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal direction="up" delay={0.2}>
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
                Your Safety is Our Priority
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-400 text-lg mb-12">
                We maintain the highest standards of security and compliance
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Shield,
                  title: "Regulated",
                  description: "Licensed by multiple authorities",
                  color: "from-blue-500 to-blue-600",
                },
                {
                  icon: Lock,
                  title: "Secure",
                  description: "Bank-level encryption",
                  color: "from-green-500 to-green-600",
                },
                {
                  icon: CheckCircle,
                  title: "Compliant",
                  description: "Full regulatory compliance",
                  color: "from-purple-500 to-purple-600",
                },
                {
                  icon: Globe,
                  title: "Global",
                  description: "150+ countries served",
                  color: "from-emerald-500 to-emerald-600",
                },
              ].map((item, index) => (
                <ScrollReveal key={index} direction="up" delay={0.1 * index}>
                  <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-800 hover:border-emerald-400 transition-all duration-300 text-center group">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {item.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-emerald-500 to-emerald-600">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal direction="up" delay={0.2}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Trade with Confidence?
              </h2>
              <p className="text-emerald-50 text-lg mb-8">
                Join thousands of traders who trust Citadel Markets Pro for
                secure and regulated trading
              </p>
              <Link
                href="/register"
                className="inline-block bg-white text-emerald-600 px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Open Your Account Now
              </Link>
            </ScrollReveal>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default RegulationsPage;
