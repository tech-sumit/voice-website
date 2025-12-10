"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PhoneIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import siteConfig from "@/config/site.json";

interface Agent {
  id: string;
  name: string;
  category: string;
  tags: string[];
  description: string;
  phoneNumber: string;
  avatar?: string;
}

interface Category {
  id: string;
  name: string;
  agents: Agent[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function AgentShowcase() {
  const [activeCategory, setActiveCategory] = useState("ecommerce");
  
  // Get data from siteConfig
  const agentShowcaseData = siteConfig.agentShowcase;
  const currentCategory = agentShowcaseData.categories.find((cat: Category) => cat.id === activeCategory);

  return (
    <section id="agents" className="py-24 bg-[var(--hw-chassis)] relative overflow-hidden border-t border-[var(--hw-border)]">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.05]" 
           style={{ 
             backgroundImage: 'linear-gradient(var(--hw-text-main) 1px, transparent 1px), linear-gradient(90deg, var(--hw-text-main) 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-noise mix-blend-overlay"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-4 border-[var(--hw-border)] pb-6 gap-4">
           <div className="flex-1">
              <div className="text-[var(--hw-text-muted)] text-xs font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF5722] rounded-full animate-pulse"></span>
                Pre-Built Solutions
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-[var(--hw-text-main)] tracking-tight">
                Agent <span className="text-[#FF5722]">Library</span>
             </h2>
            </div>
           
           <div className="flex items-center gap-3 bg-[var(--hw-panel)] px-4 py-2 rounded border border-[var(--hw-border)] shadow-sm whitespace-nowrap">
              <PhoneIcon className="w-5 h-5 text-[#FF5722]" />
              <span className="font-mono text-sm font-bold text-[var(--hw-text-main)]">
                {agentShowcaseData.categories.reduce((acc: number, cat: Category) => acc + cat.agents.length, 0)}+ AGENTS READY
              </span>
           </div>
        </div>

        {/* Category Tabs - Physical Folder Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {agentShowcaseData.categories.map((category: Category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`relative px-6 py-3 rounded-t-xl font-bold text-sm uppercase tracking-wide transition-all duration-200 border-t-2 border-x-2 ${
                activeCategory === category.id
                  ? "bg-[#FF5722] text-white border-[#FF5722] translate-y-1 shadow-[0_-4px_0_rgba(0,0,0,0.1)]"
                  : "bg-[var(--hw-border)] text-[var(--hw-text-muted)] border-[var(--hw-border)] hover:bg-[var(--hw-chassis)] translate-y-2"
              }`}
            >
              {category.name}
            </button>
          ))}
          {/* Tab Base Line */}
          <div className="w-full h-2 bg-[#FF5722] rounded-full mt-[-8px] z-10 relative"></div>
        </motion.div>

        {/* Agent Grid */}
        <motion.div 
          key={activeCategory}
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
        >
          {currentCategory?.agents.map((agent: Agent) => {
            return (
              <motion.div 
                key={agent.id}
                variants={item}
                className="group relative"
              >
                {/* Physical Hardware Button Style Card */}
                <div className="bg-[var(--hw-panel)] rounded-2xl border border-[var(--hw-chassis)] border-b-[8px] border-r-[4px] border-b-[var(--hw-border)] border-r-[var(--hw-border)] p-8 transition-all duration-150 hover:border-b-[2px] hover:border-r-[1px] hover:translate-y-[6px] hover:shadow-none shadow-[5px_5px_15px_rgba(0,0,0,0.05)] flex flex-col h-full relative">
                  
                  {/* Decorative Screw */}
                  <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[var(--hw-border)] flex items-center justify-center shadow-inner">
                    <div className="w-1 h-px bg-[#A09890] rotate-45"></div>
                    </div>
                    
                  {/* Icon/Avatar */}
                  <div className="mb-6 w-14 h-14 bg-[var(--hw-chassis)] rounded-xl flex items-center justify-center shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)] group-hover:bg-[#FF5722] transition-colors duration-200">
                          {agent.avatar ? (
                             <Image src={agent.avatar} alt={agent.name} width={40} height={40} className="rounded" />
                          ) : (
                      <PhoneIcon className="h-7 w-7 text-[var(--hw-text-muted)] group-hover:text-white transition-colors duration-200" />
                          )}
                        </div>

                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-[var(--hw-text-main)] mb-2 group-hover:text-[#FF5722] transition-colors">
                      {agent.name}
                    </h3>
                    <span className="inline-block text-xs font-mono text-[var(--hw-text-muted)] bg-[var(--hw-chassis)] px-2 py-1 rounded mb-4">
                          {agent.category}
                        </span>
                    <p className="text-sm text-[var(--hw-text-muted)] leading-relaxed">
                       {agent.description}
                     </p>
                  </div>
                  
                  {/* Status LED */}
                  <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-[var(--hw-border)] group-hover:bg-[#00C853] group-hover:shadow-[0_0_8px_#00C853] transition-all duration-300"></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
           <div className="inline-block border-2 border-[var(--hw-border)] rounded px-6 py-2">
              <span className="text-[var(--hw-text-muted)] text-xs font-mono uppercase tracking-widest">
                End of Library // {agentShowcaseData.categories.length} Categories Loaded
              </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
