"use client";
import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";


const ContactSection = () => {
  return (
    <section className="dark:bg-black py-20 px-6 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 px-4">
              Have a question or require specialist assistance?
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
              Our dedicated customer service team is here 24/7 to assist you.
            </p>
          </div>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Find Us Card */}
          <div>
            <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-8 text-center border-2 border-gray-200 dark:border-gray-800 hover:border-emerald-400 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/20">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Find Us
              </h3>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p className="leading-relaxed">
                  225 Central Park West,
                  <br />
                  New York, NY 10024
                </p>
                <div className="w-full h-px bg-gray-300 dark:bg-gray-700"></div>
                <p className="leading-relaxed">
                  1100 15th St NW 4th Floor
                  <br />
                  Washington, DC 20005
                </p>
              </div>
            </div>
          </div>

          {/* Talk To Us Card */}
          <div>
            <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-8 text-center border-2 border-gray-200 dark:border-gray-800 hover:border-emerald-400 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/20">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Talk To Us
              </h3>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <a
                  href="tel:+16062297623"
                  className="block text-lg font-semibold hover:text-emerald-500 transition-colors"
                >
                  +1 (606) 229-7623
                </a>
                <a
                  href="tel:+447888880119"
                  className="block text-lg font-semibold hover:text-emerald-500 transition-colors"
                >
                  +44 7888 880119
                </a>
                <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-4">
                  (International charges may apply)
                </p>
              </div>
            </div>
          </div>

          {/* Email Enquiries Card */}
          <div>
            <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-8 text-center border-2 border-gray-200 dark:border-gray-800 hover:border-emerald-400 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/20">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Email Enquiries
              </h3>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <a
                  href="mailto:support@citadelmarketspro.com"
                  className="block text-sm font-medium hover:text-emerald-500 transition-colors break-all"
                >
                  support@citadelmarketspro.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;