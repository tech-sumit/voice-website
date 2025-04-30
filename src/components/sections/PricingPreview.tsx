"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import siteConfig from "@/config/site.json";
import { Button } from "@/components/ui/Button";

export default function PricingPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section ref={ref} id="pricing" className="py-16 bg-surface-50 dark:bg-surface-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-primary-400/20 dark:bg-primary-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[35rem] h-[35rem] bg-accent-400/15 dark:bg-accent-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
      
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
            Pricing Plans
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white"
          >
            Simple, <span className="text-gradient-primary">Transparent</span> Pricing
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
          >
            Choose the plan that fits your business needs
          </motion.p>
        </div>
        
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {siteConfig.pricing.map((plan, index) => {
            // Use consistent gradients for each plan
            const gradients = [
              "from-primary-400 to-primary-600",
              "from-primary-400 to-primary-600",
              "from-accent-400 to-accent-600"
            ];
            
            const gradient = gradients[index % gradients.length];
            
            return (
              <motion.div
                key={plan.name}
                variants={item}
                whileHover={{ 
                  y: -10, 
                  transition: { duration: 0.2 }
                }}
                className={`relative card flex flex-col ${
                  plan.featured 
                    ? "ring-2 ring-primary-500 dark:ring-primary-400 shadow-primary-500/20 -mt-4 md:mt-0 md:-mb-4"
                    : ""
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 inset-x-0 flex justify-center">
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-primary-400 to-primary-600 text-white shadow-sm shadow-primary-500/20">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                  <p className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}>
                    ${plan.price}
                  </p>
                  {plan.period && <span className="text-neutral-500 dark:text-neutral-400 ml-1">/{plan.period}</span>}
                </div>
                <p className="mb-6 text-neutral-600 dark:text-neutral-400">{plan.description}</p>
                <ul className="mb-6 space-y-3 flex-1 text-neutral-600 dark:text-neutral-400">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <svg className={`w-5 h-5 mr-2 text-gradient bg-gradient-to-r ${gradient}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  href={plan.ctaUrl}
                  variant={plan.featured ? "gradient" : "outline"}
                  className={`w-full ${plan.featured ? "shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30" : ""}`}
                >
                  {plan.cta}
                </Button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
} 