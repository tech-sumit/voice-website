"use client";

import { motion } from "framer-motion";
import { 
  WrenchScrewdriverIcon, 
  CpuChipIcon, 
  RocketLaunchIcon,
  ArrowRightIcon,
  BoltIcon
} from "@heroicons/react/24/outline";
import siteConfig from "@/config/site.json";

export default function HowItWorks() {
  const howItWorksData = siteConfig.howItWorks;
  const steps = howItWorksData.steps;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  const icons = [WrenchScrewdriverIcon, CpuChipIcon, RocketLaunchIcon];

  return (
    <section id="how-it-works" className="py-24 bg-[var(--hw-panel)] relative overflow-hidden border-t border-[var(--hw-border)]">
      {/* Background Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-noise mix-blend-overlay"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-4 border-[var(--hw-border)] pb-6 gap-4">
           <div className="flex-1">
              <div className="text-[var(--hw-text-muted)] text-xs font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF5722] rounded-full animate-pulse"></span>
                Deployment Pipeline
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-[var(--hw-text-main)] tracking-tight">
                From Zero to <span className="text-[#FF5722]">Live Agent</span>
             </h2>
            </div>
           
           <div className="flex items-center gap-3 bg-[var(--hw-panel)] px-4 py-2 rounded border border-[var(--hw-border)] shadow-sm whitespace-nowrap">
              <BoltIcon className="w-5 h-5 text-[#FF5722]" />
              <span className="font-mono text-sm font-bold text-[var(--hw-text-main)]">
                3 STEPS TO DEPLOY
              </span>
           </div>
        </div>

        {/* The Rack Visualization */}
        <div className="relative max-w-6xl mx-auto">
           {/* Connection Bus (Line) */}
           <div className="hidden lg:block absolute top-1/2 left-0 w-full h-2 bg-gradient-to-r from-[#FF5722]/20 via-[#FF5722] to-[#FF5722]/20 -translate-y-1/2 rounded-full z-0"></div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
             viewport={{ once: true }}
             className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative z-10"
           >
             {steps.map((step, idx) => {
               const Icon = icons[idx];
            return (
              <motion.div
                key={step.number}
                variants={item}
                   className="group relative"
                 >
                    {/* Connector Dot on Bus */}
                    <div className="hidden lg:block absolute top-1/2 -left-3 w-6 h-6 bg-[var(--hw-panel)] border-4 border-[#FF5722] rounded-full -translate-y-1/2 z-0 group-hover:border-[#FF9800] transition-colors"></div>
                    
                    {/* The Card/Blade */}
                    <div className="bg-[var(--hw-chassis)] rounded-xl border border-[var(--hw-border)] p-1 shadow-[0_10px_20px_rgba(0,0,0,0.05)] group-hover:-translate-y-2 transition-transform duration-300 h-full">
                       <div className="bg-[var(--hw-panel)] rounded-lg p-6 h-full border border-[var(--hw-border)] flex flex-col relative overflow-hidden">
                          
                          {/* Step Number Badge */}
                          <div className="absolute top-0 right-0 bg-[var(--hw-chassis)] px-3 py-1.5 rounded-bl-lg border-b border-l border-[var(--hw-border)]">
                             <span className="font-mono text-xs font-bold text-[var(--hw-text-muted)] tracking-wider">{step.number}</span>
                   </div>
                   
                          {/* Icon */}
                          <div className="w-12 h-12 rounded-lg bg-[var(--hw-chassis)] border border-[var(--hw-border)] flex items-center justify-center mb-6 group-hover:border-[#FF5722] transition-colors">
                             <Icon className="w-6 h-6 text-[var(--hw-text-main)]" />
                </div>
                
                          <h3 className="text-xl font-bold text-[var(--hw-text-main)] mb-3 group-hover:text-[#FF5722] transition-colors">
                            {step.title}
                          </h3>
                          
                          <p className="text-sm text-[var(--hw-text-muted)] leading-relaxed mb-6 flex-grow">
                            {step.description}
                          </p>
                
                          {/* Status Indicator at bottom */}
                          <div className="mt-auto pt-4 border-t border-[var(--hw-border)] flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-[#FF5722] animate-pulse"></div>
                             <span className="text-[10px] font-mono uppercase text-[var(--hw-text-muted)]">
                               {idx === 0 ? 'Init' : idx === 1 ? 'Config' : 'Ready'}
                             </span>
                          </div>
                   </div>
                </div>

                    {/* Arrow for Mobile */}
                    {idx < steps.length - 1 && (
                      <div className="lg:hidden flex justify-center my-4">
                        <ArrowRightIcon className="w-6 h-6 text-[var(--hw-border)]" />
                      </div>
                    )}
              </motion.div>
            );
          })}
        </motion.div>
          </div>

      </div>
    </section>
  );
} 
