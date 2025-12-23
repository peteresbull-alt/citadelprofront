"use client";
import React from "react";
import ScrollReveal from "@/components/site/ScrollReveal";
import Navbar from "@/components/site/SampleNavbar";
import Link from "next/link";
import Footer from "@/components/site/FooterSection";
import EnhancedNavbar from "@/components/site/EnhancedNavbar";

const EULAPage = () => {
  return (
    <div className="min-h-screen py-30  dark:bg-black transition-colors duration-500">
      <EnhancedNavbar />
      <div className="max-w-4xl mx-auto px-6 py-12 lg:py-20">
        {/* Header */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              End-User License Agreement
            </h1>
          </div>
        </ScrollReveal>

        {/* Content */}
        <div className="space-y-12">
          {/* Introduction Section */}
          <ScrollReveal direction="up" delay={0.2}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Agreement Overview
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                This End-User License Agreement (&quot;EULA&quot;) is a legal
                agreement between you (either an individual or a single entity)
                and Citadel Markets Pro Group of Companies (&quot;Citadel
                Markets Pro,&quot; &quot;we,&quot; &quot;us,&quot; or
                &quot;our&quot;) for the use of our software applications,
                including but not limited to our web-based trading platform,
                mobile applications, desktop applications, and any associated
                software tools (collectively, the &quot;Software&quot;).
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                By installing, accessing, or using the Software, you acknowledge
                that you have read, understood, and agree to be bound by the
                terms of this EULA. If you do not agree to these terms, you must
                not install, access, or use the Software.
              </p>
            </section>
          </ScrollReveal>

          {/* License Grant Section */}
          <ScrollReveal direction="up" delay={0.3}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                License Grant
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Subject to your compliance with this EULA, Citadel Markets Pro
                grants you a limited, non-exclusive, non-transferable, revocable
                license to:
              </p>
              <ul className="space-y-4 ml-6">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Access and Use
                  </span>{" "}
                  - Access and use the Software solely for your personal,
                  non-commercial trading activities through a valid Citadel
                  Markets Pro account.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Installation
                  </span>{" "}
                  - Install the Software on devices you own or control, subject
                  to any device limitations specified by us.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Updates
                  </span>{" "}
                  - Receive and install updates, upgrades, and patches to the
                  Software that we may make available from time to time.
                </li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
                This license does not constitute a sale of the Software or any
                portion thereof. All rights not expressly granted to you are
                reserved by Citadel Markets Pro.
              </p>
            </section>
          </ScrollReveal>

          {/* License Restrictions Section */}
          <ScrollReveal direction="up" delay={0.4}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                License Restrictions
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                You agree that you will NOT:
              </p>
              <ul className="space-y-4 ml-6">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Copy, modify, adapt, translate, or create derivative works
                  based on the Software.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Reverse engineer, decompile, disassemble, or otherwise attempt
                  to discover the source code or underlying algorithms of the
                  Software.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Rent, lease, lend, sell, sublicense, assign, distribute,
                  publish, transfer, or otherwise make the Software available to
                  third parties.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Remove, alter, or obscure any proprietary notices, labels, or
                  marks on or within the Software.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Use the Software for any illegal purpose or in violation of
                  any applicable laws or regulations.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Bypass, circumvent, or attempt to bypass or circumvent any
                  security measures or access controls implemented in the
                  Software.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Use any automated system, including robots, spiders, or
                  scrapers, to access or extract data from the Software.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Interfere with or disrupt the integrity or performance of the
                  Software or the data contained therein.
                </li>
              </ul>
            </section>
          </ScrollReveal>

          {/* Intellectual Property Section */}
          <ScrollReveal direction="up" delay={0.5}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Intellectual Property Rights
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                The Software and all intellectual property rights therein,
                including but not limited to copyrights, trademarks, trade
                secrets, patents, and proprietary information, are and shall
                remain the exclusive property of Citadel Markets Pro and its
                licensors.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                This EULA does not grant you any rights to use Citadel Markets
                Pro&apos;s trademarks, logos, domain names, or other distinctive
                brand features except as expressly permitted in writing by
                Citadel Markets Pro. You acknowledge that any feedback,
                suggestions, or ideas you provide regarding the Software may be
                used by Citadel Markets Pro without any obligation or
                compensation to you.
              </p>
            </section>
          </ScrollReveal>

          {/* Software Updates Section */}
          <ScrollReveal direction="up" delay={0.6}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Software Updates and Modifications
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Citadel Markets Pro may, from time to time, develop updates,
                upgrades, patches, bug fixes, and other modifications to improve
                the Software. These updates may be automatically downloaded and
                installed without prior notice to you.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You acknowledge that Citadel Markets Pro may require you to
                install updates as a condition of continued access to the
                Software. We reserve the right to modify, suspend, or
                discontinue any feature or functionality of the Software at any
                time without liability to you.
              </p>
            </section>
          </ScrollReveal>

          {/* Data Collection Section */}
          <ScrollReveal direction="up" delay={0.7}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Data Collection and Usage
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                The Software may collect and transmit certain data to Citadel
                Markets Pro, including:
              </p>
              <ul className="space-y-4 ml-6">
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Technical Information
                  </span>{" "}
                  - Device information, operating system details, IP addresses,
                  browser type, and usage statistics to improve the Software and
                  provide technical support.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Trading Data
                  </span>{" "}
                  - Information about your trading activities, account balances,
                  positions, and transaction history necessary to provide our
                  services.
                </li>
                <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Analytics Data
                  </span>{" "}
                  - Aggregated and anonymized usage patterns and performance
                  metrics to enhance user experience and optimize Software
                  functionality.
                </li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
                Collection and use of your data is governed by our Privacy
                Policy, which is incorporated into this EULA by reference. By
                accepting this EULA, you consent to such data collection and
                usage as described in the Privacy Policy.
              </p>
            </section>
          </ScrollReveal>

          {/* Third-Party Components Section */}
          <ScrollReveal direction="up" delay={0.8}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Third-Party Software and Services
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                The Software may incorporate or interact with third-party
                software components, libraries, or services. Your use of such
                third-party components may be subject to additional terms and
                conditions imposed by the respective third-party providers.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Citadel Markets Pro does not warrant or assume responsibility
                for the functionality, security, or availability of third-party
                software or services. Any issues or disputes arising from
                third-party components should be addressed directly with the
                relevant third-party provider.
              </p>
            </section>
          </ScrollReveal>

          {/* Warranty Disclaimer Section */}
          <ScrollReveal direction="up" delay={0.9}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Warranty Disclaimer
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                THE SOFTWARE IS PROVIDED &quot;AS IS&quot; AND &quot;AS
                AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS
                OR IMPLIED. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW,
                CITADEL MARKETS PRO DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT
                LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Citadel Markets Pro does not warrant that the Software will be
                uninterrupted, error-free, secure, or free from viruses or other
                harmful components. You acknowledge that your use of the
                Software is at your sole risk, and you assume all responsibility
                for any damage to your device, loss of data, or other harm
                resulting from your use of the Software.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Some jurisdictions do not allow the exclusion of implied
                warranties, so the above exclusions may not apply to you. In
                such cases, the duration of any implied warranties shall be
                limited to the extent permitted by applicable law.
              </p>
            </section>
          </ScrollReveal>

          {/* Limitation of Liability Section */}
          <ScrollReveal direction="up" delay={1.0}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Limitation of Liability
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT
                SHALL CITADEL MARKETS PRO, ITS AFFILIATES, OFFICERS, DIRECTORS,
                EMPLOYEES, AGENTS, OR LICENSORS BE LIABLE FOR ANY INDIRECT,
                INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY
                DAMAGES, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS OF
                PROFITS, GOODWILL, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT
                OF OR RELATING TO YOUR USE OR INABILITY TO USE THE SOFTWARE.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                IN NO EVENT SHALL CITADEL MARKETS PRO&apos;S TOTAL LIABILITY TO
                YOU FOR ALL DAMAGES EXCEED THE AMOUNT OF FIFTY DOLLARS ($50.00)
                OR THE AMOUNT YOU PAID TO CITADEL MARKETS PRO FOR ACCESS TO THE
                SOFTWARE IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM,
                WHICHEVER IS GREATER.
              </p>
            </section>
          </ScrollReveal>

          {/* Indemnification Section */}
          <ScrollReveal direction="up" delay={1.1}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Indemnification
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You agree to indemnify, defend, and hold harmless Citadel
                Markets Pro, its affiliates, officers, directors, employees,
                agents, and licensors from and against any and all claims,
                liabilities, damages, losses, costs, expenses, or fees
                (including reasonable attorneys&apos; fees) arising from your
                use of the Software, your violation of this EULA, or your
                violation of any rights of any third party.
              </p>
            </section>
          </ScrollReveal>

          {/* Termination Section */}
          <ScrollReveal direction="up" delay={1.2}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Termination
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                This EULA is effective until terminated. Your rights under this
                EULA will terminate automatically without notice from Citadel
                Markets Pro if you fail to comply with any term of this EULA.
                Citadel Markets Pro may also terminate this EULA at any time
                with or without cause.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Upon termination, you must immediately cease all use of the
                Software and delete all copies of the Software from your
                devices. The provisions of this EULA regarding intellectual
                property rights, warranty disclaimers, limitation of liability,
                indemnification, and governing law shall survive termination.
              </p>
            </section>
          </ScrollReveal>

          {/* Export Controls Section */}
          <ScrollReveal direction="up" delay={1.3}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Export Controls
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The Software may be subject to export control laws and
                regulations of the United States and other countries. You agree
                to comply with all applicable export and re-export restrictions
                and regulations, and you will not transfer or permit the
                transfer of the Software to a prohibited country or otherwise in
                violation of any such restrictions or regulations.
              </p>
            </section>
          </ScrollReveal>

          {/* Governing Law Section */}
          <ScrollReveal direction="up" delay={1.4}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Governing Law and Jurisdiction
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                This EULA shall be governed by and construed in accordance with
                the laws of the United States and the state in which Citadel
                Markets Pro maintains its principal place of business, without
                regard to its conflict of law provisions.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Any dispute arising out of or relating to this EULA shall be
                resolved through binding arbitration in accordance with the
                rules of the American Arbitration Association. The arbitration
                shall take place in the United States, and judgment on the award
                may be entered in any court having jurisdiction.
              </p>
            </section>
          </ScrollReveal>

          {/* Severability Section */}
          <ScrollReveal direction="up" delay={1.5}>
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Severability and Entire Agreement
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                If any provision of this EULA is found to be invalid, illegal,
                or unenforceable, the remaining provisions shall continue in
                full force and effect. The invalid provision shall be modified
                to the minimum extent necessary to make it valid and
                enforceable.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                This EULA, together with our Terms of Service and Privacy
                Policy, constitutes the entire agreement between you and Citadel
                Markets Pro regarding the Software and supersedes all prior or
                contemporaneous agreements, understandings, and communications,
                whether written or oral.
              </p>
            </section>
          </ScrollReveal>

          {/* Contact Section */}
          <ScrollReveal direction="up" delay={1.6}>
            <section className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Questions About This License Agreement?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                If you have any questions about this End-User License Agreement,
                please contact our legal department at{" "}
                <a
                  href="mailto:support@citadelmarketspro.com"
                  className="text-emerald-500 hover:text-emerald-600 underline"
                >
                  support@citadelmarketspro.com
                </a>{" "}
                or through the livechat below.
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

export default EULAPage;
