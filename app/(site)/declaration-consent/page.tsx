"use client";
import React from "react";
import ScrollReveal from "@/components/site/ScrollReveal";
import Navbar from "@/components/site/SampleNavbar";
import Link from "next/link";
import Footer from "@/components/site/FooterSection";
import EnhancedNavbar from "@/components/site/EnhancedNavbar";

const DeclarationOfConsentPage = () => {
  return (
    <div className="min-h-screen py-30 dark:bg-black transition-colors duration-500">
      <EnhancedNavbar />
      <div className="max-w-4xl mx-auto px-6 py-12 lg:py-20">
        {/* Header */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Declaration of Consent
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Last Updated: November 2024
            </p>
          </div>
        </ScrollReveal>

        {/* Content */}
        <div className="space-y-12">
          {/* Introduction Section */}
          <ScrollReveal direction="up" delay={0.2}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Your Consent Matters
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                By creating an account, accessing our platform, or using any of
                Citadel Markets Pro services, you explicitly consent to the
                collection, processing, storage, and use of your personal
                information as outlined in our Privacy Policy and Terms of
                Service.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                This Declaration of Consent explains what you are agreeing to
                when you use our services and how you can manage or withdraw
                your consent at any time.
              </p>
            </section>
          </ScrollReveal>

          {/* Consent to Terms Section */}
          <ScrollReveal direction="up" delay={0.3}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Consent to Terms and Policies
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                By using our services, you acknowledge and consent to the
                following:
              </p>

              <ul className="space-y-4 ml-6">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Terms of Service
                  </span>{" "}
                  - You agree to be bound by our Terms of Service, including all
                  rules, policies, and procedures that govern the use of our
                  platform and trading services.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Privacy Policy
                  </span>{" "}
                  - You consent to the collection, use, and disclosure of your
                  personal information as described in our Privacy Policy,
                  including data necessary for account verification and
                  regulatory compliance.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Risk Acknowledgment
                  </span>{" "}
                  - You acknowledge the risks associated with trading financial
                  instruments and confirm that you understand you may lose some
                  or all of your invested capital.
                </li>
              </ul>
            </section>
          </ScrollReveal>

          {/* Data Processing Section */}
          <ScrollReveal direction="up" delay={0.4}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Consent to Data Processing
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                You expressly consent to Citadel Markets Pro processing your
                personal data for the purposes of providing our services,
                including but not limited to account management, transaction
                processing, identity verification, fraud prevention, and
                regulatory compliance.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                This includes:
              </p>

              <ul className="space-y-3 ml-6">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Collecting and storing your personal identification documents
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Processing your financial information and transaction history
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Analyzing your trading patterns for security and compliance
                  purposes
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Sharing your information with regulatory authorities when
                  required by law
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Using secure third-party service providers to facilitate our
                  services
                </li>
              </ul>
            </section>
          </ScrollReveal>

          {/* Communication Consent Section */}
          <ScrollReveal direction="up" delay={0.5}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Consent to Communications
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                By providing your contact information, you consent to receive
                communications from Citadel Markets Pro through various
                channels, including email, SMS, phone calls, and in-platform
                notifications.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                These communications may include:
              </p>

              <ul className="space-y-4 ml-6">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Transactional Communications
                  </span>{" "}
                  - Account notifications, trade confirmations, security alerts,
                  and other service-related messages necessary for platform
                  operation.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Marketing Communications
                  </span>{" "}
                  - Promotional offers, new features, market analysis, and
                  educational content. You can opt out of marketing
                  communications at any time through your account settings.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Regulatory Communications
                  </span>{" "}
                  - Updates to our terms, policies, or other legal notices
                  required by law or regulation.
                </li>
              </ul>
            </section>
          </ScrollReveal>

          {/* Electronic Signatures Section */}
          <ScrollReveal direction="up" delay={0.6}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Electronic Signatures and Records
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                You consent to the use of electronic signatures, contracts,
                orders, and other records, and to electronic delivery of
                notices, policies, and records of transactions initiated or
                completed through our platform.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You agree that electronic signatures have the same legal effect
                as handwritten signatures and that clicking &quot;I Agree,&quot;
                &quot;Submit,&quot; or similar buttons constitutes your
                electronic signature and agreement to be bound by the terms
                presented.
              </p>
            </section>
          </ScrollReveal>

          {/* Cookie Consent Section */}
          <ScrollReveal direction="up" delay={0.7}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Consent to Cookies and Tracking
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                You consent to our use of cookies and similar tracking
                technologies to enhance your experience, analyze platform usage,
                and deliver personalized content and advertisements.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We use both essential cookies necessary for platform
                functionality and optional cookies for analytics and marketing
                purposes. You can manage your cookie preferences through your
                browser settings or our cookie consent manager.
              </p>
            </section>
          </ScrollReveal>

          {/* Identity Verification Section */}
          <ScrollReveal direction="up" delay={0.8}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Consent to Identity Verification
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                In compliance with anti-money laundering (AML) and know your
                customer (KYC) regulations, you consent to providing identity
                verification documents and authorize Citadel Markets Pro to
                verify your identity through third-party verification services.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                This may include background checks, credit checks, and
                verification of your identity documents with government
                databases and other authoritative sources. You understand that
                failure to complete identity verification may result in
                restrictions or termination of your account.
              </p>
            </section>
          </ScrollReveal>

          {/* Recording Consent Section */}
          <ScrollReveal direction="up" delay={0.9}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Consent to Recording
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You consent to the recording and monitoring of your
                communications with Citadel Markets Pro, including telephone
                conversations, video calls, live chat sessions, and electronic
                communications. These recordings may be used for quality
                assurance, training, dispute resolution, and regulatory
                compliance purposes.
              </p>
            </section>
          </ScrollReveal>

          {/* Withdrawal of Consent Section */}
          <ScrollReveal direction="up" delay={1.0}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Withdrawal of Consent
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                You have the right to withdraw your consent at any time.
                However, please note that:
              </p>

              <ul className="space-y-3 ml-6 mb-4">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Withdrawal of certain consents may affect our ability to
                  provide services to you
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Some data processing activities are required by law and cannot
                  be opted out of while maintaining an active account
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Withdrawal of consent does not affect the lawfulness of
                  processing based on consent before its withdrawal
                </li>
              </ul>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To withdraw your consent or manage your preferences, please
                contact our support team or access your account settings. For
                marketing communications, you can unsubscribe using the link
                provided in each email.
              </p>
            </section>
          </ScrollReveal>

          {/* Minors Section */}
          <ScrollReveal direction="up" delay={1.1}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Consent for Minors
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our services are not intended for individuals under the age of
                18. By using our services, you confirm that you are of legal age
                to enter into binding contracts and that you have not falsified
                your age. If we discover that a minor has provided personal
                information, we will take steps to delete such information and
                terminate the account.
              </p>
            </section>
          </ScrollReveal>

          {/* Updates to Consent Section */}
          <ScrollReveal direction="up" delay={1.2}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Updates to This Declaration
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may update this Declaration of Consent from time to time to
                reflect changes in our practices or legal requirements. Any
                material changes will be communicated to you via email or
                through a prominent notice on our platform. Your continued use
                of our services after such notification constitutes your consent
                to the updated terms.
              </p>
            </section>
          </ScrollReveal>

          {/* Contact Section */}
          <ScrollReveal direction="up" delay={1.3}>
            <section className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Questions About Your Consent?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                If you have questions about this Declaration of Consent, wish to
                withdraw your consent, or need to update your preferences,
                please contact our support team or data protection officer
                through the livechat below.
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

export default DeclarationOfConsentPage;
