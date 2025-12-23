"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Twitter, Linkedin, ChevronDown, ChevronUp } from "lucide-react";

const Footer = () => {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const footerSections = [
    {
      title: "Legal",
      links: [
        { label: "Terms Of Service", href: "/terms-service" },
        {
          label: "Privacy Policy",
          href: "/privacy-policy",
        },
        { label: "Cookies Policy", href: "/cookies" },
        { label: "Risk Disclaimer", href: "/disclaimer" },
        { label: "Conflict of Interest Policy", href: "/conflict-interest" },
        { label: "Declaration of Consent", href: "/declaration-consent" },
        {
          label: "End-User License Agreement",
          href: "/user-agreement",
        },
      ],
    },
    {
      title: "Features",
      links: [
        { label: "Copy Trading", href: "/copy-trading" },
        { label: "Social Trading", href: "/copy-trading" },
        { label: "Risk Management", href: "/disclaimer" },
        { label: "Portfolio Analytics", href: "/portfolio-analytics" },
      ],
    },
    {
      title: "Partnerships",
      links: [{ label: "Affiliate Program", href: "/affiliates" }],
    },
    {
      title: "Contact",
      links: [
        { label: "Support Center", href: "/support" },
        { label: "Email Us", href: "/email-us" },
      ],
    },
  ];

  return (
    <footer className="dark:bg-black transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        {/* Desktop Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-12">
          {footerSections.map((section, index) => (
            <div
              key={section.title}
            >
              <div>
                <h4 className="dark:text-white text-black text-base font-semibold mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-gray-800 dark:text-white hover:text-emerald-400 dark:hover:text-emerald-600 text-sm transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Accordion Layout */}
        <div className="lg:hidden space-y-4 mb-12">
          {footerSections.map((section, index) => {
            const isOpen = openSections.includes(section.title);
            return (
              <div
                key={section.title}
              >
                <div className="border-b border-gray-800 dark:border-gray-300">
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="w-full flex items-center justify-between py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <h4 className="dark:text-white text-black text-base font-semibold">
                      {section.title}
                    </h4>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-400 dark:text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-600" />
                    )}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-96 pb-4" : "max-h-0"
                    }`}
                  >
                    <ul className="space-y-3">
                      {section.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="text-gray-600 dark:text-white hover:text-emerald-400 dark:hover:text-emerald-600 text-sm transition-colors duration-300"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div>
          <div className="border-t dark:border-gray-800 border-gray-300 pt-8">
            <h5 className="dark:text-white text-black text-sm font-semibold mb-3">
              Disclaimer
            </h5>
            <p className="dark:text-gray-400 text-gray-600 text-xs leading-relaxed mb-4">
              Citadel Markets Pro is a Global financial service provider.
              Citadel Markets Pro is a registered trademark of the Citadel
              Group. All trading involves risk. Past performance is not
              indicative of future results. The content of this website must not
              be construed as personal advice.
            </p>
            <p className="dark:text-gray-500 text-gray-500 text-xs">
              © Copyright {new Date().getFullYear()} Citadel Markets Pro
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
