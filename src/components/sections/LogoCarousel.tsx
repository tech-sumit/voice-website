"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import siteConfig from "@/config/site.json";

export default function LogoCarousel() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Duplicate the logos for infinite scroll effect
  const duplicatedLogos = [...siteConfig.logos.companies, ...siteConfig.logos.companies];

  return (
    <section className="py-16 bg-surface-50 dark:bg-surface-900 relative overflow-hidden">
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isMounted ? 1 : 0, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 text-primary-800 dark:text-primary-300 text-sm font-medium mb-3"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2"></span>
            Trusted Partners
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isMounted ? 1 : 0, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white"
          >
            {siteConfig.logos.title}
          </motion.h2>
        </div>
        
        <div className="relative">
          {/* First row of logos that moves left */}
          <div className="flex overflow-hidden py-6">
            <motion.div
              className="flex space-x-16 items-center"
              animate={{
                x: isMounted ? [0, -2000] : 0,
              }}
              transition={{
                x: {
                  duration: 60,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {duplicatedLogos.map((logo, index) => (
                <div 
                  key={`${logo.name}-${index}`} 
                  className="flex flex-shrink-0 items-center"
                >
                  <div className="w-36 h-16 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 transform hover:scale-110">
                    <div className="h-10 w-32 bg-neutral-300/50 dark:bg-neutral-700/50 rounded-md animate-pulse"></div>
                    {/* Replace with actual logos when you have them */}
                    {/* <img src={logo.logo} alt={logo.name} className="h-10 object-contain" /> */}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Second row of logos that moves right - reversed order */}
          <div className="flex overflow-hidden mt-8 py-6">
            <motion.div
              className="flex space-x-16 items-center"
              animate={{
                x: isMounted ? [0, 2000] : 0,
              }}
              transition={{
                x: {
                  duration: 65,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {duplicatedLogos.slice().reverse().map((logo, index) => (
                <div 
                  key={`${logo.name}-rev-${index}`} 
                  className="flex flex-shrink-0 items-center"
                >
                  <div className="w-36 h-16 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 transform hover:scale-110">
                    <div className="h-10 w-32 bg-neutral-300/50 dark:bg-neutral-700/50 rounded-md animate-pulse"></div>
                    {/* Replace with actual logos when you have them */}
                    {/* <img src={logo.logo} alt={logo.name} className="h-10 object-contain" /> */}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-surface-50 dark:from-surface-900 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-surface-50 dark:from-surface-900 to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
} 