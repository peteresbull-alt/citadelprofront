"use client";
import React from "react";
import ScrollReveal from "@/components/site/ScrollReveal";
import Navbar from "@/components/site/SampleNavbar";
import Link from "next/link";
import Footer from "@/components/site/FooterSection";
import EnhancedNavbar from "@/components/site/EnhancedNavbar";

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen py-30 dark:bg-black transition-colors duration-500">
      <EnhancedNavbar />
      <div className="max-w-4xl mx-auto px-6 py-12 lg:py-20">
        {/* Header */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Last Updated: November 2024
            </p>
          </div>
        </ScrollReveal>

        {/* Content */}
        <div className="space-y-12">
          {/* Acceptance of Terms Section */}
          <ScrollReveal direction="up" delay={0.2}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Acceptance of Terms
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                By accessing and using Citadel Markets Pro services, you
                acknowledge that you have read, understood, and agree to be
                bound by these Terms of Service and all applicable laws and
                regulations. If you do not agree with any of these terms, you
                are prohibited from using or accessing our services.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                These terms apply to all visitors, users, and others who access
                or use our trading platform, including both Demo and Live
                trading accounts.
              </p>
            </section>
          </ScrollReveal>

          {/* Account Registration Section */}
          <ScrollReveal direction="up" delay={0.3}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Account Registration and Security
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                To use our services, you must create an account and provide
                accurate, complete, and current information. You are responsible
                for maintaining the confidentiality of your account credentials
                and for all activities that occur under your account.
              </p>

              <ul className="space-y-4 ml-6">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Eligibility
                  </span>{" "}
                  - You must be at least 18 years of age and have the legal
                  capacity to enter into binding contracts to use our services.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Account Security
                  </span>{" "}
                  - You agree to immediately notify Citadel Markets Pro of any
                  unauthorized use of your account or any other breach of
                  security. We will not be liable for any loss or damage arising
                  from your failure to protect your account information.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Accurate Information
                  </span>{" "}
                  - You agree to provide true, accurate, current, and complete
                  information about yourself as prompted by our registration
                  forms and to maintain and promptly update such information.
                </li>
              </ul>
            </section>
          </ScrollReveal>

          {/* Trading Services Section */}
          <ScrollReveal direction="up" delay={0.4}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Trading Services
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Citadel Markets Pro provides access to financial trading
                services including, but not limited to, forex, commodities,
                indices, and cryptocurrencies. All trading activities are
                subject to market conditions and our platform terms.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We reserve the right to refuse service, terminate accounts, or
                cancel orders at our sole discretion. This includes, but is not
                limited to, situations where we believe there is fraudulent
                activity, violation of these terms, or other unlawful conduct.
              </p>
            </section>
          </ScrollReveal>

          {/* Risk Disclosure Section */}
          <ScrollReveal direction="up" delay={0.5}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Risk Disclosure
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Trading in financial instruments carries a high level of risk
                and may not be suitable for all investors. The high degree of
                leverage that is often obtainable in trading can work against
                you as well as for you. Before deciding to trade, you should
                carefully consider your investment objectives, level of
                experience, and risk appetite.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You acknowledge that you may lose some or all of your invested
                capital, and you should not invest money that you cannot afford
                to lose. You should be aware of all the risks associated with
                trading and seek advice from an independent financial advisor if
                you have any doubts.
              </p>
            </section>
          </ScrollReveal>

          {/* Prohibited Activities Section */}
          <ScrollReveal direction="up" delay={0.6}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Prohibited Activities
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                You agree not to engage in any of the following prohibited
                activities:
              </p>

              <ul className="space-y-3 ml-6">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Using our services for any illegal or unauthorized purpose
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Attempting to interfere with, compromise, or manipulate our
                  platform or services
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Engaging in any form of market manipulation or abusive trading
                  practices
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Using automated trading systems or robots without prior
                  written consent
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Sharing your account credentials with third parties
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Attempting to exploit system errors or gaps in our service
                </li>
              </ul>
            </section>
          </ScrollReveal>

          {/* Intellectual Property Section */}
          <ScrollReveal direction="up" delay={0.7}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Intellectual Property
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                All content, features, and functionality of our platform,
                including but not limited to text, graphics, logos, icons,
                images, software, and data compilations, are the exclusive
                property of Citadel Markets Pro and are protected by
                international copyright, trademark, and other intellectual
                property laws.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You may not reproduce, distribute, modify, create derivative
                works of, publicly display, or exploit any of our content
                without our express written permission.
              </p>
            </section>
          </ScrollReveal>

          {/* Limitation of Liability Section */}
          <ScrollReveal direction="up" delay={0.8}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Limitation of Liability
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                To the fullest extent permitted by applicable law, Citadel
                Markets Pro shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages, or any loss of
                profits or revenues, whether incurred directly or indirectly, or
                any loss of data, use, goodwill, or other intangible losses.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We do not guarantee that our services will be uninterrupted,
                timely, secure, or error-free. Market data, quotes, and other
                information provided through our platform may be delayed or
                inaccurate, and we are not responsible for any trading decisions
                made based on such information.
              </p>
            </section>
          </ScrollReveal>

          {/* Termination Section */}
          <ScrollReveal direction="up" delay={0.9}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Termination
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                We may terminate or suspend your account and access to our
                services immediately, without prior notice or liability, for any
                reason, including but not limited to breach of these Terms of
                Service.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Upon termination, your right to use the services will
                immediately cease. If you wish to terminate your account, you
                may simply discontinue using the service and contact our support
                team to close your account properly.
              </p>
            </section>
          </ScrollReveal>

          {/* Modifications Section */}
          <ScrollReveal direction="up" delay={1.0}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Modifications to Terms
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Citadel Markets Pro reserves the right to modify or replace
                these Terms of Service at any time at our sole discretion. We
                will provide notice of any material changes by posting the new
                terms on this page and updating the &quot;Last Updated&quot;
                date. Your continued use of our services after any such changes
                constitutes your acceptance of the new terms.
              </p>
            </section>
          </ScrollReveal>

          {/* Governing Law Section */}
          <ScrollReveal direction="up" delay={1.1}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Governing Law
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                These Terms of Service shall be governed by and construed in
                accordance with applicable international financial regulations
                and the laws of the jurisdiction in which Citadel Markets Pro
                operates, without regard to its conflict of law provisions. Any
                disputes arising from these terms shall be subject to the
                exclusive jurisdiction of the courts in that jurisdiction.
              </p>
            </section>
          </ScrollReveal>

          {/* Contact Section */}
          <ScrollReveal direction="up" delay={1.2}>
            <section className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Questions About These Terms?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                If you have any questions about these Terms of Service or need
                clarification on any section, please contact our support team
                through the livechat below or reach out to our legal department.
              </p>
              <Link
                href="/"
                className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50"
              >
                Go Back Home
              </Link>
            </section>
          </ScrollReveal>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfServicePage;
