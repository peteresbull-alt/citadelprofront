"use client";

import ServicesSection from "@/components/site/ServicesSection";
import CryptoHeroSection from "@/components/site/AnotherSampleHero";
// import HomeHero from "@/components/site/HomeHero";
// import Navbar from "@/components/site/Navbar";
// import HeroSection from "@/components/site/SampleHero";
import Navbar from "@/components/site/SampleNavbar";
import HowItWorks from "@/components/site/HowItWorks";
import VerifiedCompanySection from "@/components/site/VerifiedCompany";
import FAQSection from "@/components/site/FAQs";
import TeamSection from "@/components/site/TeamSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <CryptoHeroSection />
      <ServicesSection />
      <HowItWorks />
      <VerifiedCompanySection />
      <TeamSection />
      <FAQSection />
    </>
  );
}
