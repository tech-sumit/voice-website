"use client";

import { motion } from "framer-motion";
import siteConfig from "@/config/site.json";
import Link from "next/link";
import { ArrowRightIcon, SparklesIcon, PhoneIcon } from "@heroicons/react/24/solid";

export default function Hero() {
  return (
    <section id="hero" className="relative bg-[var(--hw-panel)] min-h-[90vh] flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden py-12 lg:py-0">

      {/* Main Device Chassis */}
      <div className="relative w-full max-w-6xl bg-[var(--hw-chassis)] rounded-[30px] sm:rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.15),inset_0_-10px_20px_rgba(0,0,0,0.05)] border-b-[8px] sm:border-b-[12px] border-r-[8px] sm:border-r-[12px] border-[var(--hw-border)] p-6 sm:p-10 lg:p-12 flex flex-col-reverse lg:flex-row gap-8 lg:gap-16 z-10">

        {/* Decorative Screws (Hidden on small mobile) */}
        <div className="hidden sm:flex absolute top-6 left-6 w-4 h-4 rounded-full bg-[#B0ACA0] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)] items-center justify-center">
          <div className="w-2 h-0.5 bg-[#908C80] rotate-45"></div>
          <div className="w-2 h-0.5 bg-[#908C80] -rotate-45 absolute"></div>
        </div>
        <div className="hidden sm:flex absolute top-6 right-6 w-4 h-4 rounded-full bg-[#B0ACA0] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)] items-center justify-center">
          <div className="w-2 h-0.5 bg-[#908C80] rotate-12"></div>
          <div className="w-2 h-0.5 bg-[#908C80] -rotate-[78] absolute"></div>
        </div>
        <div className="hidden sm:flex absolute bottom-6 left-6 w-4 h-4 rounded-full bg-[#B0ACA0] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)] items-center justify-center">
          <div className="w-2 h-0.5 bg-[#908C80] rotate-[80]"></div>
          <div className="w-2 h-0.5 bg-[#908C80] -rotate-[10] absolute"></div>
        </div>
        <div className="hidden sm:flex absolute bottom-6 right-6 w-4 h-4 rounded-full bg-[#B0ACA0] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)] items-center justify-center">
          <div className="w-2 h-0.5 bg-[#908C80] rotate-0"></div>
          <div className="w-2 h-0.5 bg-[#908C80] rotate-90 absolute"></div>
        </div>

        {/* Left Panel: The Display */}
        <div className="flex-1 flex flex-col">
          <div className="relative bg-[var(--hw-screen)] rounded-[20px] p-6 sm:p-10 shadow-[inset_0_0_30px_rgba(0,0,0,0.3)] border-4 border-[#2A7A6F] h-full min-h-[300px] lg:min-h-[400px] flex flex-col justify-between overflow-hidden group">
            {/* Screen Glare Reflection */}
            <div className="absolute top-0 right-0 w-[200%] h-[200%] bg-gradient-to-b from-white/5 to-transparent rotate-45 pointer-events-none"></div>

            {/* Status Bar */}
            <div className="flex justify-between items-center mb-8 text-[#479F8F] font-mono text-[10px] sm:text-xs tracking-widest uppercase opacity-70">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF5722] rounded-full animate-pulse"></span>
                <span>System Online</span>
              </div>
              <span>VOICE_MOD_V2.0</span>
            </div>

            {/* Main Content */}
            <div className="relative z-10 space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-3xl sm:text-5xl lg:text-6xl font-bold text-[#E8F3F1] leading-tight tracking-tight"
              >
                The <span className="text-[#FF9800]">Future</span> of <br />
                Customer Service.
              </motion.h1>

              <p className="font-mono text-[#75B7AB] text-base sm:text-lg leading-relaxed max-w-md border-l-2 border-[#75B7AB]/30 pl-4">
                {siteConfig.description}
              </p>
            </div>

            {/* Bottom HUD */}
            <div className="mt-auto pt-12 flex items-end justify-between">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-1.5 h-6 rounded-sm ${i < 3 ? 'bg-[#FF5722]' : 'bg-[#103732]'}`}></div>
                ))}
              </div>
              <div className="text-right">
                <div className="text-[#E8F3F1] font-mono text-xs sm:text-sm">AI AGENT STATUS</div>
                <div className="text-[#FF5722] font-mono text-lg sm:text-xl font-bold animate-pulse">READY</div>
              </div>
            </div>
          </div>

          {/* Under Screen Label */}
          <div className="mt-4 flex justify-center">
            <span className="text-[#A09890] text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">Display Unit A-01</span>
          </div>
        </div>

        {/* Right Panel: Control Deck */}
        <div className="flex-1 max-w-md mx-auto lg:max-w-none w-full flex flex-col justify-center relative">
          <div className="bg-[var(--hw-border)] rounded-[30px] p-1 shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),0_10px_20px_rgba(0,0,0,0.05)] border border-[var(--hw-border)]">
            <div className="bg-[var(--hw-chassis)] rounded-[28px] border border-white/50 p-6 sm:p-10 flex flex-col items-center text-center">

              {/* Control Panel Header */}
              <div className="flex flex-col items-center mb-10 w-full">
                <div className="w-12 h-1.5 bg-[#FF5722] rounded-full mb-6 shadow-[0_0_10px_#FF5722]"></div>
                <h2 className="text-[var(--hw-text-main)] font-bold text-2xl sm:text-3xl uppercase tracking-tighter leading-none mb-4">
                  Deploy Your <span className="text-[#FF5722]">Agent</span>
                </h2>
                <p className="text-[var(--hw-text-muted)] text-sm font-mono tracking-wide uppercase opacity-70">
                  Select Operation Mode
                </p>
              </div>

              {/* Dual Action Buttons */}
              <div className="w-full space-y-6">
                <Link href="/book" className="block group">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-20 bg-[#FF5722] rounded-2xl flex items-center justify-between px-8 shadow-[0_8px_0_#CC3D1A,0_15px_30px_rgba(255,87,34,0.3)] group-hover:bg-[#FF6D3F] transition-all cursor-pointer relative overflow-hidden"
                  >
                    <div className="flex flex-col items-start text-left">
                      <span className="text-white/60 font-mono text-[9px] uppercase tracking-widest mb-1">Standard Unit</span>
                      <span className="text-white font-bold text-xl uppercase tracking-wider">Book Demo</span>
                    </div>
                    <ArrowRightIcon className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />

                    {/* Glossy overlay */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                  </motion.div>
                </Link>

                <Link href={`tel:${siteConfig.company.phone}`} className="block group">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-20 bg-[#2A7A6F] rounded-2xl flex items-center justify-between px-8 shadow-[0_8px_0_#154A43,0_15px_30px_rgba(42,122,111,0.3)] group-hover:bg-[#3B8B80] transition-all cursor-pointer relative overflow-hidden"
                  >
                    <div className="flex flex-col items-start text-left">
                      <span className="text-white/60 font-mono text-[9px] uppercase tracking-widest mb-1">Direct Connection</span>
                      <span className="text-white font-bold text-xl uppercase tracking-wider">Get Call</span>
                    </div>
                    <PhoneIcon className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />

                    {/* Glossy overlay */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                  </motion.div>
                </Link>

                <Link href="https://app.pixpoc.ai" className="block group">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-20 bg-[var(--hw-panel)] border-2 border-[var(--hw-border)] rounded-2xl flex items-center justify-between px-8 shadow-[0_4px_0_var(--hw-border),0_10px_20px_rgba(0,0,0,0.05)] transition-all cursor-pointer group-hover:border-[#FF5722]/50"
                  >
                    <div className="flex flex-col items-start text-left">
                      <span className="text-[var(--hw-text-muted)] font-mono text-[9px] uppercase tracking-widest mb-1">Explore Tech</span>
                      <span className="text-[var(--hw-text-main)] font-bold text-xl uppercase tracking-wider">Get Started</span>
                    </div>
                    <SparklesIcon className="w-6 h-6 text-[#FF5722]" />
                  </motion.div>
                </Link>
              </div>

              {/* Status Footer */}
              <div className="mt-12 w-full flex items-center justify-between px-2 opacity-50">
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse"></div>
                  <span className="text-[var(--hw-text-muted)] font-mono text-[8px] uppercase tracking-widest">Access_Granted</span>
                </div>
                <span className="text-[var(--hw-text-muted)] font-mono text-[8px] uppercase tracking-widest">Protocol_v4.2</span>
              </div>
            </div>
          </div>

          {/* Under Deck Label */}
          <div className="mt-4 flex justify-center">
            <span className="text-[#A09890] text-xs font-bold tracking-[0.2em] uppercase">Control Deck B-02</span>
          </div>
        </div>
      </div>

      {/* Background Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-noise mix-blend-overlay"></div>
    </section>
  );
}
