"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon, PhoneIcon } from "@heroicons/react/24/solid";

export default function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary-700 via-primary-800 to-secondary-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        {/* Dotted pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle, #EDF1D6 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Geometric shapes */}
        <div className="absolute top-10 right-10 w-32 h-32 border-2 border-white/10 rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 border-2 border-white/10 rotate-45"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-white/10 rounded-lg rotate-12"></div>
        
        {/* Gradient orbs */}
        <div className="absolute top-20 left-1/3 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-accent-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full mb-6">
              <div className="w-2 h-2 bg-accent-200 rounded-full mr-3 animate-pulse"></div>
              <span className="text-white text-sm font-medium tracking-wide uppercase">Ready to Start?</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Deploy Your AI Agent{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-100">
                Today
              </span>
            </h2>
            
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of businesses already using AI voice agents to transform their customer experience. 
              Get started in minutes, not months.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <Button
              href="/contact"
              size="lg"
              className="bg-primary-500 text-white hover:bg-primary-600 hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl font-semibold px-10 py-5 text-lg border-2 border-primary-400/50 focus:ring-2 focus:ring-primary-500/50"
            >
              <PhoneIcon className="w-6 h-6 mr-3" />
              Contact Now
              <ArrowRightIcon className="w-5 h-5 ml-3" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
