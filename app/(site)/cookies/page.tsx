"use client";
import React from "react";
import Navbar from "@/components/site/SampleNavbar";
import Link from "next/link";
import Footer from "@/components/site/FooterSection";
import EnhancedNavbar from "@/components/site/EnhancedNavbar";

const CookiesPolicyPage = () => {
  return (
    <div className="min-h-screen py-30  dark:bg-black transition-colors duration-500">
      <EnhancedNavbar />
      <div className="max-w-4xl mx-auto px-6 py-12 lg:py-20">
        {/* Header */}

        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Cookies Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Last Updated: November 2025
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          {/* Introduction Section */}

          <section>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Introduction
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              When you use our Website, Citadel Markets Pro will use cookies to
              distinguish you from other users of our Website. This helps us
              provide you with a more relevant and effective experience,
              including presenting the Website according to your needs and
              preferences.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              This Cookie Policy provides you with comprehensive information
              about the cookies we use and the way in which we use them. You
              should also read our Privacy Policy in conjunction with this
              Policy.
            </p>
          </section>

          {/* What is a Cookie Section */}

          <section>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              What is a Cookie?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Cookies are small files of information that often include a unique
              identification number or value, which are stored on your
              computer&apos;s hard drive as a result of you using our Website.
              Unless you have adjusted your browser setting so that it will
              refuse cookies, our system will issue cookies as soon as you visit
              our Website.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Cookies are frequently used on many websites on the internet and
              you can choose if and how a cookie will be accepted by changing
              your preferences and options in your browser. Some of our business
              partners (e.g. advertisers) use cookies on our Website. We have no
              access to, or control over, these cookies.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The cookies do not contain personally identifying information nor
              are they used to identify you. You may choose to disable the
              cookies. However, you will not be able to access several parts of
              our Website if you choose to disable the cookie acceptance on your
              browser.
            </p>
          </section>

          {/* How to Delete and Block Section */}

          <section>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              How to Delete and Block Cookies
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You can choose to accept or decline cookies. Most web browsers
              automatically accept cookies, but you can usually modify your
              browser setting to decline cookies if you prefer. This may prevent
              you from taking full advantage of the website. For further
              information about disabling cookies, please refer to{" "}
              <a
                href="https://www.allaboutcookies.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-500 hover:text-emerald-600 underline"
              >
                www.allaboutcookies.org
              </a>
            </p>
          </section>

          {/* Your Consent Section */}

          <section>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Your Consent
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              By continuing to use our Website, you are agreeing to our placing
              cookies on your computer in order to analyze the way you use our
              Website. If you do not wish to accept cookies in connection with
              your use of this Website, you must stop using our Website.
            </p>
          </section>

          {/* Session Cookies Section */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Session Cookies
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              We use session cookies for the following purposes:
            </p>
            <ul className="space-y-4 ml-6">
              <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To allow you to carry information across pages of our site and
                avoid having to re-enter information.
              </li>
              <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Within registration to allow you to access stored information.
              </li>
            </ul>
          </section>

          {/* Persistent Cookies Section */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Persistent Cookies
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              We use persistent cookies for the following purposes:
            </p>
            <ul className="space-y-4 ml-6">
              <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To help us recognize you as a unique visitor (just a number)
                when you return to our website and to allow us to tailor content
                or advertisements to match your preferred interests or to avoid
                showing you the same adverts repeatedly.
              </li>
              <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To compile anonymous, aggregated statistics that allow us to
                understand how users use our site and to help us improve the
                structure of our Website.
              </li>
              <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To internally identify you by account name, name, email address,
                customer ID, currency and location (geographic and computer
                ID/IP address).
              </li>
              <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Within research surveys to ensure you are not invited to
                complete a questionnaire too often or after you have already
                done so.
              </li>
            </ul>
          </section>

          {/* Third Party Cookies Section */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Third Party Cookies
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Third parties serve cookies via this site. These are used for the
              following purposes:
            </p>
            <ul className="space-y-4 ml-6">
              <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To serve advertisements on our site and track whether these
                advertisements are clicked on by users.
              </li>
              <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To control how often you are shown a particular advertisement.
              </li>
              <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To tailor content to your preferences.
              </li>
              <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To count the number of anonymous users of our site.
              </li>
              <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                For website usage analysis.
              </li>
            </ul>
          </section>

          {/* Web Beacons Section */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Use of Web Beacons
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Some of our Web pages may contain electronic images known as Web
              beacons (sometimes known as clear gifs) that allow us to count
              users who have visited these pages. Web beacons collect only
              limited information which including a cookie number, time and date
              of a page view, and a description of the page on which the Web
              beacon resides.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may also carry web beacons placed by third party advertisers.
              These beacons do not carry any personally identifiable information
              and are only used to track the effectiveness of a particular
              campaign.
            </p>
          </section>

          {/* Opt Out Section */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Opt Out
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              You are not required to supply any of the personal information
              that we may request. However, failure to do so may result in our
              being unable to open or maintain your account or to provide
              services to you. While we make every effort to ensure that all
              information we hold about you is accurate, complete and up to
              date, you can help us considerably in this regard by promptly
              notifying us if there are any changes to your personal
              information.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you do not wish to have your personal information disclosed to
              third parties as described in this Policy, please contact us via
              email at{" "}
              <a
                href="mailto:support@citadelmarketspro.com"
                className="text-emerald-500 hover:text-emerald-600 underline"
              >
                support@citadelmarketspro.com
              </a>
            </p>
          </section>

          {/* Contact Section */}
          <section className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Questions or Concerns?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              If you wish to know more about cookies please consult the help
              menu on your web browser or visit independent information
              providers such as{" "}
              <a
                href="https://www.allaboutcookies.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-500 hover:text-emerald-600 underline"
              >
                www.allaboutcookies.org
              </a>
              . If you have any questions regarding our privacy or security
              measures, please contact our support team.
            </p>
            <Link
              href="/"
              className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50"
            >
              Go Back Home
            </Link>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CookiesPolicyPage;
