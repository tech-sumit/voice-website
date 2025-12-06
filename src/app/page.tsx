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
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: siteConfig.metadata.ogTitle,
    description: siteConfig.metadata.ogDescription,
    siteName: siteConfig.metadata.ogSiteName,
    url: siteConfig.url,
    type: 'website',
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.metadata.ogTitle,
    description: siteConfig.metadata.ogDescription,
    images: [`${siteConfig.url}/og-image.png`],
  },
};

export default function Home() {
  // FAQ Structured Data for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: siteConfig.faq.questions.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  // Software Application Structured Data
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteConfig.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web-based',
    description: siteConfig.description,
    url: siteConfig.url,
    featureList: siteConfig.features.map((feature) => feature.title),
  };

  return (
    <>
      {/* Structured Data for FAQs and Software */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema),
        }}
      />
      
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
    </>
  );
} 