"use client";
import React from "react";
import ScrollReveal from "@/components/site/ScrollReveal";
import Navbar from "@/components/site/SampleNavbar";
import Link from "next/link";
import Footer from "@/components/site/FooterSection";
import EnhancedNavbar from "@/components/site/EnhancedNavbar";



const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen py-30  dark:bg-black transition-colors duration-500">
      <EnhancedNavbar />
      <div className="max-w-4xl mx-auto px-6 py-12 lg:py-20">
        {/* Header */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
          </div>
        </ScrollReveal>

        {/* Content */}
        <div className="space-y-12">
          {/* Personal Information Section */}
          <ScrollReveal direction="up" delay={0.2}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Personal Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                When you apply for or maintain a Citadel Markets Pro Demo or
                Live account, we collect personal information about you for
                business purposes, to evaluate your financial needs, to process
                your requests and transactions, to inform you about products and
                services that may be of interest to you, and to provide client
                service. You may choose what you will receive from us at any
                point by accessing the notification option in your account. Such
                information may include:
              </p>

              <ul className="space-y-4 ml-6">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Application information
                  </span>{" "}
                  - Information that you provide to us on applications and other
                  forms, your name, address, birth date, social security number,
                  occupation, assets, and income.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Transaction Information
                  </span>{" "}
                  - Information about your transactions with us or our
                  affiliates, as well as information regarding our
                  communications with you. Examples: your account balances,
                  trading activity, your inquiries and our responses.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Verification Information
                  </span>{" "}
                  - Information necessary to verify your identity such as a
                  passport or driver&apos;s license. Examples: background
                  information about you we receive from public records or from
                  other entities not affiliated with Citadel Markets Pro. The
                  USA Patriot Act requires us to collect information and take
                  necessary actions to confirm your identity.
                </li>
              </ul>
            </section>
          </ScrollReveal>

          {/* Security Technology Section */}
          <ScrollReveal direction="up" delay={0.3}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Security Technology
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Citadel Markets Pro uses Secure Socket Layer (SSL) encryption
                technology in order to protect certain information that you
                submit. This type of technology protects you from having your
                information intercepted by anyone other than Citadel Markets Pro
                while it is being transmitted to us. We work hard to ensure that
                our websites are secure and that they meet industry standards.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We also use other safeguards such as firewalls, authentication
                systems (e.g., passwords and personal identification numbers),
                and access control mechanisms to control unauthorized access to
                systems and data.
              </p>
            </section>
          </ScrollReveal>

          {/* Sharing Information Section */}
          <ScrollReveal direction="up" delay={0.4}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Sharing Information with Our Affiliates
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                We may share personal information described above with our
                affiliates for business purposes, such as, but not limited to,
                servicing client accounts and informing clients about new
                products and services, or to aid in the trading activity of the
                company, its affiliates, or employees, and as permitted by
                applicable law.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our affiliates may include companies controlled or owned by us
                as well as companies that have an ownership interest in our
                company. The information we share with affiliates may include
                any of the information described above, such as your name,
                address, trading and account information.
              </p>
            </section>
          </ScrollReveal>

          {/* Third Parties Section */}
          <ScrollReveal direction="up" delay={0.5}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Sharing Information with Third Parties
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Citadel Markets Pro does not disclose your personal information
                to third parties, except as described in this policy. Third
                party disclosures may include sharing such information with
                non-affiliated companies that perform support services for your
                account or facilitate your transactions with Citadel Markets
                Pro, including those that provide professional, legal, or
                accounting advice to Citadel Markets Pro.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Non-affiliated companies that assist Citadel Markets Pro in
                providing services to you are required to maintain the
                confidentiality of such information to the extent they receive
                it and to use your personal information only in the course of
                providing such services and only for the purposes that Citadel
                Markets Pro dictates.
              </p>
            </section>
          </ScrollReveal>

          {/* Regulatory Disclosure Section */}
          <ScrollReveal direction="up" delay={0.6}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Regulatory Disclosure
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Under limited circumstances, Citadel Markets Pro may disclose
                your personal information to third parties as permitted by, or
                to comply with, applicable laws and regulations. For example, we
                may disclose personal information to cooperate with regulatory
                authorities and law enforcement agencies to comply with
                subpoenas or other official requests, and as necessary to
                protect our rights or property.
              </p>
            </section>
          </ScrollReveal>

          {/* Opt Out Section */}
          <ScrollReveal direction="up" delay={0.7}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Opt Out
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You are not required to supply any of the personal information
                that we may request; however, failure to do so may result in our
                being unable to open or maintain your account or to provide
                services to you. While we make every effort to ensure that all
                information we hold about you is accurate, complete, and up to
                date, you can help us considerably in this regard by promptly
                notifying us if there are any changes to your personal
                information.
              </p>
            </section>
          </ScrollReveal>

          {/* Contact Section */}
          <ScrollReveal direction="up" delay={0.8}>
            <section className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Questions or Concerns?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                If you have any questions about this privacy policy or concerns
                about how we handle your personal information, please contact
                our support team through the livechat below.
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

export default PrivacyPolicyPage;
