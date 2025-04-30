import React from 'react';

export default function FeaturesPage() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-12 text-secondary-900 dark:text-white">
        Features
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard 
          title="Ultra-Realistic Voice"
          description="Our AI voices are indistinguishable from humans, providing natural conversations without the robotic feel."
          icon={<MicrophoneIcon />}
        />
        <FeatureCard 
          title="24/7 Availability"
          description="AI agents that never sleep, ensuring your business is always reachable whenever your customers need you."
          icon={<ClockIcon />}
        />
        <FeatureCard 
          title="Multi-Language Support"
          description="Speak with customers in over 100 languages with natural fluency, expanding your global reach."
          icon={<GlobeIcon />}
        />
        <FeatureCard 
          title="CRM Integration"
          description="Seamlessly connects with your existing business tools and CRM systems for efficient workflow."
          icon={<ConnectionIcon />}
        />
        <FeatureCard 
          title="Advanced Analytics"
          description="Get insights from every conversation to improve your business operations and customer experience."
          icon={<ChartIcon />}
        />
        <FeatureCard 
          title="Secure Infrastructure"
          description="Enterprise-grade security with end-to-end encryption to protect sensitive customer data."
          icon={<ShieldIcon />}
        />
      </div>
    </div>
  );
}

// Define interface for FeatureCard props
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Feature Card Component
function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
        <div className="text-primary-500">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-secondary-900 dark:text-white">{title}</h3>
      <p className="text-secondary-600 dark:text-secondary-300">{description}</p>
    </div>
  );
}

// Icon Components
function MicrophoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ConnectionIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
} 