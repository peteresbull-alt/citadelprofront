"use client";
import React from "react";
import ScrollReveal from "@/components/site/ScrollReveal";
import Navbar from "@/components/site/SampleNavbar";
import Link from "next/link";
import Footer from "@/components/site/FooterSection";
import EnhancedNavbar from "@/components/site/EnhancedNavbar";

const SupportCenterPage = () => {
  return (
    <div className="min-h-screen py-30 dark:bg-black transition-colors duration-500">
      <EnhancedNavbar />
      <div className="max-w-4xl mx-auto px-6 py-12 lg:py-20">
        {/* Header */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Support Center
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Get help and support for your trading journey
            </p>
          </div>
        </ScrollReveal>

        {/* Content */}
        <div className="space-y-12">
          {/* Welcome Section */}
          <ScrollReveal direction="up" delay={0.2}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Welcome to Our Support Center
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                At Citadel Markets Pro, we are committed to providing you with
                exceptional support throughout your trading experience. Our
                dedicated support team is available to assist you with any
                questions, concerns, or technical issues you may encounter while
                using our platform.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Whether you&apos;re a new trader just getting started or an
                experienced professional, our comprehensive support resources
                and knowledgeable team are here to ensure your success. We
                understand that timely assistance is crucial in the fast-paced
                world of trading, which is why we strive to provide prompt and
                effective solutions to all your inquiries.
              </p>
            </section>
          </ScrollReveal>

          {/* Getting Started Section */}
          <ScrollReveal direction="up" delay={0.3}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Getting Started
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                If you&apos;re new to Citadel Markets Pro, we recommend starting
                with these essential resources to help you navigate our platform
                effectively:
              </p>

              <ul className="space-y-4 ml-6">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Account Setup and Verification
                  </span>{" "}
                  - Learn how to create your account, complete the KYC
                  verification process, and set up your trading profile. Our
                  verification process typically takes 1-3 business days and
                  ensures the security of your account and compliance with
                  regulatory requirements.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Making Your First Deposit
                  </span>{" "}
                  - Understand the various deposit methods available, including
                  cryptocurrency transfers and bank deposits. We accept Bitcoin,
                  Ethereum, USDT, and other major cryptocurrencies.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Platform Navigation
                  </span>{" "}
                  - Familiarize yourself with our intuitive trading interface,
                  dashboard features, and account management tools. Our platform
                  is designed to provide a seamless experience whether
                  you&apos;re trading on desktop or mobile devices.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Security Best Practices
                  </span>{" "}
                  - Learn about two-factor authentication, secure password
                  management, and other security measures to protect your
                  account and funds from unauthorized access.
                </li>
              </ul>
            </section>
          </ScrollReveal>

          {/* Account Management Section */}
          <ScrollReveal direction="up" delay={0.4}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Account Management
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Our support team can assist you with all aspects of account
                management:
              </p>

              <ul className="space-y-4 ml-6">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Profile Updates
                  </span>{" "}
                  - Change your personal information, contact details, or
                  communication preferences. Ensure your profile information is
                  always up to date to receive important notifications and
                  account updates.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Password Reset
                  </span>{" "}
                  - Recover access to your account if you&apos;ve forgotten your
                  password or need to reset it for security reasons.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Account Verification Issues
                  </span>{" "}
                  - Get help with document submission, verification delays, or
                  rejected documents. Our team will guide you through the
                  verification requirements and help resolve any issues quickly.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Account Limits and Restrictions
                  </span>{" "}
                  - Understand your account limits, trading restrictions, and
                  how to request limit increases based on your trading history
                  and verification level.
                </li>
              </ul>
            </section>
          </ScrollReveal>

          {/* Trading Support Section */}
          <ScrollReveal direction="up" delay={0.5}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Trading Support
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                We provide comprehensive support for all your trading
                activities:
              </p>

              <ul className="space-y-4 ml-6">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Order Execution
                  </span>{" "}
                  - Understanding market orders, limit orders, stop-loss orders,
                  and other order types. Learn how to execute trades efficiently
                  and manage your positions effectively.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Copy Trading Assistance
                  </span>{" "}
                  - Get help selecting expert traders, understanding performance
                  metrics, managing your copy trading portfolio, and adjusting
                  your copy trading settings.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Stock Trading
                  </span>{" "}
                  - Assistance with buying and selling stocks, understanding
                  market data, and managing your stock portfolio.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Trading Signals
                  </span>{" "}
                  - Learn how to access, interpret, and act on our professional
                  trading signals. Understand the signal strength indicators,
                  entry and exit points, and risk management recommendations.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Risk Management
                  </span>{" "}
                  - Learn best practices for position sizing, portfolio
                  diversification, and protecting your capital in volatile
                  markets.
                </li>
              </ul>
            </section>
          </ScrollReveal>

          {/* Deposits and Withdrawals Section */}
          <ScrollReveal direction="up" delay={0.6}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Deposits and Withdrawals
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Our support team is here to help with all your financial
                transactions:
              </p>

              <ul className="space-y-4 ml-6">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Deposit Processing
                  </span>{" "}
                  - Track your deposit status, resolve delayed deposits, verify
                  transaction confirmations, and understand processing times for
                  different payment methods.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Withdrawal Requests
                  </span>{" "}
                  - Submit withdrawal requests, understand withdrawal limits and
                  fees, resolve withdrawal issues, and track the status of
                  pending withdrawals.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Payment Method Setup
                  </span>{" "}
                  - Add or update your cryptocurrency wallet addresses,
                  configure bank transfer details, and manage your preferred
                  payment methods securely.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Transaction History
                  </span>{" "}
                  - Access your complete transaction history, download
                  statements for tax purposes, and reconcile any discrepancies
                  in your account balance.
                </li>
              </ul>
            </section>
          </ScrollReveal>

          {/* Technical Support Section */}
          <ScrollReveal direction="up" delay={0.7}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Technical Support
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Experiencing technical difficulties? Our technical support team
                can help:
              </p>

              <ul className="space-y-4 ml-6">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Platform Access Issues
                  </span>{" "}
                  - Resolve login problems, browser compatibility issues, mobile
                  app troubleshooting, and connection errors.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Trading Platform Errors
                  </span>{" "}
                  - Report and resolve order execution errors, chart display
                  issues, data feed problems, and other platform malfunctions.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Mobile App Support
                  </span>{" "}
                  - Get help with mobile app installation, updates, performance
                  issues, and feature navigation on iOS and Android devices.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    System Performance
                  </span>{" "}
                  - Report slow loading times, freezing issues, or other
                  performance-related concerns that affect your trading
                  experience.
                </li>
              </ul>
            </section>
          </ScrollReveal>

          {/* Security and Privacy Section */}
          <ScrollReveal direction="up" delay={0.8}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Security and Privacy
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Your security is our top priority. Get support for:
              </p>

              <ul className="space-y-4 ml-6">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Two-Factor Authentication
                  </span>{" "}
                  - Set up, manage, or recover your 2FA settings. Learn how to
                  use authenticator apps and backup codes to secure your
                  account.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Suspicious Activity
                  </span>{" "}
                  - Report unauthorized access attempts, suspicious
                  transactions, or any security concerns regarding your account
                  immediately.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Data Privacy Requests
                  </span>{" "}
                  - Request copies of your personal data, update privacy
                  settings, or exercise your data protection rights under
                  applicable regulations.
                </li>
              </ul>
            </section>
          </ScrollReveal>

          {/* Response Times Section */}
          <ScrollReveal direction="up" delay={0.9}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Support Response Times
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                We strive to provide timely assistance to all our users:
              </p>

              <ul className="space-y-4 ml-6">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Live Chat Support
                  </span>{" "}
                  - Immediate to 5 minutes during business hours. Our live chat
                  is the fastest way to get help with urgent issues.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Email Support
                  </span>{" "}
                  - Response within 24 hours for most inquiries. Complex issues
                  may require additional time for thorough investigation and
                  resolution.
                </li>
              </ul>
            </section>
          </ScrollReveal>

          {/* Contact Section */}
          <ScrollReveal direction="up" delay={1.0}>
            <section className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Need Help? Contact Us
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Our support team is ready to assist you with any questions or
                concerns. For immediate assistance, please reach out to us
                through the live chat support below or email us at{" "}
                <a
                  href="mailto:support@citadelmarketspro.com"
                  className="text-emerald-500 hover:text-emerald-600 font-semibold"
                >
                  support@citadelmarketspro.com
                </a>
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/"
                  className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50"
                >
                  Go Back Home
                </Link>
              </div>
            </section>
          </ScrollReveal>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SupportCenterPage;
