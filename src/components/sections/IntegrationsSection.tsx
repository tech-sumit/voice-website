"use client";

import { motion } from "framer-motion";
import siteConfig from "@/config/site.json";
import { 
  CommandLineIcon, 
  LinkIcon,
  ArrowsRightLeftIcon,
  EllipsisHorizontalIcon
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function IntegrationsSection() {
  const tools = siteConfig.integrations.tools;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.03 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <section id="integrations" className="py-24 bg-[var(--hw-chassis)] relative overflow-hidden border-t border-[var(--hw-border)]">
      {/* Industrial Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05]" 
           style={{ 
             backgroundImage: 'linear-gradient(var(--hw-text-main) 1px, transparent 1px), linear-gradient(90deg, var(--hw-text-main) 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-4 border-[var(--hw-border)] pb-6 gap-6">
           <div>
              <div className="text-[var(--hw-text-muted)] text-xs font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#00C853] rounded-full animate-pulse"></span>
                Ecosystem Connectivity
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-[var(--hw-text-main)] tracking-tight">
                Integration <span className="text-[#FF5722]">Hub</span>
              </h2>
           </div>
           
           <div className="flex items-center gap-3 bg-[var(--hw-panel)] px-4 py-2 rounded border border-[var(--hw-border)] shadow-sm">
              <LinkIcon className="w-5 h-5 text-[#2A7A6F]" />
              <span className="font-mono text-sm font-bold text-[var(--hw-text-main)]">
                100+ MODULES ACTIVE
              </span>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* MAIN: The Wall of Integrations */}
          <div className="lg:col-span-8">
             <div className="bg-[var(--hw-chassis)] rounded-xl p-2 border border-[var(--hw-border)] shadow-[inset_0_0_20px_rgba(0,0,0,0.05)]">
                
                {/* Inner Panel */}
                <div className="bg-[var(--hw-panel)] rounded-lg p-6 md:p-8 border border-[var(--hw-border)] relative">
                   
                   {/* Decorative Screws */}
                   <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-[var(--hw-border)] flex items-center justify-center shadow-inner"><div className="w-1 h-px bg-[#A09890] rotate-45"></div></div>
                   <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[var(--hw-border)] flex items-center justify-center shadow-inner"><div className="w-1 h-px bg-[#A09890] rotate-45"></div></div>
                   <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-[var(--hw-border)] flex items-center justify-center shadow-inner"><div className="w-1 h-px bg-[#A09890] rotate-45"></div></div>
                   <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-[var(--hw-border)] flex items-center justify-center shadow-inner"><div className="w-1 h-px bg-[#A09890] rotate-45"></div></div>

                   <motion.div 
                     variants={container}
                     initial="hidden"
                     whileInView="show"
                     viewport={{ once: true }}
                     className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
                   >
                      {tools.map((tool) => (
                        <motion.div 
                          key={tool.name}
                          variants={item}
                          className="group relative flex flex-col items-center justify-center gap-2 p-4 bg-[var(--hw-chassis)] border border-[var(--hw-border)] rounded hover:bg-white hover:border-[#FF5722] hover:shadow-md transition-all duration-200 cursor-default select-none h-28"
                        >
                           {/* Active Indicator Dot */}
                           <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#A09890]/50 group-hover:bg-[#00C853] transition-colors"></div>
                           
                           {/* Logo Image */}
                           <div className="w-10 h-10 relative flex items-center justify-center">
                             <Image
                               src={`/integration/${tool.icon}`}
                               alt={tool.name}
                               width={40}
                               height={40}
                               className="object-contain filter drop-shadow-sm group-hover:scale-110 transition-transform duration-200"
                             />
                           </div>
                           <span className="text-xs font-bold text-[var(--hw-text-muted)] group-hover:text-[var(--hw-text-main)] transition-colors text-center">
                             {tool.name}
                           </span>
                        </motion.div>
                      ))}
                      
                      {/* 100+ More Integrations Tile */}
                      <motion.div 
                        key="more-integrations"
                        variants={item}
                        className="group relative flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-br from-[var(--hw-chassis)] to-[var(--hw-panel)] border border-[var(--hw-border)] rounded hover:border-[#FF5722] hover:shadow-md transition-all duration-200 cursor-pointer select-none h-28"
                      >
                        {/* Active Indicator Dot */}
                        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#A09890]/50 group-hover:bg-[#00C853] transition-colors"></div>
                        
                        {/* Icon */}
                        <div className="w-10 h-10 relative flex items-center justify-center text-2xl">
                          <EllipsisHorizontalIcon className="w-10 h-10 text-[var(--hw-text-muted)] group-hover:text-[#FF5722] transition-colors" />
                        </div>
                        <span className="text-xs font-bold text-[var(--hw-text-muted)] group-hover:text-[var(--hw-text-main)] transition-colors text-center">
                          100+ More
                        </span>
                      </motion.div>
                   </motion.div>
                </div>
             </div>
          </div>

          {/* SIDE: Custom API & MCP */}
          <div className="lg:col-span-4 flex flex-col gap-6">
             
             {/* Custom API Card - Matching Core Modules Style */}
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="group relative"
             >
                <div className="bg-[var(--hw-panel)] rounded-2xl border border-[var(--hw-chassis)] border-b-[8px] border-r-[4px] border-b-[var(--hw-border)] border-r-[var(--hw-border)] p-8 transition-all duration-150 hover:border-b-[2px] hover:border-r-[1px] hover:translate-y-[6px] hover:shadow-none shadow-[5px_5px_15px_rgba(0,0,0,0.05)] flex flex-col items-start min-h-[240px]">
                   
                   {/* Screw Head Top Left */}
                   <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-[var(--hw-border)] flex items-center justify-center opacity-50">
                     <div className="w-1.5 h-0.5 bg-[#A09890] rotate-45"></div>
                   </div>

                   {/* Icon Area */}
                   <div className="mb-6 w-14 h-14 bg-[var(--hw-chassis)] rounded-xl flex items-center justify-center shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)] group-hover:bg-[#FF5722] transition-colors duration-200">
                      <CommandLineIcon className="h-7 w-7 text-[var(--hw-text-muted)] group-hover:text-white transition-colors duration-200" />
                   </div>

                   <div>
                      <h3 className="text-xl font-bold text-[var(--hw-text-main)] mb-3 group-hover:text-[#FF5722] transition-colors">
                        Bring Your Own API
                      </h3>
                      <p className="text-[var(--hw-text-muted)] text-sm leading-relaxed">
                        Connect any internal system via standard REST endpoints. Fetch data, update records, and trigger workflows in real-time.
                      </p>
                   </div>

                   {/* LED Indicator */}
                   <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-[var(--hw-border)] group-hover:bg-[#00C853] group-hover:shadow-[0_0_8px_#00C853] transition-all duration-300"></div>
                </div>
             </motion.div>

             {/* MCP Protocol Badge - Matching Core Modules Style */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="group relative"
             >
                <div className="bg-[var(--hw-panel)] rounded-2xl border border-[var(--hw-chassis)] border-b-[8px] border-r-[4px] border-b-[var(--hw-border)] border-r-[var(--hw-border)] p-8 transition-all duration-150 hover:border-b-[2px] hover:border-r-[1px] hover:translate-y-[6px] hover:shadow-none shadow-[5px_5px_15px_rgba(0,0,0,0.05)] flex flex-col items-start min-h-[240px]">
                   
                   {/* Screw Head Top Left */}
                   <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-[var(--hw-border)] flex items-center justify-center opacity-50">
                     <div className="w-1.5 h-0.5 bg-[#A09890] rotate-45"></div>
                   </div>

                   {/* Icon Area */}
                   <div className="mb-6 w-14 h-14 bg-[var(--hw-chassis)] rounded-xl flex items-center justify-center shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)] group-hover:bg-[#2A7A6F] transition-colors duration-200">
                      <ArrowsRightLeftIcon className="h-7 w-7 text-[var(--hw-text-muted)] group-hover:text-white transition-colors duration-200" />
                   </div>

                   <div>
                      <h3 className="text-xl font-bold text-[var(--hw-text-main)] mb-3 group-hover:text-[#2A7A6F] transition-colors">
                        Model Context Protocol
                      </h3>
                      <p className="text-[var(--hw-text-muted)] text-sm leading-relaxed">
                        We support the open MCP standard for secure, portable AI integrations.
                      </p>
                   </div>

                   {/* LED Indicator */}
                   <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-[var(--hw-border)] group-hover:bg-[#00C853] group-hover:shadow-[0_0_8px_#00C853] transition-all duration-300"></div>
                </div>
             </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
