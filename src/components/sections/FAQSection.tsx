"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const faqs = [
  {
    question: "How accurate is the AI voice technology?",
    answer: "Our AI voice technology is remarkably accurate, with a 98.5% success rate in understanding and responding to customer inquiries. The voices sound natural and human-like, with appropriate pauses, intonations, and conversational flow."
  },
  {
    question: "Can I customize how the AI voice agents sound?",
    answer: "Yes, you can fully customize your AI voice agents. Choose from our library of 50+ voice options across different accents and languages, or work with us to create a custom voice that matches your brand identity."
  },
  {
    question: "How does VoiceAI integrate with my existing systems?",
    answer: "VoiceAI offers seamless integration with popular CRMs, calendars, and business tools through our API. We provide pre-built connectors for systems like Salesforce, HubSpot, Google Calendar, and many more. Our team can also help with custom integrations for specialized systems."
  },
  {
    question: "What languages do your AI agents support?",
    answer: "Our AI agents can speak and understand over 100 languages fluently, including English, Spanish, French, German, Japanese, Mandarin, Hindi, Arabic, and many more. Each language maintains natural conversational abilities and accurate pronunciation."
  },
  {
    question: "Is my customer data secure with VoiceAI?",
    answer: "Absolutely. We implement bank-level encryption and security protocols. VoiceAI is SOC 2 Type II compliant, HIPAA compliant (for healthcare clients), and GDPR compliant. We never sell or share your data, and you retain full ownership of all conversation data."
  },
  {
    question: "How quickly can I get started with VoiceAI?",
    answer: "Most customers are up and running within 1-2 weeks. Our streamlined implementation process includes setup, integration with your systems, voice selection, conversation flow design, and testing. For simpler use cases, you can be live in as little as 3-5 days."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-12 bg-gradient-to-b from-surface-50 to-surface-100 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 relative overflow-hidden">
      {/* Creative background elements */}
      <div className="absolute inset-0">
        {/* Dotted pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle, #9DC08B 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Geometric shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-secondary-600/20 rounded-lg rotate-12"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-bright-600/20 rounded-full"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 border-2 border-secondary-500/20 rotate-45"></div>

        {/* Subtle gradient orbs */}
        <div className="absolute top-20 right-1/3 w-64 h-64 bg-secondary-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-bright-600/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block"
          >
            <div className="inline-flex items-center px-4 py-2 bg-secondary-100 dark:bg-secondary-900/30 border border-secondary-300 dark:border-secondary-600/30 rounded-full mb-4">
              <div className="w-2 h-2 bg-secondary-600 dark:bg-secondary-500 rounded-full mr-3 animate-pulse"></div>
              <span className="text-secondary-700 dark:text-secondary-400 text-sm font-medium tracking-wide uppercase">FAQ</span>
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4 leading-tight"
          >
            Frequently{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-bright-400">
              Asked
            </span>{" "}
            Questions
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed"
          >
            Everything you need to know about VoiceAI
          </motion.p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white/80 dark:bg-surface-800/50 backdrop-blur-sm border border-neutral-200 dark:border-surface-700/50 rounded-2xl overflow-hidden hover:bg-white dark:hover:bg-surface-700/50 hover:border-neutral-300 dark:hover:border-surface-600/50 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none group-hover:bg-neutral-50 dark:group-hover:bg-surface-700/30 transition-colors duration-300"
              >
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">
                  {faq.question}
                </h3>
                <ChevronDownIcon 
                  className={`h-5 w-5 text-accent-600 dark:text-accent-500 transition-all duration-300 ${
                    openIndex === index ? 'transform rotate-180 text-primary-500 dark:text-primary-400' : 'group-hover:text-primary-500 dark:group-hover:text-primary-400'
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
                    <div className="px-6 pb-4 text-neutral-600 dark:text-neutral-400 border-t border-neutral-200 dark:border-surface-700/50">
                      <p className="pt-4 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center space-x-4 px-8 py-4 bg-white/80 dark:bg-surface-800/30 backdrop-blur-sm border border-neutral-300 dark:border-surface-700/50 rounded-full shadow-sm">
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full bg-secondary-600 dark:bg-secondary-500 animate-pulse`} style={{animationDelay: `${i * 0.2}s`}}></div>
              ))}
            </div>
            <span className="text-neutral-600 dark:text-neutral-400 text-sm">Still have questions? We&apos;re here to help</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 