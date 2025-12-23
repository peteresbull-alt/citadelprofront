"use client";
import React from "react";
import Navbar from "@/components/site/SampleNavbar";
import ContactSection from "./_components/ContactSection";
import LiquidityProvidersSection from "./_components/LiquidityProvidersSection";
import GoogleMapsSection from "./_components/GoogleMapsSection";
import Footer from "@/components/site/FooterSection";
import EnhancedNavbar from "@/components/site/EnhancedNavbar";


const ContactPage = () => {
  return (
    <div className="min-h-screen dark:bg-black transition-colors duration-500">
      <EnhancedNavbar />

      {/* Hero/Header Space */}
      <div className="pt-20"></div>

      {/* Contact Section */}
      <ContactSection />

      <GoogleMapsSection />

      {/* Liquidity Providers Section */}
      <LiquidityProvidersSection />

      <Footer />
    </div>
  );
};

export default ContactPage;
