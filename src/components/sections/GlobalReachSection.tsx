"use client";

import { motion } from "framer-motion";
import siteConfig from "@/config/site.json";
import { 
  GlobeAmericasIcon,
  CheckCircleIcon
} from "@heroicons/react/24/solid";

export default function GlobalReachSection() {
  const languageFlags: Record<string, string> = {
    "English": "🇺🇸",
    "Spanish": "🇪🇸",
    "French": "🇫🇷",
    "German": "🇩🇪",
    "Mandarin": "🇨🇳",
    "Chinese": "🇨🇳",
    "Arabic": "🇸🇦",
    "Portuguese": "🇵🇹",
    "Russian": "🇷🇺",
    "Japanese": "🇯🇵",
    "Korean": "🇰🇷",
    "Thai": "🇹🇭",
    "Vietnamese": "🇻🇳",
    "Indonesian": "🇮🇩",
    "Urdu": "🇵🇰",
    "Italian": "🇮🇹",
    "Dutch": "🇳🇱",
    "Polish": "🇵🇱",
    "Swedish": "🇸🇪",
    "Turkish": "🇹🇷",
    "Ukrainian": "🇺🇦",
    "Hindi": "🇮🇳",
    "Bengali": "🇧🇩",
    "Gujarati": "🇮🇳",
    "Kannada": "🇮🇳",
    "Malayalam": "🇮🇳",
    "Marathi": "🇮🇳",
    "Punjabi": "🇮🇳",
    "Tamil": "🇮🇳"
  };

  // Sort languages alphabetically for the grid
  const sortedLanguages = [...siteConfig.languages].sort();

  // Container animation for stagger effect
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <section id="global-reach" className="py-24 bg-[var(--hw-panel)] relative overflow-hidden border-t border-[var(--hw-border)]">
      {/* Background Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-noise mix-blend-overlay"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section - Hardware Manual Style */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-4 border-[var(--hw-border)] pb-6 gap-6">
           <div>
              <div className="text-[var(--hw-text-muted)] text-xs font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF5722] rounded-full animate-pulse"></span>
                Global Deployment
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-[var(--hw-text-main)] tracking-tight">
                Language <span className="text-[#FF5722]">Modules</span>
              </h2>
           </div>
           
           {/* Status Badge */}
           <div className="flex items-center gap-3 bg-[var(--hw-chassis)] px-4 py-2 rounded border border-[var(--hw-border)] shadow-sm">
              <GlobeAmericasIcon className="w-5 h-5 text-[#1A5C54]" />
              <span className="font-mono text-sm font-bold text-[var(--hw-text-main)]">
                GLOBAL LANGUAGES
              </span>
           </div>
        </div>

        {/* The Language Grid - Tactile Buttons */}
        <div className="bg-[var(--hw-chassis)] rounded-xl p-2 border border-[var(--hw-border)] shadow-[inset_0_0_20px_rgba(0,0,0,0.05)]">
           <div className="bg-[var(--hw-panel)] rounded-lg p-6 md:p-8 border border-[var(--hw-border)] relative">
              
              {/* Decorative Screws */}
              <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-[var(--hw-border)] flex items-center justify-center shadow-inner"><div className="w-1 h-px bg-[#A09890] rotate-45"></div></div>
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[var(--hw-border)] flex items-center justify-center shadow-inner"><div className="w-1 h-px bg-[#A09890] rotate-45"></div></div>
              <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-[var(--hw-border)] flex items-center justify-center shadow-inner"><div className="w-1 h-px bg-[#A09890] rotate-45"></div></div>
              <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-[var(--hw-border)] flex items-center justify-center shadow-inner"><div className="w-1 h-px bg-[#A09890] rotate-45"></div></div>

              <motion.div 
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
              >
                {sortedLanguages.map((lang) => (
                  <motion.div 
                    key={lang}
                    variants={item}
                    className="group relative flex items-center gap-3 p-3 bg-[var(--hw-chassis)] border border-[var(--hw-border)] rounded hover:bg-white hover:border-[#FF5722] hover:shadow-md transition-all duration-200 cursor-default select-none"
                  >
                    {/* Active Indicator Dot */}
                    <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#A09890]/50 group-hover:bg-[#00C853] transition-colors"></div>
                    
                    <span className="text-2xl filter drop-shadow-sm transform group-hover:scale-110 transition-transform duration-200" role="img" aria-label={lang}>
                      {languageFlags[lang] || "🌐"}
                    </span>
                    <span className="text-sm font-bold text-[var(--hw-text-muted)] group-hover:text-[var(--hw-text-main)] transition-colors">
                      {lang}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
           </div>
        </div>

        {/* Simplified Bottom Info - Integrated Strip */}
        <div className="mt-8 flex justify-center">
           <div className="inline-flex items-center gap-4 sm:gap-8 px-6 py-3 bg-[var(--hw-chassis)] rounded-full border border-[var(--hw-border)] shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 group">
                 <div className="p-1 bg-[#1A5C54]/10 rounded-full group-hover:bg-[#1A5C54]/20 transition-colors">
                   <CheckCircleIcon className="w-4 h-4 text-[#1A5C54]" />
                 </div>
                 <span className="text-[10px] sm:text-xs font-mono font-bold text-[var(--hw-text-secondary)] uppercase tracking-wide">Latency &lt; 300ms</span>
              </div>
              <div className="w-px h-4 bg-[var(--hw-border)]"></div>
              <div className="flex items-center gap-2 group">
                 <div className="p-1 bg-[#1A5C54]/10 rounded-full group-hover:bg-[#1A5C54]/20 transition-colors">
                   <CheckCircleIcon className="w-4 h-4 text-[#1A5C54]" />
                 </div>
                 <span className="text-[10px] sm:text-xs font-mono font-bold text-[var(--hw-text-secondary)] uppercase tracking-wide">Native Accents</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-[var(--hw-border)]"></div>
              <div className="hidden sm:flex items-center gap-2 group">
                 <div className="p-1 bg-[#1A5C54]/10 rounded-full group-hover:bg-[#1A5C54]/20 transition-colors">
                   <CheckCircleIcon className="w-4 h-4 text-[#1A5C54]" />
                 </div>
                 <span className="text-[10px] sm:text-xs font-mono font-bold text-[var(--hw-text-secondary)] uppercase tracking-wide">99.9% Uptime</span>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
}
