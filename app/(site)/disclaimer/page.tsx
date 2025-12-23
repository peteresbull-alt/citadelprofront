"use client";
import React from "react";
import ScrollReveal from "@/components/site/ScrollReveal";
import Navbar from "@/components/site/SampleNavbar";
import Link from "next/link";
import Footer from "@/components/site/FooterSection";
import EnhancedNavbar from "@/components/site/EnhancedNavbar";

const RiskDisclaimerPage = () => {
  return (
    <div className="min-h-screen py-30  dark:bg-black transition-colors duration-500">
      <EnhancedNavbar />
      <div className="max-w-4xl mx-auto px-6 py-12 lg:py-20">
        {/* Header */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Risk Disclaimer
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Important Information About Trading Risks
            </p>
          </div>
        </ScrollReveal>

        {/* Content */}
        <div className="space-y-12">
          {/* Company Information Section */}
          <ScrollReveal direction="up" delay={0.2}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                About Citadel Markets Pro
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Citadel Markets Pro is a Global financial service provider.
                Citadel Markets Pro is a registered trademark of the group, that
                operates amongst various entities.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                The service provided by Citadel Markets Pro is operated by the
                Citadel Markets Pro Group of Companies and is regulated by SEC,
                CRD 298461. CN Global is regulated by FCA in the United Kingdom,
                Reference Number 573263. CN is regulated by CIRO, reference
                number 9290. The Company may extend its services to various
                regions, including the European Economic Area (&quot;EEA&quot;)
                countries.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Trading in financial instruments involves substantial risk and
                there is always the potential for loss. Your trading results may
                vary. Past performance is not indicative of future results.
              </p>
            </section>
          </ScrollReveal>

          {/* Full Disclaimer Section */}
          <ScrollReveal direction="up" delay={0.3}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Full Disclaimer
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Past performance displayed by Traders (Signal Providers) is not
                necessarily indicative of future outcomes. There is no guarantee
                that an account copying a Trader&apos;s options contracts will
                achieve profits or experience losses similar to the
                Trader&apos;s account.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Options trading involves leverage, time decay, and volatility
                factors that can amplify both gains and losses. Even when
                copying trades, individual account performance may differ
                substantially from a Trader&apos;s results due to differences in
                execution speed, brokerage fees, market conditions, and account
                size.
              </p>
            </section>
          </ScrollReveal>

          {/* Performance Results Section */}
          <ScrollReveal direction="up" delay={0.4}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Performance Results and Limitations
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Performance results shown on this website may include historical
                or hypothetical data. Hypothetical results have inherent
                limitations and do not represent actual trading in live
                accounts. In particular, hypothetical performance does not
                account for factors such as slippage, margin requirements,
                assignment risk, or commissions, which can materially affect
                outcomes.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Customers who choose to copy multiple Traders simultaneously may
                not be able to follow all signals due to insufficient funds or
                risk constraints. Accordingly, the performance of customer
                accounts may vary significantly.
              </p>
            </section>
          </ScrollReveal>

          {/* Risk Warning Section */}
          <ScrollReveal direction="up" delay={0.5}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Risk Warning
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Copying options trades is not suitable for all investors.
                Options contracts carry a high level of risk and may not be
                appropriate for individuals who do not fully understand the
                nature of these instruments. You should carefully consider your
                investment objectives, level of experience, and risk tolerance
                before deciding to copy trades.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We strongly recommend consulting with a licensed financial
                professional regarding the risks associated with options trading
                before participating. Citadel Markets Pro does not provide
                personalized investment advice and makes no assurances regarding
                profitability or suitability of the strategies displayed.
              </p>
            </section>
          </ScrollReveal>

          {/* Important Notice Section */}
          <ScrollReveal direction="up" delay={0.6}>
            <section className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-8 border-2 border-red-200 dark:border-red-800">
              <h2 className="text-2xl lg:text-3xl font-bold text-red-900 dark:text-red-400 mb-4">
                Important Notice
              </h2>
              <p className="text-red-800 dark:text-red-300 leading-relaxed mb-4">
                Trading financial instruments, particularly options contracts,
                involves significant risk of loss. The high degree of leverage
                that is often obtainable in options trading can work against you
                as well as for you. The use of leverage can lead to large losses
                as well as gains.
              </p>
              <p className="text-red-800 dark:text-red-300 leading-relaxed">
                You should not engage in trading unless you fully understand the
                nature of the transactions you are entering into and the extent
                of your exposure to loss. If you do not understand these risks,
                you should seek independent professional advice before trading.
              </p>
            </section>
          </ScrollReveal>

          {/* Contact Section */}
          <ScrollReveal direction="up" delay={0.7}>
            <section className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Questions or Concerns?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                If you have any questions about this risk disclaimer or need
                clarification about the risks involved in trading, please
                contact our support team through the livechat below or consult
                with a licensed financial professional.
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

export default RiskDisclaimerPage;
