"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import siteConfig from "@/config/site.json";

export default function StatsSection() {
  const [counts, setCounts] = useState({
    calls: 0,
    minutes: 0,
    languages: 0,
    satisfaction: 0,
  });
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setCounts(prevCounts => {
          const newCounts = { ...prevCounts };
          
          // Extract just the numbers from the values in config
          const targetCalls = parseInt(siteConfig.stats.metrics[0].value.replace(/\D/g, ''));
          const targetMinutes = parseInt(siteConfig.stats.metrics[1].value.replace(/\D/g, ''));
          const targetLanguages = parseInt(siteConfig.stats.metrics[2].value.replace(/\D/g, ''));
          const targetSatisfaction = parseInt(siteConfig.stats.metrics[3].value.replace(/\D/g, ''));
          
          if (newCounts.calls < targetCalls) newCounts.calls = Math.min(targetCalls, newCounts.calls + Math.ceil(targetCalls/40));
          if (newCounts.minutes < targetMinutes) newCounts.minutes = Math.min(targetMinutes, newCounts.minutes + Math.ceil(targetMinutes/40));
          if (newCounts.languages < targetLanguages) newCounts.languages = Math.min(targetLanguages, newCounts.languages + Math.ceil(targetLanguages/20));
          if (newCounts.satisfaction < targetSatisfaction) newCounts.satisfaction = Math.min(targetSatisfaction, newCounts.satisfaction + Math.ceil(targetSatisfaction/30));
          
          // Check if all animations are complete
          if (newCounts.calls === targetCalls && 
              newCounts.minutes === targetMinutes && 
              newCounts.languages === targetLanguages && 
              newCounts.satisfaction === targetSatisfaction) {
            clearInterval(interval);
          }
          
          return newCounts;
        });
      }, 30);
      
      return () => clearInterval(interval);
    }
  }, [isInView]);

  // Map the animated count values to metrics
  const statsData = [
    { ...siteConfig.stats.metrics[0], value: counts.calls.toLocaleString() },
    { ...siteConfig.stats.metrics[1], value: counts.minutes.toLocaleString() },
    { ...siteConfig.stats.metrics[2], value: counts.languages.toString() },
    { ...siteConfig.stats.metrics[3], value: `${counts.satisfaction}%` },
  ];
  
  return (
    <section ref={ref} className="py-20 bg-surface-50 dark:bg-surface-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-primary-400/20 dark:bg-primary-500/10 blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[35rem] h-[35rem] bg-accent-400/15 dark:bg-accent-500/10 blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-3 py-1 rounded-full bg-accent-100 dark:bg-accent-900/30 border border-accent-200 dark:border-accent-800 text-accent-800 dark:text-accent-300 text-sm font-medium mb-3"
          >
            <span className="flex h-2 w-2 rounded-full bg-accent-500 mr-2"></span>
            Trusted by Businesses Worldwide
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white"
          >
            <span className="text-gradient-primary">
              Revolutionary
            </span>{" "}
            Voice AI Technology
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
          >
            {siteConfig.stats.description}
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="card"
            >
              <div className={`inline-flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 text-white mb-6 shadow-md shadow-primary-500/20`}>
                <span className="text-xl font-bold">+</span>
              </div>
              <h3 className={`text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600`}>
                {stat.value}
              </h3>
              <p className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">{stat.name}</p>
              <p className="text-neutral-600 dark:text-neutral-400">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 