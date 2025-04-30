"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/Button";

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
    <section className="py-20 bg-surface-50 dark:bg-surface-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-primary-400/20 dark:bg-primary-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[35rem] h-[35rem] bg-accent-400/15 dark:bg-accent-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-3 py-1 rounded-full bg-accent-100 dark:bg-accent-900/30 border border-accent-200 dark:border-accent-800 text-accent-800 dark:text-accent-300 text-sm font-medium mb-3"
          >
            <span className="flex h-2 w-2 rounded-full bg-accent-500 mr-2"></span>
            FAQ
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white"
          >
            Frequently <span className="text-gradient-primary">Asked</span> Questions
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
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
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none"
              >
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
                  {faq.question}
                </h3>
                <ChevronDownIcon 
                  className={`h-5 w-5 text-accent-500 transition-transform duration-300 ${
                    openIndex === index ? 'transform rotate-180' : ''
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
                    <div className="px-6 pb-4 text-neutral-600 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-700">
                      <p className="pt-4">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Don&apos;t see your question here?
          </p>
          <Button 
            href="/contact"
            variant="gradient" 
            size="lg" 
            className="shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 hover:scale-[1.02]"
          >
            Contact Us
          </Button>
        </motion.div>
      </div>
    </section>
  );
} 