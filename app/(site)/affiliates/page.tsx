"use client";
import React from "react";
import ScrollReveal from "@/components/site/ScrollReveal";
import Navbar from "@/components/site/SampleNavbar";
import Link from "next/link";
import Footer from "@/components/site/FooterSection";
import EnhancedNavbar from "@/components/site/EnhancedNavbar";

const AffiliateProgramPage = () => {
  return (
    <div className="min-h-screen py-30 dark:bg-black transition-colors duration-500">
      <EnhancedNavbar />
      <div className="max-w-4xl mx-auto px-6 py-12 lg:py-20">
        {/* Header */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Affiliate Program
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Join our affiliate program and earn generous commissions
            </p>
          </div>
        </ScrollReveal>

        {/* Content */}
        <div className="space-y-12">
          {/* Program Overview Section */}
          <ScrollReveal direction="up" delay={0.2}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Program Overview
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Our Affiliate Program rewards you for introducing new clients to
                Citadel Markets Pro. Earn competitive commissions on every
                referral who signs up and makes their first deposit. Whether
                you&apos;re a content creator, financial blogger, or simply
                passionate about trading, our program offers you a lucrative
                opportunity to monetize your network.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                As an affiliate partner, you&apos;ll receive a unique referral
                code and access to marketing materials that make promoting our
                platform simple and effective. Your success is our success, and
                we&apos;re committed to providing you with all the tools you
                need to maximize your earnings.
              </p>
            </section>
          </ScrollReveal>

          {/* Commission Structure Section */}
          <ScrollReveal direction="up" delay={0.3}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Commission Structure
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                We offer one of the most competitive commission structures in
                the industry. Here&apos;s how you earn:
              </p>

              <ul className="space-y-4 ml-6">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    10% Referral Bonus
                  </span>{" "}
                  - Earn 10% of the first deposit made by each user you refer.
                  There is no cap on how much you can earn per referral or in
                  total.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Instant Credit
                  </span>{" "}
                  - Your commission is credited to your account immediately once
                  your referral&apos;s first deposit is confirmed and processed.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Lifetime Tracking
                  </span>{" "}
                  - Once someone signs up using your referral code, they are
                  permanently linked to your account. You&apos;ll receive credit
                  for their first qualifying deposit.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    No Minimum Threshold
                  </span>{" "}
                  - There is no minimum earning requirement. You can withdraw
                  your affiliate earnings at any time using our standard
                  withdrawal methods.
                </li>
              </ul>
            </section>
          </ScrollReveal>

          {/* How It Works Section */}
          <ScrollReveal direction="up" delay={0.4}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                How It Works
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Getting started with our affiliate program is simple and
                straightforward. Follow these easy steps to begin earning:
              </p>

              <div className="space-y-6 ml-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Step 1: Get Your Referral Code
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Once you create an account with Citadel Markets Pro, you
                    automatically receive a unique referral code. You can find
                    this code in your dashboard under the Referrals section.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Step 2: Share Your Link
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Share your personalized referral link with friends, family,
                    followers, or your audience. You can share it via social
                    media, email, blog posts, or any other channel you prefer.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Step 3: Track Your Referrals
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Monitor your referral activity in real-time through your
                    dashboard. See how many people have signed up using your
                    code and track your earnings as they grow.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Step 4: Earn Commissions
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    When someone signs up using your referral code and makes
                    their first deposit, you automatically receive 10% of that
                    deposit amount as commission, credited directly to your
                    account balance.
                  </p>
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* Affiliate Benefits Section */}
          <ScrollReveal direction="up" delay={0.5}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Affiliate Benefits
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                As a valued affiliate partner, you gain access to exclusive
                benefits designed to help you succeed:
              </p>

              <ul className="space-y-4 ml-6">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Marketing Materials
                  </span>{" "}
                  - Access professionally designed banners, landing pages, and
                  promotional content that converts.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Real-Time Analytics
                  </span>{" "}
                  - Track clicks, sign-ups, deposits, and earnings with detailed
                  analytics and reporting tools.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Dedicated Support
                  </span>{" "}
                  - Our affiliate team is always available to answer questions
                  and help optimize your promotional strategies.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Flexible Withdrawals
                  </span>{" "}
                  - Withdraw your affiliate earnings anytime using
                  cryptocurrency, bank transfer, or any supported payment
                  method.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    High Conversion Platform
                  </span>{" "}
                  - Our user-friendly platform, competitive spreads, and
                  excellent customer service ensure high conversion rates for
                  your referrals.
                </li>
              </ul>
            </section>
          </ScrollReveal>

          {/* Program Rules Section */}
          <ScrollReveal direction="up" delay={0.6}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Program Rules and Guidelines
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                To maintain the integrity of our affiliate program and ensure
                fair practices, all affiliates must adhere to the following
                guidelines:
              </p>

              <ul className="space-y-4 ml-6">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Honest Promotion
                  </span>{" "}
                  - All promotional materials must accurately represent Citadel
                  Markets Pro and our services. False or misleading claims are
                  strictly prohibited.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    No Self-Referrals
                  </span>{" "}
                  - Creating multiple accounts to refer yourself or using your
                  own referral code is not allowed and will result in account
                  termination.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Ethical Marketing
                  </span>{" "}
                  - Spam, unsolicited emails, or aggressive marketing tactics
                  are not permitted. Respect all applicable marketing laws and
                  regulations.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Brand Compliance
                  </span>{" "}
                  - When using our brand assets, follow our brand guidelines and
                  do not alter logos or misrepresent our company in any way.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Fraud Prevention
                  </span>{" "}
                  - Any fraudulent activity, including but not limited to fake
                  sign-ups or deposits, will result in immediate termination and
                  forfeiture of all commissions.
                </li>
              </ul>
            </section>
          </ScrollReveal>

          {/* Payment Terms Section */}
          <ScrollReveal direction="up" delay={0.7}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Payment Terms
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Your affiliate commissions are processed efficiently and
                transparently:
              </p>
              <ul className="space-y-4 ml-6">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Commissions are credited immediately upon confirmation of the
                  referred user&apos;s first completed deposit.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  All earnings are added to your main account balance and can be
                  withdrawn using any of our supported payment methods.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Withdrawal processing times vary by method but typically range
                  from instant to 3-5 business days.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We reserve the right to withhold payment in cases of suspected
                  fraud or violation of program terms until investigation is
                  complete.
                </li>
              </ul>
            </section>
          </ScrollReveal>

          {/* Termination Section */}
          <ScrollReveal direction="up" delay={0.8}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Program Termination
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Citadel Markets Pro reserves the right to terminate affiliate
                accounts for violation of program rules or suspicious activity.
                Affiliates may also voluntarily leave the program at any time.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Upon termination, any pending commissions from valid referrals
                will still be paid out. However, commissions from fraudulent or
                suspicious activity will be forfeited.
              </p>
            </section>
          </ScrollReveal>

          {/* Contact Section */}
          <ScrollReveal direction="up" delay={0.9}>
            <section className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Start Earning?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Join our affiliate program today and start earning generous
                commissions. If you have any questions about the program, please
                contact our support team through the livechat below.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/register"
                  className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50"
                >
                  Get Started Now
                </Link>
                <Link
                  href="/"
                  className="inline-block bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
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

export default AffiliateProgramPage;
