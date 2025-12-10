"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
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
      {/* Background Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-noise mix-blend-overlay"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-4 border-[var(--hw-border)] pb-6 gap-4">
           <div className="flex-1">
              <div className="text-[var(--hw-text-muted)] text-xs font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF5722] rounded-full animate-pulse"></span>
                Knowledge Base
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-[var(--hw-text-main)] tracking-tight">
                Frequently Asked <span className="text-[#FF5722]">Questions</span>
             </h2>
           </div>
           
           <div className="flex items-center gap-3 bg-[var(--hw-panel)] px-4 py-2 rounded border border-[var(--hw-border)] shadow-sm whitespace-nowrap">
              <QuestionMarkCircleIcon className="w-5 h-5 text-[#FF5722]" />
              <span className="font-mono text-sm font-bold text-[var(--hw-text-main)]">
                {faqs.length} TOPICS
              </span>
            </div>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group bg-[var(--hw-chassis)] border border-[var(--hw-border)] rounded-lg overflow-hidden hover:border-[#FF5722] transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-start w-full px-6 py-5 text-left focus:outline-none hover:bg-[var(--hw-panel)] transition-colors duration-200 gap-4"
              >
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <span className="flex-shrink-0 text-[var(--hw-text-muted)] font-mono text-xs mt-1 w-8">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-[var(--hw-text-main)] group-hover:text-[#FF5722] transition-colors flex-1">
                  {faq.question}
                </h3>
                </div>
                
                <ChevronDownIcon 
                  className={`flex-shrink-0 h-5 w-5 text-[var(--hw-text-muted)] transition-all duration-300 mt-1 ${
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
                    className="overflow-hidden border-t border-[var(--hw-border)]"
                  >
                    <div className="px-6 py-5 bg-[var(--hw-panel)]">
                      <div className="flex gap-4">
                        <div className="w-8 flex-shrink-0"></div>
                        <p className="text-[var(--hw-text-muted)] text-sm md:text-base leading-relaxed flex-1">
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
        
        {/* Bottom Info */}
        <div className="mt-16 flex justify-center">
           <div className="inline-flex items-center gap-3 px-6 py-3 bg-[var(--hw-chassis)] rounded-full border border-[var(--hw-border)] shadow-sm">
              <div className="w-2 h-2 bg-[#FF5722] rounded-full animate-pulse"></div>
              <span className="text-[var(--hw-text-muted)] font-mono text-xs uppercase tracking-wide">
                Need more help? Contact our support team
              </span>
            </div>
          </div>
      </div>
    </section>
  );
} 