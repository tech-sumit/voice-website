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
    <section id="how-it-works" className="py-12 bg-gradient-to-b from-surface-50 to-surface-100 dark:from-surface-800 dark:to-surface-900 relative overflow-hidden">
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
        <div className="absolute top-20 left-20 w-24 h-24 border-2 border-secondary-600/20 rounded-lg rotate-45"></div>
        <div className="absolute bottom-32 right-32 w-32 h-32 border-2 border-secondary-500/20 rounded-full"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 border-2 border-secondary-400/20 rotate-12"></div>

        {/* Subtle gradient orbs */}
        <div className="absolute top-40 left-1/4 w-64 h-64 bg-secondary-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-1/4 w-48 h-48 bg-secondary-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              <span className="text-secondary-700 dark:text-secondary-400 text-sm font-medium tracking-wide uppercase">HOW IT WORKS</span>
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4 leading-tight"
          >
            Simple & Effective{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-secondary-300">
              Process
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed"
          >
            {howItWorksData.description}
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
        >
          {steps.map((step, index) => {
            const gradients = [
              "from-primary-500 to-primary-600",
              "from-secondary-500 to-secondary-600",
              "from-accent-500 to-accent-600"
            ];
            
            const gradient = gradients[index % gradients.length];

            return (
              <motion.div
                key={step.number}
                variants={item}
                className="group relative p-6 bg-white/80 dark:bg-surface-800/50 backdrop-blur-sm border border-neutral-200 dark:border-surface-700/50 rounded-2xl hover:bg-white dark:hover:bg-surface-700/50 hover:border-neutral-300 dark:hover:border-surface-600/50 transition-all duration-300 shadow-sm hover:shadow-md"
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Decorative corner elements */}
                <div className="absolute top-4 right-4 w-12 h-12 border-l-2 border-b-2 border-neutral-600/20 group-hover:border-primary-500/30 transition-colors duration-300"></div>

                {/* Step Number */}
                <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg`}>
                  <span className="text-2xl font-bold text-white">{step.number}</span>
                  {/* Icon glow effect */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}></div>
                </div>
                
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors duration-300">{step.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors duration-300 text-sm">{step.description}</p>
                
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-5 w-5 text-accent-500" />
                  <span className="text-sm text-neutral-500 dark:text-neutral-500">Quick Setup</span>
                </div>

                {/* Hover line effect */}
                <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </motion.div>
            );
          })}
        </motion.div>
        
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
                <div key={i} className={`w-2 h-2 rounded-full bg-accent-600 dark:bg-accent-500 animate-pulse`} style={{animationDelay: `${i * 0.2}s`}}></div>
              ))}
            </div>
            <span className="text-neutral-600 dark:text-neutral-400 text-sm">Ready to get started in minutes</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 