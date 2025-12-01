"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import siteConfig from "@/config/site.json";
import supportedLanguages from "@/config/languages";
import callTemplates from "@/config/callTemplates";
import Script from "next/script";

export default function Hero() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [language, setLanguage] = useState("hi-IN");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Template state
  const [selectedTemplateId, setSelectedTemplateId] = useState("default");
  const [templateValues, setTemplateValues] = useState<Record<string, string>>({
    name: "",
    expectedFlow: "",
  });

  // Get the current template
  const selectedTemplate = callTemplates.find(t => t.id === selectedTemplateId) || callTemplates[0];

  // Handle template change
  const handleTemplateChange = (templateId: string) => {
    const template = callTemplates.find(t => t.id === templateId);
    if (!template) return;
    const initialValues: Record<string, string> = {};
    template.fields.forEach(field => {
      initialValues[field.name] = "";
    });
    setSelectedTemplateId(templateId);
    setTemplateValues(initialValues);
    setIsSubmitted(false);
  };

  // Handle template field changes
  const handleTemplateFieldChange = (fieldName: string, value: string) => {
    setTemplateValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  // Initialize reCAPTCHA
  const handleRecaptchaLoad = () => {
    setIsRecaptchaLoaded(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const template = callTemplates.find(t => t.id === selectedTemplateId) || callTemplates[0];
    const expectedFlow = template.generateFlow(templateValues);

    // Validate
    const missingFields = template.fields
      .filter(field => field.required && !templateValues[field.name])
      .map(field => field.label);

    if (missingFields.length > 0) {
      setError(`Required: ${missingFields.join(', ')}`);
      return;
    }

    const phoneDigits = phoneNumber.replace(/\D/g, '');
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      setError("Invalid phone number");
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
            { action: 'CALLBACK' }
          );
          await submitForm(token, expectedFlow, template.id);
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
  
  const submitForm = async (token: string, expectedFlow: string, templateId: string) => {
    try {
      const response = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: `${countryCode}${phoneNumber}`,
          language: language,
          name: templateValues.name || '',
          expectedFlow: expectedFlow,
          captchaToken: token,
          templateId: templateId
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || 'Request failed');
        setIsSubmitting(false);
        return;
      }
      
      setIsSubmitted(true);
      setTimeout(() => {
        setPhoneNumber("");
        setIsSubmitted(false);
      }, 5000);
    } catch {
      setError('Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Common country codes
  const countryCodes = [
    { code: "+91", name: "IN" },
    { code: "+1", name: "US" },
    { code: "+44", name: "UK" },
    { code: "+61", name: "AU" },
    { code: "+971", name: "AE" },
  ];

  return (
    <section className="relative bg-surface-100 min-h-[90vh] flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden py-12 lg:py-0">
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
                  Demo Control
                </h2>
                <button 
                  type="button"
                  onClick={() => setShowSettings(true)}
                  className="group w-10 h-10 rounded-full bg-[var(--hw-border)] shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.5)] flex items-center justify-center active:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)] transition-all text-[var(--hw-text-muted)] hover:text-[#FF5722]"
                  title="Configure Settings"
                >
                  <svg className="w-5 h-5 transition-transform group-hover:rotate-90 duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>

              {/* Main Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Input Cluster */}
                <div className="space-y-4">
                  {/* Phone Input Group */}
                  <div>
                    <label className="text-xs font-bold text-[var(--hw-text-muted)] uppercase mb-2 block ml-1">Target Number</label>
                    <div className="flex gap-3">
                      <select 
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="bg-[var(--hw-panel)] text-[var(--hw-text-main)] font-mono rounded-xl px-3 py-3 border-none shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05),1px_1px_0px_rgba(255,255,255,0.1)] outline-none focus:ring-2 focus:ring-[#FF5722]/30 w-24"
                      >
                        {countryCodes.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                      </select>
                      <input 
                        type="tel" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="9876543210"
                        className="flex-1 bg-[var(--hw-panel)] text-[var(--hw-text-main)] font-mono text-lg rounded-xl px-4 py-3 border-none shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05),1px_1px_0px_rgba(255,255,255,0.1)] outline-none focus:ring-2 focus:ring-[#FF5722]/30 placeholder-[var(--hw-text-muted)] min-w-0"
                      />
                    </div>
                  </div>

                  {/* Language Selection */}
                  <div>
                    <label className="text-xs font-bold text-[var(--hw-text-muted)] uppercase mb-2 block ml-1">Language Module</label>
                    <div className="relative">
                      <select 
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full bg-[var(--hw-panel)] text-[var(--hw-text-main)] rounded-xl px-4 py-3 border-none shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05),1px_1px_0px_rgba(255,255,255,0.1)] outline-none focus:ring-2 focus:ring-[#FF5722]/30 appearance-none cursor-pointer"
                      >
                        {supportedLanguages.map(l => (
                          <option key={l.code} value={l.code}>{l.name}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--hw-text-muted)]">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feedback Display Area */}
                <div className="min-h-[24px]">
                  {error && (
                    <p className="text-[#D84315] text-xs font-mono flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#D84315] rounded-full animate-pulse"></span>
                      ERROR: {error}
                    </p>
                  )}
                  {isSubmitted && (
                    <p className="text-[#1A5C54] text-xs font-mono flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#1A5C54] rounded-full animate-pulse"></span>
                      TRANSMISSION SUCCESSFUL
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
                      INITIATING...
                    </>
                  ) : (
                    <>
                      <span className="w-3 h-3 rounded-full bg-white shadow-[0_0_10px_white] animate-pulse"></span>
                      INITIATE CALL
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
      
      {/* Settings Modal (New Implementation) */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Modal Panel */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[var(--hw-chassis)] rounded-2xl border-[4px] border-[var(--hw-border)] shadow-2xl overflow-hidden z-10"
            >
              {/* Modal Header */}
              <div className="bg-[var(--hw-border)] px-6 py-4 flex items-center justify-between">
                <h3 className="text-[var(--hw-text-main)] font-bold tracking-widest uppercase text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FF5722] rounded-full animate-pulse"></span>
                  System Configuration
                </h3>
                <button 
                  onClick={() => setShowSettings(false)}
                  className="text-[var(--hw-text-muted)] hover:text-[var(--hw-text-main)] transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Modal Body */}
              <div className="p-6 bg-[var(--hw-chassis)] max-h-[70vh] overflow-y-auto">
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-bold text-[var(--hw-text-muted)] uppercase mb-2 block">Template Selection</label>
                    <div className="relative">
                      <select 
                        value={selectedTemplateId}
                        onChange={(e) => handleTemplateChange(e.target.value)}
                        className="w-full bg-[var(--hw-panel)] text-[var(--hw-text-main)] font-medium rounded-lg px-4 py-3 border border-[var(--hw-border)] shadow-sm focus:border-[#FF5722] outline-none appearance-none"
                      >
                        {callTemplates.map(t => (
                          <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--hw-text-muted)]">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-[var(--hw-text-muted)] font-mono bg-[var(--hw-border)] p-2 rounded">
                      {selectedTemplate.description}
                    </p>
                  </div>

                  {/* Dynamic Fields */}
                  <div className="space-y-4 border-t border-[var(--hw-border)] pt-4">
                    {selectedTemplate.fields.map(field => (
                       <div key={field.name}>
                          <label className="text-xs font-bold text-[var(--hw-text-muted)] uppercase mb-1 block">
                            {field.label} {field.required && <span className="text-[#FF5722]">*</span>}
                          </label>
                          {field.type === 'text' && field.name === 'expectedFlow' ? (
                            <textarea 
                              value={templateValues[field.name] || ''}
                              onChange={(e) => handleTemplateFieldChange(field.name, e.target.value)}
                              className="w-full bg-[var(--hw-panel)] text-[var(--hw-text-main)] rounded-lg px-3 py-2 border border-[var(--hw-border)] shadow-sm focus:border-[#FF5722] outline-none min-h-[100px] resize-y text-sm"
                              placeholder={field.placeholder}
                            />
                          ) : (
                            <input 
                              type={field.type}
                              value={templateValues[field.name] || ''}
                              onChange={(e) => handleTemplateFieldChange(field.name, e.target.value)}
                              className="w-full bg-[var(--hw-panel)] text-[var(--hw-text-main)] rounded-lg px-3 py-2 border border-[var(--hw-border)] shadow-sm focus:border-[#FF5722] outline-none text-sm"
                              placeholder={field.placeholder}
                            />
                          )}
                       </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Modal Footer */}
              <div className="bg-[var(--hw-border)] px-6 py-4 border-t border-[var(--hw-border)] flex justify-end">
                <button 
                  onClick={() => setShowSettings(false)}
                  className="px-6 py-2 bg-[var(--hw-text-main)] text-[var(--hw-panel)] text-xs font-bold uppercase tracking-wider rounded hover:bg-[#FF5722] transition-colors shadow-md"
                >
                  Confirm Settings
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-noise mix-blend-overlay"></div>
    </section>
  );
}