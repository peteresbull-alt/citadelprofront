"use client";
import React from "react";
import ScrollReveal from "@/components/site/ScrollReveal";
import Navbar from "@/components/site/SampleNavbar";
import Link from "next/link";
import Footer from "@/components/site/FooterSection";
import EnhancedNavbar from "@/components/site/EnhancedNavbar";

const CopyTradingPage = () => {
  return (
    <div className="min-h-screen py-30 dark:bg-black transition-colors duration-500">
      <EnhancedNavbar />
      <div className="max-w-4xl mx-auto px-6 py-12 lg:py-20">
        {/* Header */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Copy Trading and Social Trading
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Automatically replicate the trades of expert traders
            </p>
          </div>
        </ScrollReveal>

        {/* Content */}
        <div className="space-y-12">
          {/* What is Copy Trading Section */}
          <ScrollReveal direction="up" delay={0.2}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                What is Copy Trading?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Copy Trading is an innovative feature that allows you to
                automatically mirror the trading strategies of experienced and
                successful traders on the Citadel Markets Pro platform. When you
                copy a trader, every position they open or close is replicated
                in your account in real-time, proportional to your allocated
                investment amount.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                This revolutionary approach to trading eliminates the need for
                extensive market knowledge or constant monitoring. Whether
                you&apos;re a beginner looking to learn from experts or an
                experienced trader seeking to diversify your portfolio, Copy
                Trading provides a hands-free solution to participate in the
                financial markets with confidence.
              </p>
            </section>
          </ScrollReveal>

          {/* How Copy Trading Works Section */}
          <ScrollReveal direction="up" delay={0.3}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                How Copy Trading Works
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Our Copy Trading system is designed to be simple, transparent,
                and effective. Here&apos;s how it works:
              </p>

              <div className="space-y-6 ml-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Step 1: Browse Expert Traders
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Explore our curated list of professional traders, each with
                    detailed performance statistics, risk scores, trading
                    history, and verified track records. Filter by
                    profitability, risk level, trading style, or asset
                    preferences to find traders that match your investment
                    goals.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Step 2: Select a Trader to Copy
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Once you&apos;ve found a trader whose strategy aligns with
                    your investment objectives, review their portfolio, average
                    returns, win rate, and trading frequency. You can copy
                    multiple traders simultaneously to diversify your approach.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Step 3: Allocate Your Investment
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Decide how much capital you want to allocate to copying this
                    trader. You can start with as little as the minimum
                    threshold specified by each trader. Set your maximum risk
                    limits and stop-loss parameters to protect your investment.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Step 4: Automatic Replication
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Once activated, our system automatically replicates all the
                    trader&apos;s positions in your account in real-time. The
                    trades are proportionally sized based on your allocated
                    capital. You maintain full control and can stop copying or
                    adjust settings at any time.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Step 5: Monitor and Manage
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Track your copied trades through your dashboard with
                    real-time updates on performance, profit and loss, and open
                    positions. You can modify your allocation, pause copying, or
                    stop following a trader whenever you choose.
                  </p>
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* Benefits Section */}
          <ScrollReveal direction="up" delay={0.4}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Benefits of Copy Trading
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Copy Trading offers numerous advantages for traders of all
                experience levels:
              </p>

              <ul className="space-y-4 ml-6">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Learn from the Best
                  </span>{" "}
                  - Gain insights into professional trading strategies by
                  observing how expert traders navigate different market
                  conditions and make decisions in real-time.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Save Time
                  </span>{" "}
                  - Eliminate the need for hours of market analysis, research,
                  and monitoring. Let experienced traders do the heavy lifting
                  while you focus on other priorities.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Diversification
                  </span>{" "}
                  - Copy multiple traders with different strategies, risk
                  profiles, and asset focuses to create a well-balanced and
                  diversified trading portfolio.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    No Experience Required
                  </span>{" "}
                  - Start trading immediately without needing extensive market
                  knowledge or technical analysis skills. Perfect for beginners
                  entering the financial markets.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Full Transparency
                  </span>{" "}
                  - Access complete trading histories, performance metrics, risk
                  scores, and verified results for every trader on our platform
                  before making your decision.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Risk Management
                  </span>{" "}
                  - Set your own risk parameters, stop-loss levels, and maximum
                  investment amounts to ensure your portfolio aligns with your
                  personal risk tolerance.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Maintain Control
                  </span>{" "}
                  - You retain full control over your account. Pause copying,
                  adjust allocations, or manually close positions whenever you
                  want without restrictions.
                </li>
              </ul>
            </section>
          </ScrollReveal>

          {/* Trader Selection Criteria Section */}
          <ScrollReveal direction="up" delay={0.5}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                How to Choose a Trader
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Selecting the right trader to copy is crucial for your success.
                Consider these key factors when making your decision:
              </p>

              <ul className="space-y-4 ml-6">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Performance History
                  </span>{" "}
                  - Review the trader&apos;s historical returns over different
                  time periods. Look for consistent profitability rather than
                  sporadic high gains, as steady performance often indicates a
                  sustainable strategy.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Risk Score
                  </span>{" "}
                  - Each trader has a risk score from 1-10. Lower scores
                  indicate conservative strategies with smaller drawdowns, while
                  higher scores suggest aggressive approaches with higher
                  volatility.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Trading Frequency
                  </span>{" "}
                  - Consider how often the trader opens positions.
                  High-frequency traders may generate more commissions, while
                  longer-term strategies typically have lower transaction costs.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Asset Focus
                  </span>{" "}
                  - Check which markets and instruments the trader focuses on.
                  Some specialize in forex, others in cryptocurrencies, stocks,
                  or commodities. Choose based on your market preferences.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Drawdown Management
                  </span>{" "}
                  - Examine the maximum drawdown periods. Traders who
                  effectively manage losing streaks and limit drawdowns
                  demonstrate superior risk management skills.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Number of Copiers
                  </span>{" "}
                  - A large number of copiers can indicate trust and proven
                  results, but also consider emerging traders with strong
                  potential and lower minimum thresholds.
                </li>
              </ul>
            </section>
          </ScrollReveal>

          {/* Risk Management Section */}
          <ScrollReveal direction="up" delay={0.6}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Risk Management in Copy Trading
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                While Copy Trading can be highly profitable, it&apos;s essential
                to implement proper risk management strategies:
              </p>

              <ul className="space-y-4 ml-6">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Start Small
                  </span>{" "}
                  - Begin with a modest allocation to test how the copied
                  strategy performs in your account. You can always increase
                  your investment once you&apos;re comfortable with the results.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Diversify Your Copies
                  </span>{" "}
                  - Don&apos;t put all your capital with a single trader. Copy
                  multiple traders with different strategies and risk profiles
                  to spread your risk and increase stability.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Set Stop-Loss Limits
                  </span>{" "}
                  - Configure maximum loss thresholds for each trader you copy.
                  The system will automatically stop copying if losses exceed
                  your predetermined limit.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Regular Monitoring
                  </span>{" "}
                  - While Copy Trading is automated, regularly review your
                  copied positions and trader performance. Market conditions
                  change, and strategies that worked yesterday may not work
                  tomorrow.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Understand the Strategy
                  </span>{" "}
                  - Take time to understand each trader&apos;s approach and risk
                  philosophy. This helps you make informed decisions and set
                  realistic expectations for returns and volatility.
                </li>
              </ul>
            </section>
          </ScrollReveal>

          {/* Fees and Costs Section */}
          <ScrollReveal direction="up" delay={0.7}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Fees and Costs
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Our Copy Trading service is designed to be transparent and
                cost-effective:
              </p>

              <ul className="space-y-4 ml-6">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    No Subscription Fees
                  </span>{" "}
                  - There are no monthly or annual fees to access the Copy
                  Trading feature. You only pay standard trading spreads and
                  commissions.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Standard Trading Costs
                  </span>{" "}
                  - Copied trades incur the same spreads and commissions as
                  regular trades on our platform. There are no additional markup
                  fees for copy trading functionality.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Performance Fees
                  </span>{" "}
                  - Some elite traders may charge a performance fee (typically
                  10-20% of profits) which is clearly disclosed before you start
                  copying. Many traders charge no performance fees at all.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Transparent Pricing
                  </span>{" "}
                  - All fees and costs are clearly displayed in each
                  trader&apos;s profile. There are no hidden charges or surprise
                  deductions from your account.
                </li>
              </ul>
            </section>
          </ScrollReveal>

          {/* Getting Started Section */}
          <ScrollReveal direction="up" delay={0.8}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Getting Started with Copy Trading
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Ready to begin your Copy Trading journey? Here&apos;s what you
                need to do:
              </p>

              <div className="space-y-4 ml-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    1.
                  </span>{" "}
                  Create a Citadel Markets Pro account or log in to your
                  existing account.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    2.
                  </span>{" "}
                  Fund your account with your preferred deposit method. Ensure
                  you have sufficient capital to meet the minimum threshold for
                  your chosen traders.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    3.
                  </span>{" "}
                  Navigate to the Copy Trading section in your dashboard and
                  browse available traders.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    4.
                  </span>{" "}
                  Review trader profiles, performance statistics, and risk
                  metrics.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    5.
                  </span>{" "}
                  Select a trader, set your allocation amount and risk
                  parameters, then activate copying.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    6.
                  </span>{" "}
                  Monitor your copied positions and adjust your strategy as
                  needed.
                </p>
              </div>
            </section>
          </ScrollReveal>

          {/* Important Disclaimers Section */}
          <ScrollReveal direction="up" delay={0.9}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Important Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Before engaging in Copy Trading, please understand the
                following:
              </p>
              <ul className="space-y-4 ml-6">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Past performance is not indicative of future results.
                  Historical returns do not guarantee future profitability.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Copy Trading involves risk of loss. You may lose some or all
                  of your invested capital.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Market conditions can change rapidly. Strategies that were
                  successful in the past may not work in current conditions.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  You are responsible for monitoring your copied trades and
                  ensuring they align with your investment goals and risk
                  tolerance.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Citadel Markets Pro does not guarantee the performance of any
                  trader on the platform and is not responsible for trading
                  decisions made by copied traders.
                </li>
              </ul>
            </section>
          </ScrollReveal>

          {/* Contact Section */}
          <ScrollReveal direction="up" delay={1.0}>
            <section className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Start Copy Trading Today
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Join thousands of traders who are successfully copying expert
                strategies. Access our platform now and discover top-performing
                traders ready to help you achieve your financial goals.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/copy-experts"
                  className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50"
                >
                  Browse Traders
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

export default CopyTradingPage;
