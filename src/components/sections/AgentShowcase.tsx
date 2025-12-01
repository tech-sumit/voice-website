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
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-noise mix-blend-overlay"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - File Cabinet Style */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="bg-[var(--hw-border)] px-8 py-4 rounded-lg shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),0_4px_8px_rgba(0,0,0,0.05)] border border-[var(--hw-border)] mb-6">
             <h2 className="text-3xl md:text-4xl font-bold text-[var(--hw-text-main)] tracking-tight uppercase">
               Agent <span className="text-[#1A5C54] dark:text-[#4DB6AC]">Library</span>
             </h2>
          </div>
          <p className="text-[var(--hw-text-muted)] max-w-2xl leading-relaxed font-medium">
            {agentShowcaseData.subtitle}
          </p>
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
                  ? "bg-[#1A5C54] text-[#F5F1E8] dark:bg-[#4DB6AC] dark:text-[#0F0F0F] border-[#1A5C54] dark:border-[#4DB6AC] translate-y-1 shadow-[0_-4px_0_rgba(0,0,0,0.1)]"
                  : "bg-[var(--hw-border)] text-[var(--hw-text-muted)] border-[var(--hw-border)] hover:bg-[var(--hw-chassis)] translate-y-2"
              }`}
            >
              {category.name}
            </button>
          ))}
          {/* Tab Base Line */}
          <div className="w-full h-2 bg-[#1A5C54] dark:bg-[#4DB6AC] rounded-full mt-[-8px] z-10 relative"></div>
        </motion.div>

        {/* Cartridge Grid */}
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
                {/* The Cartridge Body */}
                <div className="bg-[var(--hw-cartridge)] rounded-t-[4px] rounded-b-[20px] p-4 pb-8 shadow-[10px_10px_20px_rgba(0,0,0,0.15)] transform transition-transform duration-300 group-hover:-translate-y-4 relative overflow-hidden">
                  
                  {/* Top Grip Texture */}
                  <div className="h-12 w-full border-b-4 border-[var(--hw-panel)] mb-4 flex justify-center gap-1 pt-2">
                     {[...Array(8)].map((_, i) => (
                       <div key={i} className="w-1 h-6 bg-[var(--hw-panel)] rounded-full"></div>
                     ))}
                  </div>

                  {/* The Label Area */}
                  <div className="bg-[var(--hw-label)] rounded-lg p-5 min-h-[200px] shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] relative">
                     {/* Label "Tape" */}
                     <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-[#FF5722] opacity-80 rotate-[-2deg]"></div>

                     {/* Header */}
                     <div className="flex items-start gap-4 mb-4 border-b-2 border-[var(--hw-border)] pb-4">
                        <div className="w-12 h-12 bg-[var(--hw-chassis)] rounded-md flex items-center justify-center border border-[var(--hw-border)]">
                          {agent.avatar ? (
                             <Image src={agent.avatar} alt={agent.name} width={40} height={40} className="rounded" />
                          ) : (
                             <PhoneIcon className="w-6 h-6 text-[var(--hw-text-muted)]" />
                          )}
                        </div>
                        <div>
                           <h3 className="text-lg font-bold text-[var(--hw-text-main)] leading-tight">{agent.name}</h3>
                           <span className="text-xs font-mono text-[#1A5C54] dark:text-[#4DB6AC] bg-[var(--hw-chassis)] px-2 py-0.5 rounded mt-1 inline-block">
                             {agent.category}
                           </span>
                        </div>
                     </div>

                     <p className="text-[var(--hw-text-muted)] text-sm leading-relaxed font-medium">
                       {agent.description}
                     </p>
                  </div>

                  {/* Connector Pins at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-4 bg-[var(--hw-panel)] flex justify-center gap-2 px-8">
                     {[...Array(6)].map((_, i) => (
                       <div key={i} className="w-4 h-full bg-[#FFD700] opacity-80 rounded-t-sm"></div>
                     ))}
                  </div>
                </div>
                
                {/* Slot Shadow (stays on ground) */}
                <div className="absolute -bottom-4 left-4 right-4 h-4 bg-black/20 blur-lg rounded-full transition-all duration-300 group-hover:scale-75 group-hover:opacity-10"></div>
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
