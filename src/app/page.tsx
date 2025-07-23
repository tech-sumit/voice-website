import { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import FeatureSection from "@/components/sections/FeatureSection";
import UseCaseSection from "@/components/sections/UseCaseSection";
import HowItWorks from "@/components/sections/HowItWorks";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
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
      <Hero />
      <IntegrationsSection />
      {/* <LogoCarousel /> */}
      {/* <StatsSection /> */}
      <HowItWorks />
      <FeatureSection />
      <UseCaseSection />
      {/* <TestimonialsSection /> */}
      {/* <PricingPreview /> */}
      {/* <FAQSection /> */}
    </div>
  );
} 