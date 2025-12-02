"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import siteConfig from "@/config/site.json";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  // Get data from siteConfig
  const faqData = siteConfig.faq;
  const faqs = faqData.questions;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[var(--hw-panel)] relative overflow-hidden border-t border-[var(--hw-border)]">
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-noise mix-blend-overlay"></div>

      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none crt-overlay opacity-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl">
        {/* Terminal Header */}
        <div className="mb-12 border-b border-[var(--hw-border)] pb-6 flex items-end justify-between">
           <div>
             <div className="text-[#FF5722] font-mono text-xs mb-2 animate-pulse">● SYSTEM_DIAGNOSTICS_ACTIVE</div>
             <h2 className="text-3xl md:text-4xl font-bold text-[var(--hw-text-main)] font-mono tracking-tight">
               TROUBLESHOOTING
             </h2>
           </div>
           <div className="hidden sm:block text-right">
              <div className="text-[var(--hw-text-muted)] font-mono text-xs">ACCESS_LEVEL: PUBLIC</div>
            </div>
        </div>
        
        <div className="space-y-4 font-mono">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group border border-[var(--hw-border)] bg-[var(--hw-chassis)] rounded-sm overflow-hidden hover:border-[#FF5722] transition-colors duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none hover:bg-[var(--hw-panel)] transition-colors duration-200"
              >
                <div className="flex items-center gap-4">
                   <span className="text-[var(--hw-text-muted)] text-xs">0{index + 1}</span>
                   <h3 className="text-base md:text-lg text-[var(--hw-text-muted)] group-hover:text-[var(--hw-text-main)] transition-colors duration-300">
                     <span className="text-[#FF5722] mr-2">&gt;</span>
                  {faq.question}
                </h3>
                </div>
                <ChevronDownIcon 
                  className={`h-5 w-5 text-[var(--hw-text-muted)] transition-all duration-300 ${
                    openIndex === index ? 'transform rotate-180 text-[#FF5722]' : 'group-hover:text-[#FF5722]'
                  }`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pl-16">
                      <div className="bg-[var(--hw-panel)] p-4 rounded-sm border-l-2 border-[var(--hw-screen)] dark:border-[#26A69A]">
                        <p className="text-[var(--hw-text-muted)] text-sm leading-relaxed">
                          <span className="text-[var(--hw-screen)] dark:text-[#26A69A] font-bold mr-2">[RESPONSE]:</span>
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        {/* Terminal Footer */}
        <div className="mt-12 flex justify-center">
           <div className="bg-[var(--hw-chassis)] border border-[var(--hw-border)] px-4 py-2 rounded flex items-center gap-2">
              <span className="w-2 h-2 bg-[#FF5722] rounded-full animate-pulse"></span>
              <span className="text-[var(--hw-text-muted)] font-mono text-xs">For advanced support, contact system admin</span>
            </div>
          </div>
      </div>
    </section>
  );
} 