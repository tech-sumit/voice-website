"use client";

import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/Button";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Design Your Agent",
      description: "Create your ideal AI voice agent. Choose voices, set guidelines, and define how conversations should flow.",
      color: "from-primary-400 to-primary-600",
    },
    {
      number: "02",
      title: "Connect Your Systems",
      description: "Integrate with your CRM, calendar, or business software. Our API makes it simple to connect with the tools you already use.",
      color: "from-secondary-400 to-secondary-600",
    },
    {
      number: "03",
      title: "Launch & Scale",
      description: "Deploy your AI agents to handle unlimited calls simultaneously. Monitor performance and scale effortlessly as your needs grow.",
      color: "from-accent-400 to-accent-600",
    },
  ];

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
    <section className="py-20 bg-surface-50 dark:bg-surface-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-400/20 dark:bg-primary-500/10 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-400/15 dark:bg-accent-500/10 rounded-full blur-3xl opacity-50"></div>
      
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
            How It Works
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white"
          >
            <span className="text-gradient-primary">Simple</span> & <span className="text-gradient-accent">Effective</span> Process
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
          >
            Get started in minutes, not months. Our platform makes it easy to deploy voice AI.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={item}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[calc(100%_-_16px)] w-full h-0.5 bg-gradient-to-r from-neutral-200 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 -z-10"></div>
              )}
              
              {/* Step Card */}
              <div className="card h-full flex flex-col hover:shadow-xl hover:shadow-primary-500/10 transition-shadow duration-300">
                {/* Step Number */}
                <div className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${step.color} mb-4`}>
                  {step.number}
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-neutral-900 dark:text-white">{step.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">{step.description}</p>
                
                <div className="mt-auto">
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="h-5 w-5 text-accent-500" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Quick Setup</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Button 
            href="#demo" 
            variant="gradient"
            size="lg"
            className="shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 hover:scale-[1.02]"
          >
            See it in action
          </Button>
        </motion.div>
      </div>
    </section>
  );
} 