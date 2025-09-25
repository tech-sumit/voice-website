"use client";

import { 
  ChatBubbleLeftRightIcon, 
  Cog6ToothIcon, 
  GlobeAltIcon, 
  MicrophoneIcon, 
  ClockIcon, 
  BookOpenIcon, 
  PhoneIcon, 
  CpuChipIcon,
  ArrowsPointingOutIcon,  // for scale
  BoltIcon,  // for triggers
  UserIcon,  // for human in loop
  ArrowPathIcon,  // for workflow
  CurrencyDollarIcon,  // for plans
  LockClosedIcon,  // for privacy
  CogIcon  // for model switch
} from "@heroicons/react/24/solid";
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
      "book": BookOpenIcon,
      "phone": PhoneIcon,
      "brain": CpuChipIcon,
      "scale": ArrowsPointingOutIcon,
      "triggers": BoltIcon,
      "human": UserIcon,
      "workflow": ArrowPathIcon,
      "plans": CurrencyDollarIcon,
      "privacy": LockClosedIcon,
      "model": CogIcon,
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
    <section id="features" className="py-12 bg-gradient-to-b from-surface-900 via-surface-800 to-surface-900 relative overflow-hidden">
      {/* Creative background elements */}
      <div className="absolute inset-0">
        {/* Dotted pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle, #EDF1D6 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Geometric shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-accent-600/20 rounded-lg rotate-12"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-accent-500/20 rounded-full"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 border-2 border-accent-400/20 rotate-45"></div>
        
        {/* Subtle gradient orbs */}
        <div className="absolute top-20 right-1/3 w-64 h-64 bg-accent-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-accent-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <div className="inline-flex items-center px-4 py-2 bg-accent-900/30 border border-accent-600/30 rounded-full mb-6">
              <div className="w-2 h-2 bg-accent-500 rounded-full mr-3 animate-pulse"></div>
              <span className="text-accent-400 text-sm font-medium tracking-wide uppercase">FEATURES</span>
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
          >
            Features That Power{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-300">
              Real Voice Agents
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed"
          >
            With integrated speech, telephony, and APIs, Bolna equips you with everything 
            required to move from idea to live deployment quickly and securely.
          </motion.p>
        </div>
        
        {/* Features Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-8 max-w-7xl mx-auto"
        >
          {/* Split features into 2 rows of 4 */}
          {Array.from({ length: 2 }, (_, rowIndex) => (
            <div key={rowIndex} className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {siteConfig.features.slice(rowIndex * 4, (rowIndex + 1) * 4).map((feature, index) => {
                const actualIndex = rowIndex * 4 + index;
            const IconComponent = getIconComponent(feature.icon);
            
            const gradients = [
              "from-primary-500 to-primary-600",
              "from-secondary-500 to-secondary-600",
              "from-accent-500 to-accent-600",
              "from-primary-500 to-secondary-200", // Lighter for Call Analysis
              "from-primary-500 to-secondary-600",
              "from-accent-500 to-primary-600",
              "from-bright-500 to-secondary-600",
              "from-secondary-500 to-accent-600"
            ];
            
            const bgColors = [
              "bg-primary-900/20 border-primary-600/20",
              "bg-secondary-900/20 border-secondary-600/20",
              "bg-accent-900/20 border-accent-600/20",
              "bg-bright-900/20 border-bright-600/20",
              "bg-primary-900/20 border-primary-600/20",
              "bg-accent-900/20 border-accent-600/20",
              "bg-bright-900/20 border-bright-600/20",
              "bg-secondary-900/20 border-secondary-600/20"
            ];
            
                const gradient = gradients[actualIndex % gradients.length];
                const bgColor = bgColors[actualIndex % bgColors.length];
            
                return (
                  <motion.div 
                    key={feature.title}
                    variants={item}
                    className="group relative p-6 bg-surface-800/50 backdrop-blur-sm border border-surface-700/50 rounded-2xl hover:bg-surface-700/50 hover:border-surface-600/50 transition-all duration-300"
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

                    {/* Content */}
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-400 transition-colors duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors duration-300">
                      {feature.description}
                    </p>

                    {/* Hover line effect */}
                    <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </motion.div>
        
        {/* Bottom decorative element */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center mt-12"
        >
          <div className="flex items-center space-x-2 px-6 py-3 bg-surface-800/50 border border-neutral-700/50 rounded-full">
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full bg-primary-500 animate-pulse`} style={{animationDelay: `${i * 0.2}s`}}></div>
              ))}
            </div>
            <span className="text-neutral-400 text-sm ml-3">Powered by cutting-edge AI</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 