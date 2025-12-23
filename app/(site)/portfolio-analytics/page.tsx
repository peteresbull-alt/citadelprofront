"use client";
import React from "react";
import ScrollReveal from "@/components/site/ScrollReveal";
import Navbar from "@/components/site/SampleNavbar";
import Link from "next/link";
import Footer from "@/components/site/FooterSection";
import EnhancedNavbar from "@/components/site/EnhancedNavbar";

const PortfolioAnalyticsPage = () => {
  return (
    <div className="min-h-screen py-30 dark:bg-black transition-colors duration-500">
      <EnhancedNavbar />
      <div className="max-w-4xl mx-auto px-6 py-12 lg:py-20">
        {/* Header */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Portfolio Analytics
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Comprehensive insights and tools to track your trading performance
            </p>
          </div>
        </ScrollReveal>

        {/* Content */}
        <div className="space-y-12">
          {/* Overview Section */}
          <ScrollReveal direction="up" delay={0.2}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                What is Portfolio Analytics?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Portfolio Analytics is a powerful suite of tools designed to
                give you complete visibility into your trading performance on
                Citadel Markets Pro. Our advanced analytics platform transforms
                your trading data into actionable insights, helping you
                understand what works, identify areas for improvement, and make
                informed decisions to optimize your trading strategy.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Whether you&apos;re tracking individual positions, analyzing
                your overall portfolio performance, or comparing your results
                against market benchmarks, our analytics dashboard provides the
                clarity and depth you need to succeed in today&apos;s dynamic
                financial markets.
              </p>
            </section>
          </ScrollReveal>

          {/* Key Features Section */}
          <ScrollReveal direction="up" delay={0.3}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Key Analytics Features
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Our Portfolio Analytics platform includes comprehensive features
                to help you monitor and improve your trading performance:
              </p>

              <ul className="space-y-4 ml-6">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Real-Time Performance Dashboard
                  </span>{" "}
                  - Monitor your portfolio value, profit and loss, and account
                  balance in real-time. View your daily, weekly, monthly, and
                  yearly returns with interactive charts and graphs that update
                  instantly as market conditions change.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Position Tracking
                  </span>{" "}
                  - Get detailed insights into every open and closed position.
                  Track entry and exit points, holding periods, profit margins,
                  and performance metrics for each trade. Identify your most
                  profitable positions and learn from less successful trades.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Asset Allocation Analysis
                  </span>{" "}
                  - Visualize how your capital is distributed across different
                  asset classes, markets, and instruments. Ensure your portfolio
                  maintains optimal diversification and identify concentration
                  risks before they become problems.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Risk Metrics
                  </span>{" "}
                  - Access advanced risk analytics including Value at Risk
                  (VaR), maximum drawdown, Sharpe ratio, and volatility
                  measures. Understand your risk-adjusted returns and compare
                  them against industry benchmarks.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Trade History Analysis
                  </span>{" "}
                  - Review your complete trading history with advanced filtering
                  and sorting options. Analyze win rates, average gain per
                  winning trade, average loss per losing trade, and identify
                  patterns in your trading behavior.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Performance Benchmarking
                  </span>{" "}
                  - Compare your portfolio performance against major market
                  indices, sector benchmarks, and peer traders. Understand how
                  your strategy performs relative to broader market movements.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Custom Reports
                  </span>{" "}
                  - Generate detailed performance reports for any time period.
                  Export data in multiple formats including PDF, Excel, and CSV
                  for tax reporting, auditing, or personal record-keeping.
                </li>
              </ul>
            </section>
          </ScrollReveal>

          {/* Performance Metrics Section */}
          <ScrollReveal direction="up" delay={0.4}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Understanding Performance Metrics
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Our analytics platform provides a wide range of performance
                metrics to help you evaluate your trading success:
              </p>

              <ul className="space-y-4 ml-6">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Total Return
                  </span>{" "}
                  - The overall percentage gain or loss on your portfolio since
                  inception or for a specific time period. This includes both
                  realized and unrealized gains from all positions.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Profit Factor
                  </span>{" "}
                  - The ratio of gross profit to gross loss. A profit factor
                  above 1.0 indicates profitability, while higher values
                  demonstrate stronger performance consistency.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Win Rate
                  </span>{" "}
                  - The percentage of trades that resulted in profit. This
                  metric helps you understand the accuracy of your entry and
                  exit timing.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Average Win and Average Loss
                  </span>{" "}
                  - Compare the average size of your winning trades versus
                  losing trades. A positive expectancy (average win larger than
                  average loss) is crucial for long-term profitability.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Maximum Drawdown
                  </span>{" "}
                  - The largest peak-to-trough decline in your portfolio value.
                  This metric indicates the worst-case scenario you&apos;ve
                  experienced and helps assess your risk tolerance.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Sharpe Ratio
                  </span>{" "}
                  - A measure of risk-adjusted returns. Higher Sharpe ratios
                  indicate better returns relative to the risk taken, making it
                  easier to compare different trading strategies.
                </li>
              </ul>
            </section>
          </ScrollReveal>

          {/* Risk Analysis Section */}
          <ScrollReveal direction="up" delay={0.5}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Risk Analysis Tools
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Understanding and managing risk is essential for sustainable
                trading success. Our analytics platform includes sophisticated
                risk assessment tools:
              </p>

              <ul className="space-y-4 ml-6">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Position Sizing Analysis
                  </span>{" "}
                  - Review how much capital you allocate to each trade relative
                  to your total portfolio. Identify if you&apos;re
                  over-concentrating in specific positions or maintaining
                  appropriate position sizes.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Correlation Analysis
                  </span>{" "}
                  - Understand how your positions correlate with each other and
                  with broader market movements. Reduce portfolio risk by
                  identifying and avoiding highly correlated positions.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Exposure Monitoring
                  </span>{" "}
                  - Track your total exposure across different markets, sectors,
                  and currencies. Set alerts for when your exposure exceeds
                  predefined thresholds to prevent overextension.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Volatility Tracking
                  </span>{" "}
                  - Monitor the volatility of your portfolio and individual
                  positions. Higher volatility means greater uncertainty and
                  potential for both gains and losses.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Stress Testing
                  </span>{" "}
                  - Simulate how your portfolio would perform under various
                  market scenarios including crashes, rallies, and high
                  volatility periods. Prepare for adverse conditions before they
                  occur.
                </li>
              </ul>
            </section>
          </ScrollReveal>

          {/* Asset Allocation Section */}
          <ScrollReveal direction="up" delay={0.6}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Asset Allocation Insights
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Proper asset allocation is fundamental to portfolio construction
                and risk management. Our analytics provide detailed visibility
                into your allocation strategy:
              </p>

              <ul className="space-y-4 ml-6">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    By Asset Class
                  </span>{" "}
                  - See how your capital is distributed across stocks,
                  cryptocurrencies, forex, commodities, and other asset classes.
                  Ensure balanced exposure aligned with your investment
                  objectives.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    By Sector
                  </span>{" "}
                  - For stock positions, view your allocation across different
                  sectors such as technology, healthcare, finance, and energy.
                  Identify sector concentration risks and opportunities.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    By Geography
                  </span>{" "}
                  - Understand your geographic exposure across different regions
                  and countries. Diversify internationally to reduce
                  country-specific risks.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    By Strategy
                  </span>{" "}
                  - If you use copy trading or multiple strategies, analyze how
                  much capital is allocated to each approach. Optimize your
                  strategy mix for better risk-adjusted returns.
                </li>
              </ul>
            </section>
          </ScrollReveal>

          {/* Trade Analytics Section */}
          <ScrollReveal direction="up" delay={0.7}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Trade Analytics and Patterns
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Dive deep into your trading behavior and identify patterns that
                impact your performance:
              </p>

              <ul className="space-y-4 ml-6">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Time Analysis
                  </span>{" "}
                  - Discover which days of the week, times of day, or months you
                  perform best. Adjust your trading schedule to capitalize on
                  your most productive periods.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Holding Period Analysis
                  </span>{" "}
                  - Analyze average holding times for winning versus losing
                  trades. Determine if you&apos;re cutting winners too early or
                  holding losers too long.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Instrument Performance
                  </span>{" "}
                  - Identify which specific instruments, currency pairs, or
                  stocks you trade most profitably. Focus on your strengths and
                  avoid consistently unprofitable instruments.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Trade Size Analysis
                  </span>{" "}
                  - Examine the relationship between trade size and
                  profitability. Determine your optimal position sizing for
                  maximum returns with acceptable risk.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Consecutive Wins and Losses
                  </span>{" "}
                  - Track streaks of winning and losing trades. Understand how
                  you react emotionally to consecutive outcomes and avoid
                  revenge trading or overconfidence.
                </li>
              </ul>
            </section>
          </ScrollReveal>

          {/* Custom Reports Section */}
          <ScrollReveal direction="up" delay={0.8}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Custom Reports and Exports
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Generate detailed reports tailored to your specific needs:
              </p>

              <ul className="space-y-4 ml-6">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Periodic Performance Reports
                  </span>{" "}
                  - Create comprehensive monthly, quarterly, or annual
                  performance reports with all key metrics, charts, and
                  analysis. Perfect for tracking progress toward your goals.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Tax Documentation
                  </span>{" "}
                  - Export detailed transaction histories and profit/loss
                  statements formatted for tax reporting. Simplify your tax
                  preparation with organized, accurate trading data.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Custom Date Ranges
                  </span>{" "}
                  - Analyze performance for any custom time period. Compare
                  different periods to identify trends and evaluate strategy
                  changes.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Multiple Export Formats
                  </span>{" "}
                  - Download reports and data in PDF for presentations, Excel
                  for deeper analysis, or CSV for importing into other tools.
                </li>
              </ul>
            </section>
          </ScrollReveal>

          {/* Mobile Access Section */}
          <ScrollReveal direction="up" delay={0.9}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Access Anywhere, Anytime
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Your portfolio analytics are available across all devices:
              </p>
              <ul className="space-y-4 ml-6">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Access your complete analytics dashboard from desktop, tablet,
                  or mobile devices with a responsive, optimized interface.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Receive real-time notifications for important portfolio
                  events, risk threshold breaches, or significant market
                  movements affecting your positions.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Sync seamlessly across devices so your analysis and custom
                  settings are always available wherever you trade.
                </li>
              </ul>
            </section>
          </ScrollReveal>

          {/* Getting Started Section */}
          <ScrollReveal direction="up" delay={1.0}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Getting Started with Analytics
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Portfolio Analytics is automatically available to all Citadel
                Markets Pro users at no additional cost:
              </p>

              <div className="space-y-4 ml-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    1.
                  </span>{" "}
                  Log in to your Citadel Markets Pro account and navigate to the
                  Analytics section in your dashboard.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    2.
                  </span>{" "}
                  Explore the various analytics modules including performance,
                  risk, allocation, and trade analysis.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    3.
                  </span>{" "}
                  Customize your dashboard to display the metrics most important
                  to your trading strategy.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    4.
                  </span>{" "}
                  Set up alerts and notifications for key performance indicators
                  and risk thresholds.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    5.
                  </span>{" "}
                  Review your analytics regularly and use the insights to refine
                  and improve your trading approach.
                </p>
              </div>
            </section>
          </ScrollReveal>

          {/* Contact Section */}
          <ScrollReveal direction="up" delay={1.1}>
            <section className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Optimize Your Trading Performance
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Start leveraging our powerful portfolio analytics today to gain
                deeper insights into your trading performance and make
                data-driven decisions that improve your results.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/login"
                  className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50"
                >
                  View Your Analytics
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

export default PortfolioAnalyticsPage;
