"use client";

import { ChatBubbleLeftRightIcon, Cog6ToothIcon, GlobeAltIcon, MicrophoneIcon, ClockIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import siteConfig from "@/config/site.json";
import { ForwardRefExoticComponent, SVGProps, RefAttributes } from "react";

// Define icon type
type IconComponent = ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & { 
  title?: string | undefined; 
  titleId?: string | undefined; 
} & RefAttributes<SVGSVGElement>>;

// Define icon map type
type IconMap = {
  [key: string]: IconComponent;
};

export default function FeatureSection() {
  // Map icon strings from config to actual icon components
  const getIconComponent = (iconName: string): IconComponent => {
    const iconMap: IconMap = {
      "microphone": MicrophoneIcon,
      "clock": ClockIcon,
      "globe": GlobeAltIcon,
      "connection": Cog6ToothIcon,
    };
    
    return iconMap[iconName] || ChatBubbleLeftRightIcon;
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="features" className="py-16 bg-surface-50 dark:bg-surface-900 relative overflow-hidden">
      {/* Background decorations */}
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
            Features
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white"
          >
            Powerful <span className="text-gradient-primary">Features</span> for Your Business
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
          >
            Everything you need to automate and enhance your customer communications
          </motion.p>
        </div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          {siteConfig.features.map((feature, index) => {
            const IconComponent = getIconComponent(feature.icon);
            
            // Use consistent gradients based on index
            const gradients = [
              "from-primary-400 to-primary-600",
              "from-secondary-400 to-secondary-600",
              "from-accent-400 to-accent-600",
              "from-primary-400 to-secondary-600"
            ];
            
            const gradient = gradients[index % gradients.length];
            
            return (
              <motion.div 
                key={feature.title}
                variants={item}
                className="card flex flex-col items-center text-center"
                whileHover={{ 
                  y: -8, 
                  transition: { duration: 0.2 },
                  boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.15), 0 10px 10px -5px rgba(59, 130, 246, 0.1)"
                }}
              >
                <div className={`h-16 w-16 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 shadow-md shadow-primary-500/20`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className={`text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}>
                  {feature.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
} 