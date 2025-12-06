"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import siteConfig from "@/config/site.json";
import Script from "next/script";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);
  
  // Initialize reCAPTCHA
  const handleRecaptchaLoad = () => {
    setIsRecaptchaLoaded(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError("Invalid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      if (!isRecaptchaLoaded || typeof window.grecaptcha === 'undefined') {
        setError("Security loading...");
        setIsSubmitting(false);
        return;
      }

      window.grecaptcha.enterprise.ready(async () => {
        try {
          const token = await window.grecaptcha.enterprise.execute(
            process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LdSPC8rAAAAALSdtGhM_cj4t-HHu2040PI3zGbi',
            { action: 'CONTACT' }
          );
          await submitForm(token);
        } catch (error) {
          console.error('reCAPTCHA error:', error);
          setError("Security check failed");
          setIsSubmitting(false);
        }
      });
    } catch (error) {
      console.error('reCAPTCHA execution error:', error);
      setError("Security error");
      setIsSubmitting(false);
    }
  };
  
  const submitForm = async (token: string) => {
    try {
      const response = await fetch('/api/book-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          captchaToken: token
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || 'Request failed');
        setIsSubmitting(false);
        return;
      }
      
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch {
      setError('Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative bg-[var(--hw-panel)] min-h-[90vh] flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden py-12 lg:py-0">
      {/* Load reCAPTCHA */}
      <Script
        src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LdSPC8rAAAAALSdtGhM_cj4t-HHu2040PI3zGbi'}`}
        onLoad={handleRecaptchaLoad}
      />
      
      {/* Main Device Chassis */}
      <div className="relative w-full max-w-6xl bg-[var(--hw-chassis)] rounded-[30px] sm:rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.15),inset_0_-10px_20px_rgba(0,0,0,0.05)] border-b-[8px] sm:border-b-[12px] border-r-[8px] sm:border-r-[12px] border-[var(--hw-border)] p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row gap-8 lg:gap-16 z-10">
        
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
                The <span className="text-[#FF9800]">Future</span> of <br/>
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
            <div className="bg-[var(--hw-chassis)] rounded-[28px] border border-white/50 p-6 sm:p-8">
              
              {/* Control Panel Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-[var(--hw-text-main)] font-bold text-lg sm:text-xl uppercase tracking-wide flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[var(--hw-text-main)]"></span>
                  Book a Demo
                </h2>
              </div>

              {/* Main Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Input Cluster */}
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-[var(--hw-text-muted)] uppercase mb-2 block ml-1">
                      Work Email
                    </label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full bg-[var(--hw-panel)] text-[var(--hw-text-main)] font-mono text-lg rounded-xl px-4 py-3 border-none shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05),1px_1px_0px_rgba(255,255,255,0.1)] outline-none focus:ring-2 focus:ring-[#FF5722]/30 placeholder-[var(--hw-text-muted)]"
                    />
                    <p className="text-[10px] text-[var(--hw-text-muted)] mt-2 ml-1">
                      Enter your email to schedule a personalized walkthrough.
                    </p>
                  </div>
                </div>

                {/* Feedback Display Area */}
                <div className="min-h-[24px]">
                  {error && (
                    <p className="text-[#D84315] dark:text-[#FF8A65] text-xs font-mono flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#D84315] dark:bg-[#FF8A65] rounded-full animate-pulse"></span>
                      ERROR: {error}
                    </p>
                  )}
                  {isSubmitted && (
                    <p className="text-[#1A5C54] dark:text-[#69F0AE] text-xs font-mono flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#1A5C54] dark:bg-[#69F0AE] rounded-full animate-pulse"></span>
                      REQUEST SENT SUCCESSFULLY
                    </p>
                  )}
                </div>

                {/* The Big Orange Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  className={`w-full h-16 rounded-xl font-bold text-white text-lg tracking-wider uppercase transition-all shadow-[0_6px_0_#B33016,0_15px_20px_rgba(0,0,0,0.15)] active:shadow-[0_2px_0_#B33016,inset_0_2px_5px_rgba(0,0,0,0.2)] active:translate-y-[4px] flex items-center justify-center gap-3
                    ${isSubmitting ? 'bg-[#CC3D1A] cursor-wait' : 'bg-[#FF5722] hover:bg-[#FF6D3F]'}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      PROCESSING...
                    </>
                  ) : (
                    <>
                      <span className="w-3 h-3 rounded-full bg-white shadow-[0_0_10px_white] animate-pulse"></span>
                      BOOK DEMO
                    </>
                  )}
                </motion.button>

                <p className="text-center text-[10px] text-[#A09890] uppercase tracking-wider font-medium">
                  SECURE CONNECTION • RECAPTCHA VERIFIED
                </p>
              </form>
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
