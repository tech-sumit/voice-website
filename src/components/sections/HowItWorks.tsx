"use client";

import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import siteConfig from "@/config/site.json";

export default function HowItWorks() {
  // Get data from siteConfig
  const howItWorksData = siteConfig.howItWorks;
  const steps = howItWorksData.steps;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="how-it-works" className="py-24 bg-[var(--hw-border)] relative overflow-hidden border-t border-[var(--hw-border)]">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-noise mix-blend-overlay"></div>
      
      {/* Printed "Circuit" Lines Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%">
           <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
             <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" className="text-[var(--hw-text-main)]" strokeWidth="0.5"/>
           </pattern>
           <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Plate Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[var(--hw-chassis)] -z-10"></div>
          <div className="inline-block bg-[var(--hw-border)] px-6">
             <h2 className="text-3xl font-bold text-[var(--hw-text-main)] tracking-widest uppercase border-4 border-[var(--hw-text-main)] px-6 py-2">
               Signal Flow
             </h2>
          </div>
          <p className="mt-4 text-[var(--hw-text-muted)] font-mono text-sm tracking-tight max-w-2xl mx-auto">
            {howItWorksData.description}
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-8 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto relative"
        >
          {/* Connecting "Cables" for Desktop */}
          <div className="hidden md:block absolute top-[60px] left-[16%] right-[16%] h-2 bg-[var(--hw-text-main)] -z-10 rounded-full"></div>

          {steps.map((step, index) => {
            return (
              <motion.div
                key={step.number}
                variants={item}
                className="flex flex-col items-center text-center relative group"
              >
                {/* The "Port" or "Jack" Node */}
                <div className="w-32 h-32 rounded-full bg-[var(--hw-chassis)] border-[8px] border-[var(--hw-border)] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.1)] flex items-center justify-center mb-8 relative z-10 transition-transform duration-300 group-hover:scale-105 group-hover:border-[#FF5722]">
                   {/* Inner Ring */}
                   <div className="w-20 h-20 rounded-full border-2 border-dashed border-[var(--hw-text-muted)] flex items-center justify-center bg-[var(--hw-panel)]">
                      <span className="text-4xl font-bold text-[var(--hw-text-main)] font-mono">{step.number}</span>
                   </div>
                   
                   {/* Status LED */}
                   <div className="absolute top-0 right-0 w-4 h-4 bg-[var(--hw-border)] rounded-full border border-[var(--hw-chassis)] group-hover:bg-[#FF5722] group-hover:shadow-[0_0_10px_#FF5722] transition-all duration-300"></div>
                </div>
                
                {/* Info Plate */}
                <div className="bg-[var(--hw-panel)] p-6 rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,0.1)] border border-[var(--hw-border)] w-full relative">
                   {/* Screw Heads */}
                   <div className="absolute top-2 left-2 w-2 h-2 bg-[var(--hw-border)] rounded-full"></div>
                   <div className="absolute top-2 right-2 w-2 h-2 bg-[var(--hw-border)] rounded-full"></div>
                   <div className="absolute bottom-2 left-2 w-2 h-2 bg-[var(--hw-border)] rounded-full"></div>
                   <div className="absolute bottom-2 right-2 w-2 h-2 bg-[var(--hw-border)] rounded-full"></div>

                   <h3 className="text-lg font-bold text-[var(--hw-text-main)] mb-2 uppercase tracking-wide">{step.title}</h3>
                   <p className="text-[var(--hw-text-muted)] text-sm leading-relaxed mb-4">{step.description}</p>
                   
                   <div className="flex items-center justify-center space-x-2 pt-3 border-t border-[var(--hw-chassis)]">
                     <CheckCircleIcon className="h-4 w-4 text-[#1A5C54]" />
                     <span className="text-xs font-mono text-[#1A5C54] uppercase">Synced</span>
                   </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-3 px-8 py-3 bg-[var(--hw-text-main)] text-[var(--hw-panel)] rounded-md shadow-[0_4px_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-[4px] transition-all cursor-pointer font-mono text-sm tracking-wider uppercase">
            <span className="w-2 h-2 bg-[#00C853] rounded-full animate-pulse"></span>
            <span>System Ready for Deployment</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 