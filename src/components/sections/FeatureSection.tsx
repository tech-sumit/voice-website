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
  ArrowsPointingOutIcon,
  BoltIcon,
  UserIcon,
  ArrowPathIcon,
  CurrencyDollarIcon,
  LockClosedIcon,
  CogIcon
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
    <section id="features" className="py-20 bg-[var(--hw-chassis)] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-noise mix-blend-overlay"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hardware Header */}
        <div className="flex justify-between items-end mb-16 border-b-4 border-[var(--hw-border)] pb-6">
           <div>
              <div className="text-[var(--hw-text-muted)] text-xs font-bold tracking-[0.2em] uppercase mb-2">System Capabilities</div>
              <h2 className="text-4xl md:text-5xl font-bold text-[var(--hw-text-main)] tracking-tight">
                Core <span className="text-[#FF5722]">Modules</span>
              </h2>
           </div>
           <div className="hidden md:block text-right">
              <div className="flex gap-1 justify-end mb-2">
                 {[...Array(4)].map((_, i) => (
                   <div key={i} className="w-8 h-2 bg-[var(--hw-border)] rounded-sm"></div>
                 ))}
              </div>
              <div className="font-mono text-[var(--hw-text-muted)] text-sm">SPECIFICATION_SHEET_V1</div>
           </div>
        </div>
        
        {/* Features Grid - Keypad Style */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {siteConfig.features.map((feature, index) => {
            const IconComponent = getIconComponent(feature.icon);
            
            return (
              <motion.div 
                key={feature.title}
                variants={item}
                className="group relative"
              >
                {/* The Physical Key Structure */}
                <div className="h-full bg-[var(--hw-panel)] rounded-2xl border border-[var(--hw-chassis)] border-b-[8px] border-r-[4px] border-b-[var(--hw-border)] border-r-[var(--hw-border)] p-8 transition-all duration-150 hover:border-b-[2px] hover:border-r-[1px] hover:translate-y-[6px] hover:shadow-none shadow-[5px_5px_15px_rgba(0,0,0,0.05)] flex flex-col items-start justify-between min-h-[280px]">
                  
                  {/* Screw Head Top Left */}
                  <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-[var(--hw-border)] flex items-center justify-center opacity-50">
                    <div className="w-1.5 h-0.5 bg-[#A09890] rotate-45"></div>
                  </div>

                  {/* Icon Area - "Printed" on the key */}
                  <div className="mb-6 w-14 h-14 bg-[var(--hw-chassis)] rounded-xl flex items-center justify-center shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)] group-hover:bg-[#FF5722] transition-colors duration-200">
                    <IconComponent className="h-7 w-7 text-[var(--hw-text-muted)] group-hover:text-white transition-colors duration-200" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[var(--hw-text-main)] mb-3 group-hover:text-[#FF5722] transition-colors">
                      {feature.title}
                    </h3>

                    <p className="text-[var(--hw-text-muted)] text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* LED Indicator */}
                  <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-[var(--hw-border)] group-hover:bg-[#00C853] group-hover:shadow-[0_0_8px_#00C853] transition-all duration-300"></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}