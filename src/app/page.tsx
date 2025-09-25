import { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import FeatureSection from "@/components/sections/FeatureSection";
import AgentShowcase from "@/components/sections/AgentShowcase";
import UseCaseSection from "@/components/sections/UseCaseSection";
import HowItWorks from "@/components/sections/HowItWorks";
// import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/layout/Footer";
import siteConfig from "@/config/site.json";
import IntegrationsSection from "@/components/sections/IntegrationsSection";

export const metadata: Metadata = {
  title: siteConfig.metadata.title,
  description: siteConfig.metadata.description,
  keywords: siteConfig.metadata.keywords,
  authors: siteConfig.metadata.authors,
  openGraph: {
    title: siteConfig.metadata.ogTitle,
    description: siteConfig.metadata.ogDescription,
    siteName: siteConfig.metadata.ogSiteName,
  },
  themeColor: siteConfig.metadata.themeColor,
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 1. Hero - First impression and value proposition */}
      <Hero />
      
      {/* 2. Features - What we offer (technical capabilities) */}
      <FeatureSection />
      
      {/* 3. How It Works - Process explanation (builds trust) */}
      <HowItWorks />
      
      {/* 4. Agent Showcase - Real examples and use cases (proof) */}
      <AgentShowcase />
      
      {/* 5. Use Cases - Industry applications (relevance) */}
      {/* <UseCaseSection /> */}
      
      {/* 6. Integrations - Technical compatibility (reduces friction) */}
      {/* <IntegrationsSection /> */}
      
      {/* Future sections for complete user journey */}
      {/* 7. Social Proof */}
      {/* <LogoCarousel /> */}
      {/* <StatsSection /> */}
      {/* <TestimonialsSection /> */}
      
      {/* 8. Pricing - After value is established */}
      {/* <PricingPreview /> */}
      
      {/* 9. FAQ - Address final concerns */}
      <FAQSection />
      <Footer />
    </div>
  );
} 