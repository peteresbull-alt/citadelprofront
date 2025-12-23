"use client";

import ServicesSection from "@/components/site/ServicesSection";
import CryptoHeroSection from "@/components/site/AnotherSampleHero";
import Navbar from "@/components/site/SampleNavbar";
import HowItWorks from "@/components/site/HowItWorks";
import VerifiedCompanySection from "@/components/site/VerifiedCompany";
import FAQSection from "@/components/site/FAQs";
import TeamSection from "@/components/site/TeamSection";
import GlobalStatsSection from "@/components/site/GlobalStatsSection";
import InstrumentsSection from "@/components/site/InstrumentsSection";
import ReadyToStartSection from "@/components/site/ReadyToStartSection";
import TopLeadersSection from "@/components/site/TopLeadersSection";
import Footer from "@/components/site/FooterSection";
import EnhancedNavbar from "@/components/site/EnhancedNavbar";

export default function Home() {
  return (
    <>
      <EnhancedNavbar />
      <CryptoHeroSection />
      <GlobalStatsSection />
      <ServicesSection />
      <HowItWorks />
      <InstrumentsSection />
      <ReadyToStartSection />
      <TeamSection />
      <TopLeadersSection />
      <FAQSection />
      <VerifiedCompanySection />
      <Footer />
    </>
  );
}
