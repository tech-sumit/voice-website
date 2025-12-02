"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="py-20 bg-[#B33016] relative overflow-hidden border-t-[12px] border-[var(--hw-text-main)]">
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-noise mix-blend-overlay"></div>
      
      {/* Warning Stripes Background */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, #000, #000 20px, transparent 20px, transparent 40px)'
          }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#D84315] max-w-4xl mx-auto rounded-3xl p-8 md:p-16 shadow-[inset_0_2px_10px_rgba(0,0,0,0.2),0_20px_40px_rgba(0,0,0,0.3)] border-4 border-[#992312] text-center relative overflow-hidden">
          
          {/* Industrial Screws */}
          <div className="absolute top-6 left-6 w-4 h-4 bg-[#992312] rounded-full shadow-inner"></div>
          <div className="absolute top-6 right-6 w-4 h-4 bg-[#992312] rounded-full shadow-inner"></div>
          <div className="absolute bottom-6 left-6 w-4 h-4 bg-[#992312] rounded-full shadow-inner"></div>
          <div className="absolute bottom-6 right-6 w-4 h-4 bg-[#992312] rounded-full shadow-inner"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <div className="inline-block bg-[#992312] text-[#FF9F87] px-4 py-1 rounded text-xs font-bold tracking-[0.2em] uppercase mb-6 shadow-inner">
              System Override Enabled
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-md">
              Initialize <br/>
              <span className="text-[#FFC787]">Full Deployment</span>
            </h2>
            
            <p className="text-lg text-white/80 max-w-xl mx-auto mb-10 font-medium">
              Join hundreds of businesses operating on the Pixpoc AI network. System readiness is at 100%.
            </p>

            {/* The Big Red Switch */}
          <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
          >
            <Button
              href="/contact"
              size="lg"
                className="bg-[var(--hw-chassis)] text-[var(--hw-text-main)] hover:bg-white hover:text-[#B33016] transition-all duration-200 shadow-[0_8px_0_rgba(0,0,0,0.2),0_15px_20px_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-[8px] font-bold text-xl px-12 py-6 rounded-xl border-2 border-white/50 uppercase tracking-wider"
            >
                <span className="flex items-center gap-3">
                   <span className="w-3 h-3 bg-[#B33016] rounded-full animate-pulse"></span>
                   Activate Now
                </span>
            </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
