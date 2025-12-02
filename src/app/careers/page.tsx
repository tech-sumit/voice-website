import { Metadata } from "next";
import siteConfig from '@/config/site.json';
import { CpuChipIcon, GlobeAltIcon, LightBulbIcon } from "@heroicons/react/24/solid";

export const metadata: Metadata = {
  title: "Careers - VoiceAI",
  description: "Join our team and help shape the future of AI voice technology. Explore career opportunities at VoiceAI.",
};

export default function CareersPage() {
  const careersData = siteConfig.careers;
  const positions = careersData.positions;

  // Map index to icon component
  const getFeatureIcon = (index: number) => {
    switch (index) {
      case 0: return <CpuChipIcon className="w-6 h-6 text-[var(--hw-panel)]" />;
      case 1: return <GlobeAltIcon className="w-6 h-6 text-[var(--hw-panel)]" />;
      case 2: return <LightBulbIcon className="w-6 h-6 text-[var(--hw-panel)]" />;
      default: return <CpuChipIcon className="w-6 h-6 text-[var(--hw-panel)]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--hw-chassis)]">
      {/* Hero Section - Recruitment Board */}
      <section className="pt-20 pb-16 border-b-[4px] border-[var(--hw-border)] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-noise mix-blend-overlay"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block bg-[var(--hw-text-main)] px-4 py-1 mb-6 shadow-[0_2px_0_rgba(0,0,0,0.2)]">
               <span className="text-[var(--hw-panel)] text-xs font-mono uppercase tracking-widest">Personnel Logistics</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-[var(--hw-text-main)] mb-6 tracking-tight uppercase">
              Join The <span className="text-[#FF5722]">Crew</span>
            </h1>
            <p className="text-xl text-[var(--hw-text-muted)] mb-8 leading-relaxed font-medium max-w-2xl mx-auto">
              {careersData.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {careersData.benefits.map((benefit, index) => (
                <div key={index} className="px-4 py-2 bg-[var(--hw-border)] rounded border border-[var(--hw-border)] text-[var(--hw-text-main)] text-sm font-bold uppercase tracking-wide shadow-sm">
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us Section - Technical Specs */}
      <section className="py-20 bg-[var(--hw-panel)] relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--hw-text-main)] mb-4 uppercase tracking-tight">
              {careersData.whyJoin.title}
            </h2>
            <div className="w-24 h-1 bg-[#FF5722] mx-auto mb-6"></div>
            <p className="text-lg text-[var(--hw-text-muted)] max-w-2xl mx-auto">
              {careersData.whyJoin.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careersData.whyJoin.features.map((feature, index) => (
              <div key={index} className="p-8 bg-[var(--hw-chassis)] rounded-lg border-l-4 border-[var(--hw-screen)] shadow-[0_4px_6px_rgba(0,0,0,0.05)] hover:translate-y-[-4px] transition-transform duration-200">
                <div className="w-12 h-12 bg-[var(--hw-screen)] rounded flex items-center justify-center mb-6 shadow-md">
                  {getFeatureIcon(index)}
                </div>
                <h3 className="text-xl font-bold text-[var(--hw-text-main)] mb-3 uppercase tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-[var(--hw-text-muted)] leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section - Job Board */}
      <section className="py-20 bg-[var(--hw-border)] border-t border-[var(--hw-border)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12 border-b-2 border-[var(--hw-border)] pb-4">
            <h2 className="text-3xl font-bold text-[var(--hw-text-main)] uppercase tracking-tight">
              Open Positions
            </h2>
            <span className="text-[var(--hw-text-muted)] font-mono text-sm hidden sm:block">STATUS: HIRING</span>
          </div>

          <div className="space-y-6">
            {positions.map((position, index) => (
              <div key={index} className="group bg-[var(--hw-panel)] border border-[var(--hw-border)] p-6 rounded hover:border-[#FF5722] transition-colors duration-200 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-[var(--hw-text-main)] mb-2 group-hover:text-[#FF5722] transition-colors">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-xs font-mono text-[var(--hw-text-muted)] uppercase tracking-wide">
                      <span className="bg-[var(--hw-chassis)] px-2 py-1 rounded">{position.department}</span>
                      <span className="bg-[var(--hw-chassis)] px-2 py-1 rounded">{position.location}</span>
                      <span className="bg-[var(--hw-chassis)] px-2 py-1 rounded">{position.type}</span>
                    </div>
                  </div>
                  <button className="mt-4 md:mt-0 px-6 py-2 bg-[var(--hw-text-main)] text-[var(--hw-panel)] text-sm font-bold uppercase tracking-wider rounded shadow-[0_4px_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-[4px] transition-all hover:bg-[#FF5722] hover:shadow-[0_4px_0_#B33016]">
                    Apply
                  </button>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 border-t border-[var(--hw-chassis)] pt-6">
                   <div className="md:col-span-2">
                      <p className="text-[var(--hw-text-muted)] mb-4 leading-relaxed">
                  {position.description}
                </p>
                   </div>
                   <div className="bg-[var(--hw-chassis)] p-4 rounded text-sm">
                      <h4 className="font-bold text-[var(--hw-text-main)] mb-2 uppercase text-xs tracking-wider">Requirements:</h4>
                      <ul className="space-y-2">
                    {position.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-start gap-2 text-[var(--hw-text-muted)]">
                            <span className="text-[#FF5722] mt-1">›</span>
                            {req}
                          </li>
                    ))}
                  </ul>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#3D3935] dark:bg-[var(--hw-panel)] text-[#F5F1E8] dark:text-[var(--hw-text-main)] text-center relative overflow-hidden">
        {/* Background Stripes */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
           backgroundImage: 'repeating-linear-gradient(45deg, #fff, #fff 1px, transparent 1px, transparent 10px)'
        }}></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase tracking-tight text-[#FF5722]">
            {careersData.cta.title}
          </h2>
          <p className="text-xl text-[#A09890] dark:text-[var(--hw-text-muted)] mb-10 max-w-2xl mx-auto font-mono">
            {careersData.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href={`mailto:${siteConfig.company.email}`}
              className="px-8 py-4 bg-[#F5F1E8] dark:bg-[var(--hw-text-main)] text-[#3D3935] dark:text-[var(--hw-panel)] font-bold uppercase tracking-wider rounded hover:bg-white transition-colors duration-200 shadow-[0_4px_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-[4px]"
            >
              {careersData.cta.primaryButton}
            </a>
            <a
              href="/contact"
              className="px-8 py-4 border-2 border-[#6D6560] dark:border-[var(--hw-text-muted)] text-[#F5F1E8] dark:text-[var(--hw-text-main)] font-bold uppercase tracking-wider rounded hover:border-white hover:text-white transition-colors duration-200"
            >
              {careersData.cta.secondaryButton}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
