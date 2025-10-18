"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
// import ScrollReveal from "@/components/ui/ScrollReveal"; // ✅ Import scroll animation wrapper

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I start trading stocks on your platform?",
      answer:
        "Create an account, complete verification, and fund your wallet. Once your account is active, you can browse listed stocks, choose a ticker, and execute buy or sell orders directly from the dashboard.",
    },
    {
      question: "What stock markets do you support?",
      answer:
        "We provide access to major global exchanges including NASDAQ, NYSE, and LSE. Additional regional markets are available depending on your jurisdiction and account type.",
    },
    {
      question: "Is there a minimum investment amount?",
      answer:
        "No, you can start with as little as one share or even fractional shares for supported stocks. This allows you to diversify your portfolio without a large upfront capital requirement.",
    },
    {
      question: "How long does it take to settle a stock trade?",
      answer:
        "Stock trades typically settle within two business days (T+2). However, in some cases—such as high-volume trading or international transfers—processing may take slightly longer.",
    },
    {
      question: "Do you charge any trading or withdrawal fees?",
      answer:
        "We offer highly competitive trading fees with zero hidden charges. Withdrawal fees depend on your chosen payment method and currency.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "Our dedicated support team is available 24/7 via live chat, email, or through the Help Center. You can also submit a ticket directly from your account dashboard.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white dark:bg-black py-24 px-6 transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <ScrollReveal direction="up" delay={0.2}>
          <h2 className="text-4xl lg:text-5xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Frequently Asked Questions
          </h2>
        </ScrollReveal>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <ScrollReveal key={index} direction="up" delay={0.1 * index}>
                <div
                  className={`border border-gray-300 dark:border-gray-800 rounded-lg overflow-hidden transition-all duration-300 ${
                    isOpen ? "bg-gray-100 dark:bg-gray-900" : "bg-transparent"
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between cursor-pointer items-center text-left px-6 py-5 focus:outline-none"
                  >
                    <span className="font-medium text-gray-900 dark:text-white text-lg">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-700 dark:text-gray-300 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-700 dark:text-gray-300 flex-shrink-0" />
                    )}
                  </button>

                  {/* Answer */}
                  <div
                    className={`transition-all duration-500 ease-in-out ${
                      isOpen
                        ? "max-h-40 opacity-100 px-6 pb-5"
                        : "max-h-0 opacity-0 px-6 pb-0"
                    }`}
                  >
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
