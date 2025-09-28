import { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import FeatureSection from "@/components/sections/FeatureSection";
import AgentShowcase from "@/components/sections/AgentShowcase";
import HowItWorks from "@/components/sections/HowItWorks";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/layout/Footer";
import siteConfig from "@/config/site.json";

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
      
      {/* 5. FAQ - Address final concerns */}
      <FAQSection />
      
      {/* 6. Final CTA - Convert visitors */}
      <CTASection />
      
      <Footer />
    </div>
  );
} 