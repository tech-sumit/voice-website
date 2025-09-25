"use client";

import { useRef } from "react";
import { PhoneIcon, CalendarDaysIcon, ChatBubbleLeftRightIcon, FunnelIcon } from "@heroicons/react/24/solid";
import { motion, useInView } from "framer-motion";
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

export default function UseCaseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  // Map icon strings from config to actual icon components
  const getIconComponent = (iconName: string): IconComponent => {
    const iconMap: IconMap = {
      "support": PhoneIcon,
      "calendar": CalendarDaysIcon,
      "filter": FunnelIcon,
    };
    
    return iconMap[iconName] || ChatBubbleLeftRightIcon;
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section ref={ref} id="use-cases" className="py-12 bg-gradient-to-b from-surface-50 to-surface-100 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 relative overflow-hidden">
      {/* Creative background elements */}
      <div className="absolute inset-0">
        {/* Dotted pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle, #609966 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Geometric shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-primary-600/20 rounded-lg rotate-12"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-primary-500/20 rounded-full"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 border-2 border-primary-400/20 rotate-45"></div>

        {/* Subtle gradient orbs */}
        <div className="absolute top-20 right-1/3 w-64 h-64 bg-primary-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-primary-500/5 rounded-full blur-3xl"></div>
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
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/30 border border-primary-300 dark:border-primary-600/30 rounded-full mb-4">
              <div className="w-2 h-2 bg-primary-600 dark:bg-primary-500 rounded-full mr-3 animate-pulse"></div>
              <span className="text-primary-700 dark:text-primary-400 text-sm font-medium tracking-wide uppercase">USE CASES</span>
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4 leading-tight"
          >
            Perfect for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
              All Industries
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed"
          >
            Versatile solutions for any business communication need
          </motion.p>
        </div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
        >
          {siteConfig.useCases.map((useCase, index) => {
            const IconComponent = getIconComponent(useCase.icon);
            
            // Use consistent gradients based on index
            const gradients = [
              "from-primary-500 to-primary-600",
              "from-secondary-500 to-secondary-600",
              "from-accent-500 to-accent-600"
            ];
            
            const bgColors = [
              "bg-primary-900/20 border-primary-600/20",
              "bg-secondary-900/20 border-secondary-600/20",
              "bg-accent-900/20 border-accent-600/20"
            ];
            
            const gradient = gradients[index % gradients.length];
            const bgColor = bgColors[index % bgColors.length];
            
            return (
              <motion.div 
                key={useCase.title} 
                variants={item}
                className={`group relative p-6 bg-white/80 dark:bg-surface-800/50 backdrop-blur-sm border border-neutral-200 dark:${bgColor} rounded-2xl hover:bg-white dark:hover:bg-surface-700/50 hover:border-neutral-300 transition-all duration-300 shadow-sm hover:shadow-md`}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Decorative corner elements */}
                <div className="absolute top-4 right-4 w-12 h-12 border-l-2 border-b-2 border-neutral-600/20 group-hover:border-primary-500/30 transition-colors duration-300"></div>

                {/* Icon */}
                <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg`}>
                  <IconComponent className="h-8 w-8 text-white" />
                  {/* Icon glow effect */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}></div>
                </div>
                
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors duration-300">
                  {useCase.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors duration-300 text-sm">
                  {useCase.description}
                </p>

                {/* Hover line effect */}
                <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
} 