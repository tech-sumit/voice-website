"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

// WhatsApp integration conversation simulation
const whatsappConversation = [
  {
    type: "customer",
    message: "Hi! I'm interested in your services. Do you have any appointments available this week?",
    timing: 500,
  },
  {
    type: "ai",
    message: "Hello! I'd be happy to help you book an appointment. We have openings on Wednesday at 2PM, Thursday at 11AM, and Friday at 3PM. Which works best for you?",
    timing: 1000,
  },
  {
    type: "customer",
    message: "Thursday at 11AM would be perfect!",
    timing: 1750,
  },
  {
    type: "ai",
    message: "Great! I'll book you for Thursday at 11AM. Could I get your name and email for the reservation?",
    timing: 2250,
  },
  {
    type: "customer",
    message: "Sure, it's Alex Johnson, alex.johnson@example.com",
    timing: 3000,
  },
  {
    type: "ai",
    message: "Thank you, Alex! I've booked your appointment and sent a confirmation to your email. Is there anything else you'd like to know about our services?",
    timing: 3500,
  },
  {
    type: "system",
    message: "✓ Appointment added to CRM\n✓ Calendar updated\n✓ Confirmation email sent",
    timing: 4000,
  }
];

// Integration cards for the display
const integrations = [
  { 
    name: "WhatsApp Business", 
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.652a11.882 11.882 0 005.693 1.45h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    color: "bg-primary-500",
    description: "Connect with customers where they are",
    timing: 1250, // When to show this integration
  },
  { 
    name: "Calendar Sync", 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: "bg-secondary-500",
    description: "Schedule appointments instantly",
    timing: 2000, // When to show this integration
  },
  { 
    name: "CRM Integration", 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: "bg-accent-500",
    description: "Automatically log conversations",
    timing: 2750, // When to show this integration
  },
  { 
    name: "Email Automation", 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: "bg-bright-500",
    description: "Send confirmations automatically",
    timing: 3500, // When to show this integration
  },
];

export default function IntegrationsSection() {
  const [activeMessages, setActiveMessages] = useState<number[]>([]);
  const [visibleIntegrations, setVisibleIntegrations] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [currentDateString, setCurrentDateString] = useState("");
  const animationRef = useRef<NodeJS.Timeout[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const isPlayingRef = useRef(isPlaying);
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);
  
  const startDemo = useCallback(() => {
    if (isPlayingRef.current) return;
    
    // Reset state
    setActiveMessages([]);
    setVisibleIntegrations([]);
    setIsComplete(false);
    setIsPlaying(true);
    
    // Clear any previous timers
    animationRef.current.forEach(timer => clearTimeout(timer));
    animationRef.current = [];
    
    // Set up message appearance sequence
    whatsappConversation.forEach((message, index) => {
      const timer = setTimeout(() => {
        setActiveMessages(prev => [...prev, index]);
      }, message.timing);
      animationRef.current.push(timer);
    });
    
    // Set up integrations appearance sequence (one after another)
    integrations.forEach((integration, index) => {
      const timer = setTimeout(() => {
        setVisibleIntegrations(prev => [...prev, index]);
      }, integration.timing);
      animationRef.current.push(timer);
    });
    
    // Set complete after all animations
    const completeTimer = setTimeout(() => {
      setIsPlaying(false);
      setIsComplete(true);
    }, 4500);
    
    animationRef.current.push(completeTimer);
  }, [setActiveMessages, setVisibleIntegrations, setIsComplete, setIsPlaying]); // whatsappConversation & integrations are module-level constants
  
  useEffect(() => {
    setCurrentDateString(new Date().toLocaleDateString());
  }, []);

  // Auto-scroll chat container when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [activeMessages]);

  // Auto-start the demo when component mounts and on visibility change
  useEffect(() => {
    // Attempt to start on initial mount
    startDemo();
    
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isPlayingRef.current) {
        // Restart when section becomes visible again and not already playing
        startDemo();
      }
    }, { threshold: 0.3 });
    
    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }
    
    // Clean up timers and observer on unmount
    return () => {
      animationRef.current.forEach(timer => clearTimeout(timer));
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, [startDemo, sectionRef]); // sectionRef is stable, startDemo is now stable

  return (
    <section 
      ref={sectionRef}
      id="whatsapp-integration-section" 
      className="py-12 bg-gradient-to-b from-surface-800 to-surface-900 overflow-hidden relative"
    >
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
        <div className="absolute top-20 left-20 w-24 h-24 border-2 border-accent-600/20 rounded-lg rotate-45"></div>
        <div className="absolute bottom-32 right-32 w-32 h-32 border-2 border-accent-500/20 rounded-full"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 border-2 border-accent-400/20 rotate-12"></div>

        {/* Subtle gradient orbs */}
        <div className="absolute top-40 left-1/4 w-64 h-64 bg-accent-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-1/4 w-48 h-48 bg-accent-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block"
          >
            <div className="inline-flex items-center px-4 py-2 bg-accent-900/30 border border-accent-600/30 rounded-full mb-4">
              <motion.span 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-2 w-2 rounded-full bg-accent-500 mr-3"
              />
              <span className="text-accent-400 text-sm font-medium tracking-wide uppercase">INTEGRATIONS</span>
            </div>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-300">
              WhatsApp For Business
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed"
          >
            Connect your business systems with WhatsApp to automate customer interactions
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Left Side - Animated WhatsApp Chat */}
          <div className="lg:col-span-3">
            <div className="max-w-md mx-auto">
        <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden border border-neutral-200 dark:border-neutral-700"
              >
                {/* WhatsApp header */}
                <div className="bg-primary-500 dark:bg-primary-600 p-4 text-white flex items-center">
                  <div className="mr-3">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.652a11.882 11.882 0 005.693 1.45h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold">Business Chat</h3>
                    <p className="text-sm text-primary-100">Your AI Assistant is active</p>
                  </div>
                  <div className="ml-auto flex items-center space-x-3">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </div>
                </div>
                
                {/* Chat container */}
                <div 
                  ref={chatContainerRef}
                  className="p-4 bg-neutral-50 dark:bg-neutral-900 h-[400px] overflow-y-auto flex flex-col space-y-3 scrollbar-hide"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <style jsx global>{`
                    /* Hide scrollbar for Chrome, Safari and Opera */
                    .scrollbar-hide::-webkit-scrollbar {
                      display: none;
                    }
                    
                    /* Hide scrollbar for IE, Edge and Firefox */
                    .scrollbar-hide {
                      -ms-overflow-style: none;  /* IE and Edge */
                      scrollbar-width: none;  /* Firefox */
                    }
                  `}</style>
                  
                  <div className="text-center text-xs text-neutral-500 dark:text-neutral-400 py-2">
                    Today, {currentDateString}
                  </div>
                  
                  {/* Messages */}
                  <AnimatePresence>
                    {whatsappConversation.map((message, index) => {
                      if (activeMessages.includes(index)) {
                        if (message.type === "system") {
                          return (
                            <motion.div
                              key={`message-${index}`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.15 }}
                              className="mx-auto max-w-[80%] bg-accent-100 dark:bg-accent-900/40 p-3 rounded-lg text-sm text-accent-800 dark:text-accent-200 border border-accent-200 dark:border-accent-800"
                            >
                              <div className="font-medium mb-1">System Notification</div>
                              <div className="whitespace-pre-line">{message.message}</div>
                            </motion.div>
                          );
                        }
                        
                        return (
                          <motion.div
                            key={`message-${index}`}
                            initial={{ opacity: 0, x: message.type === "customer" ? 20 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className={`max-w-[70%] p-3 rounded-lg ${
                              message.type === "customer" 
                                ? "ml-auto bg-primary-100 dark:bg-primary-800 text-neutral-800 dark:text-white rounded-tr-none" 
                                : "mr-auto bg-white dark:bg-neutral-700 text-neutral-800 dark:text-white rounded-tl-none"
                            }`}
                          >
                            <div className="text-sm">{message.message}</div>
                            <div className="text-right mt-1">
                              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                {message.type === "customer" && (
                                  <span className="ml-1 text-primary-500">✓✓</span>
                                )}
                              </span>
                            </div>
                          </motion.div>
                        );
                      }
                      return null;
                    })}
                  </AnimatePresence>
                  
                  {/* Loading indicator when playing */}
                  {isPlaying && activeMessages.length < whatsappConversation.length && (
                    <div className="flex items-center justify-center p-2">
                      <div className="flex space-x-1">
                        <motion.div
                          animate={{ 
                            scale: [0.8, 1, 0.8],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0
                          }}
                          className="w-2 h-2 bg-neutral-500 dark:bg-neutral-400 rounded-full"
                        />
                        <motion.div
                          animate={{ 
                            scale: [0.8, 1, 0.8],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.2
                          }}
                          className="w-2 h-2 bg-neutral-500 dark:bg-neutral-400 rounded-full"
                        />
                        <motion.div
                          animate={{ 
                            scale: [0.8, 1, 0.8],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.4
                          }}
                          className="w-2 h-2 bg-neutral-500 dark:bg-neutral-400 rounded-full"
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Input field */}
                <div className="p-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 flex items-center">
                  <button className="text-neutral-500 dark:text-neutral-400 mr-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  <div className="flex-1 bg-neutral-100 dark:bg-neutral-700 rounded-full py-2 px-4 text-neutral-600 dark:text-neutral-300">
                    Type a message...
                  </div>
                  <button className="text-neutral-500 dark:text-neutral-400 ml-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </button>
                </div>
              </motion.div>
              
              {/* Demo controls - only show if needed */}
              {isComplete && (
                <div className="mt-5 flex justify-center">
                  <Button
                    onClick={startDemo}
                    disabled={isPlaying}
                    className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-6 rounded-lg flex items-center space-x-2"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Replay Demo</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Side - Integration Cards */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                Seamlessly Connect Your Tools
              </h3>
              
              <AnimatePresence>
                {integrations.map((integration, index) => (
                  <motion.div
                    key={integration.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: visibleIntegrations.includes(index) ? 1 : 0, 
                      y: visibleIntegrations.includes(index) ? 0 : 20,
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 30,
                    }}
                    className="bg-white dark:bg-neutral-800 rounded-lg p-4 shadow-md border border-neutral-200 dark:border-neutral-700 flex items-center"
                  >
                    <div className={`${integration.color} text-white p-3 rounded-lg mr-4`}>
                      {integration.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-neutral-900 dark:text-white">
                        {integration.name}
                      </h4>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {integration.description}
                      </p>
                    </div>
                    <motion.div 
                      className={`ml-auto w-8 h-8 rounded-full ${visibleIntegrations.includes(index) ? "bg-primary-100 text-primary-600" : "bg-neutral-100 text-neutral-400"} flex items-center justify-center`}
                      animate={{ 
                        scale: visibleIntegrations.includes(index) ? [1, 1.3, 1] : 1,
                        backgroundColor: visibleIntegrations.includes(index) ? "#EBF5FF" : "#F3F4F6", // primary-100 equivalent
                        rotate: visibleIntegrations.includes(index) ? [0, 20, 0] : 0
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 