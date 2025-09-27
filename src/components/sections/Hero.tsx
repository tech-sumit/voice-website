"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import siteConfig from "@/config/site.json";
import supportedLanguages from "@/config/languages";
import callTemplates from "@/config/callTemplates";
import { Button } from "@/components/ui/Button";
import Script from "next/script";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Hero() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [language, setLanguage] = useState("hi-IN");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
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
  
  // Refs to prevent animation conflicts
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const messageDisplayed = useRef(false);
  const inputDisplayed = useRef(false);
  
  const fullText = "Experience the future of customer service with our AI voice agents.";

  // Get the current template
  const selectedTemplate = callTemplates.find(t => t.id === selectedTemplateId) || callTemplates[0];

  // Handle template change
  const handleTemplateChange = (templateId: string) => {
    const template = callTemplates.find(t => t.id === templateId);
    if (!template) return;
    // Reset template values
    const initialValues: Record<string, string> = {};
    template.fields.forEach(field => {
      initialValues[field.name] = "";
    });
    setSelectedTemplateId(templateId);
    setTemplateValues(initialValues);
    setIsSubmitted(false); // Reset submission state on template change
  };

  // Handle template field changes
  const handleTemplateFieldChange = (fieldName: string, value: string) => {
    setTemplateValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  useEffect(() => {
    // Clean up animation timeline on component unmount
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Start animation sequence automatically with more reliable timing
    const stageOneTimer = setTimeout(() => setAnimationStage(1), 700);
    const stageTwoTimer = setTimeout(() => setAnimationStage(2), 1600);
    const stageThreeTimer = setTimeout(() => {
      setAnimationStage(3);
      startTypingAnimation();
    }, 2400);
    const stageFourTimer = setTimeout(() => {
      setAnimationStage(4);
      inputDisplayed.current = true;
    }, 3500);
    
    // Cleanup function to prevent memory leaks
    return () => {
      clearTimeout(stageOneTimer);
      clearTimeout(stageTwoTimer);
      clearTimeout(stageThreeTimer);
      clearTimeout(stageFourTimer);
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);
  
  // Initialize reCAPTCHA when it loads
  const handleRecaptchaLoad = () => {
    setIsRecaptchaLoaded(true);
  };
  
  const startTypingAnimation = () => {
    if (messageDisplayed.current) return;
    messageDisplayed.current = true;
    
    setIsTyping(true);
    let i = 0;
    
    typingIntervalRef.current = setInterval(() => {
      if (i < fullText.length) {
        setCurrentText(fullText.substring(0, i + 1));
        i++;
      } else {
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
        }
        setIsTyping(false);
      }
    }, 30);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Always get the latest template and values from state
    const template = callTemplates.find(t => t.id === selectedTemplateId) || callTemplates[0];
    const expectedFlow = template.generateFlow(templateValues);

    // Validate required fields
    const missingFields = template.fields
      .filter(field => field.required && !templateValues[field.name])
      .map(field => field.label);

    if (missingFields.length > 0) {
      setError(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      return;
    }

    // Improved phone number validation
    const phoneDigits = phoneNumber.replace(/\D/g, '');

    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      setError("Please enter a valid phone number (7-15 digits)");
      return;
    }

    setIsSubmitting(true);

    try {
      if (!isRecaptchaLoaded || typeof window.grecaptcha === 'undefined') {
        setError("Security verification is still loading. Please try again in a moment.");
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
          setError("Security verification failed. Please try again.");
          setIsSubmitting(false);
        }
      });
    } catch (error) {
      console.error('reCAPTCHA execution error:', error);
      setError("Security verification failed. Please refresh the page and try again.");
      setIsSubmitting(false);
    }
  };
  
  const submitForm = async (token: string, expectedFlow: string, templateId: string) => {
    try {
      const response = await fetch('/api/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
        // Generic error message to avoid exposing implementation details
        if (response.status === 429) {
          setError("Too many requests. Please try again later.");
        } else if (data.error?.includes('Security')) {
          setError("Security verification failed. Please refresh the page and try again.");
        } else {
          setError(data.error || 'Unable to process your request at this time');
        }
        
        // Reset captcha token if it was invalid
        if (data.error?.includes('Security')) {
          setIsRecaptchaLoaded(false);
        }
        
        setIsSubmitting(false);
        return;
      }
      
      setIsSubmitted(true);
      // Don't log phone number to console in production
      if (process.env.NODE_ENV !== 'production') {
        console.log("Phone number submitted");
      }
      
      // Reset after showing success message
      setTimeout(() => {
        setPhoneNumber("");
        setIsSubmitted(false);
        setIsRecaptchaLoaded(false);
      }, 5000);
    } catch {
      console.error('Form submission error');
      setError('Unable to process your request. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Blob animation variants
  const blobVariants = {
    animate: (custom: number) => ({
      scale: [1, 1.1, 1],
      opacity: [0.15, 0.25, 0.15],
      y: custom === 1 ? [0, -20, 0] : custom === 2 ? [0, 20, 0] : 0,
      x: custom === 3 ? [0, 30, 0] : 0,
      transition: { 
        duration: 12 + custom * 3, 
        repeat: Infinity,
        ease: "easeInOut",
        delay: custom - 1
      }
    })
  };

  // Common country codes for dropdown
  const countryCodes = [
    { code: "+1", name: "US/CA" },
    { code: "+7", name: "RU" },
    { code: "+20", name: "EG" },
    { code: "+27", name: "ZA" },
    { code: "+30", name: "GR" },
    { code: "+31", name: "NL" },
    { code: "+32", name: "BE" },
    { code: "+33", name: "FR" },
    { code: "+34", name: "ES" },
    { code: "+36", name: "HU" },
    { code: "+39", name: "IT" },
    { code: "+40", name: "RO" },
    { code: "+41", name: "CH" },
    { code: "+43", name: "AT" },
    { code: "+44", name: "UK" },
    { code: "+45", name: "DK" },
    { code: "+46", name: "SE" },
    { code: "+47", name: "NO" },
    { code: "+48", name: "PL" },
    { code: "+49", name: "DE" },
    { code: "+51", name: "PE" },
    { code: "+52", name: "MX" },
    { code: "+53", name: "CU" },
    { code: "+54", name: "AR" },
    { code: "+55", name: "BR" },
    { code: "+56", name: "CL" },
    { code: "+57", name: "CO" },
    { code: "+58", name: "VE" },
    { code: "+60", name: "MY" },
    { code: "+61", name: "AU" },
    { code: "+62", name: "ID" },
    { code: "+63", name: "PH" },
    { code: "+64", name: "NZ" },
    { code: "+65", name: "SG" },
    { code: "+66", name: "TH" },
    { code: "+81", name: "JP" },
    { code: "+82", name: "KR" },
    { code: "+84", name: "VN" },
    { code: "+86", name: "CN" },
    { code: "+90", name: "TR" },
    { code: "+91", name: "IN" },
    { code: "+92", name: "PK" },
    { code: "+93", name: "AF" },
    { code: "+94", name: "LK" },
    { code: "+95", name: "MM" },
    { code: "+98", name: "IR" },
    { code: "+212", name: "MA" },
    { code: "+213", name: "DZ" },
    { code: "+216", name: "TN" },
    { code: "+218", name: "LY" },
    { code: "+220", name: "GM" },
    { code: "+221", name: "SN" },
    { code: "+222", name: "MR" },
    { code: "+223", name: "ML" },
    { code: "+234", name: "NG" },
    { code: "+241", name: "GA" },
    { code: "+242", name: "CG" },
    { code: "+251", name: "ET" },
    { code: "+254", name: "KE" },
    { code: "+255", name: "TZ" },
    { code: "+256", name: "UG" },
    { code: "+260", name: "ZM" },
    { code: "+261", name: "MG" },
    { code: "+262", name: "RE" },
    { code: "+263", name: "ZW" },
    { code: "+351", name: "PT" },
    { code: "+352", name: "LU" },
    { code: "+353", name: "IE" },
    { code: "+354", name: "IS" },
    { code: "+355", name: "AL" },
    { code: "+357", name: "CY" },
    { code: "+358", name: "FI" },
    { code: "+359", name: "BG" },
    { code: "+370", name: "LT" },
    { code: "+371", name: "LV" },
    { code: "+372", name: "EE" },
    { code: "+373", name: "MD" },
    { code: "+374", name: "AM" },
    { code: "+375", name: "BY" },
    { code: "+376", name: "AD" },
    { code: "+377", name: "MC" },
    { code: "+378", name: "SM" },
    { code: "+380", name: "UA" },
    { code: "+381", name: "RS" },
    { code: "+385", name: "HR" },
    { code: "+386", name: "SI" },
    { code: "+387", name: "BA" },
    { code: "+389", name: "MK" },
    { code: "+420", name: "CZ" },
    { code: "+421", name: "SK" },
    { code: "+423", name: "LI" },
    { code: "+501", name: "BZ" },
    { code: "+502", name: "GT" },
    { code: "+503", name: "SV" },
    { code: "+504", name: "HN" },
    { code: "+505", name: "NI" },
    { code: "+506", name: "CR" },
    { code: "+507", name: "PA" },
    { code: "+509", name: "HT" },
    { code: "+590", name: "GP" },
    { code: "+591", name: "BO" },
    { code: "+592", name: "GY" },
    { code: "+593", name: "EC" },
    { code: "+595", name: "PY" },
    { code: "+597", name: "SR" },
    { code: "+598", name: "UY" },
    { code: "+599", name: "CW" },
    { code: "+673", name: "BN" },
    { code: "+674", name: "NR" },
    { code: "+675", name: "PG" },
    { code: "+676", name: "TO" },
    { code: "+677", name: "SB" },
    { code: "+678", name: "VU" },
    { code: "+679", name: "FJ" },
    { code: "+680", name: "PW" },
    { code: "+682", name: "CK" },
    { code: "+685", name: "WS" },
    { code: "+686", name: "KI" },
    { code: "+687", name: "NC" },
    { code: "+689", name: "PF" },
    { code: "+850", name: "KP" },
    { code: "+852", name: "HK" },
    { code: "+853", name: "MO" },
    { code: "+855", name: "KH" },
    { code: "+856", name: "LA" },
    { code: "+880", name: "BD" },
    { code: "+886", name: "TW" },
    { code: "+960", name: "MV" },
    { code: "+961", name: "LB" },
    { code: "+962", name: "JO" },
    { code: "+963", name: "SY" },
    { code: "+964", name: "IQ" },
    { code: "+965", name: "KW" },
    { code: "+966", name: "SA" },
    { code: "+967", name: "YE" },
    { code: "+968", name: "OM" },
    { code: "+970", name: "PS" },
    { code: "+971", name: "AE" },
    { code: "+972", name: "IL" },
    { code: "+973", name: "BH" },
    { code: "+974", name: "QA" },
    { code: "+975", name: "BT" },
    { code: "+976", name: "MN" },
    { code: "+977", name: "NP" },
    { code: "+992", name: "TJ" },
    { code: "+993", name: "TM" },
    { code: "+994", name: "AZ" },
    { code: "+995", name: "GE" },
    { code: "+996", name: "KG" },
    { code: "+998", name: "UZ" }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-accent-50 to-accent-100 dark:from-surface-800 dark:to-surface-900 min-h-[70vh] flex items-center">
      {/* Load reCAPTCHA Enterprise script */}
      <Script
        src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LdSPC8rAAAAALSdtGhM_cj4t-HHu2040PI3zGbi'}`}
        onLoad={handleRecaptchaLoad}
      />
      
      {/* Color Hunt palette background elements - earthy and natural */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-[10%] w-[40rem] h-[40rem] rounded-full bg-primary-400/15 dark:bg-primary-600/20 blur-[100px]"
          variants={blobVariants}
          animate="animate"
          custom={1}
        />
        <motion.div 
          className="absolute bottom-0 right-[5%] w-[35rem] h-[35rem] rounded-full bg-secondary-400/12 dark:bg-secondary-600/15 blur-[100px]"
          variants={blobVariants}
          animate="animate"
          custom={2}
        />
        <motion.div 
          className="absolute top-[40%] right-[15%] w-[25rem] h-[25rem] rounded-full bg-accent-300/8 dark:bg-accent-500/10 blur-[80px]"
          variants={blobVariants}
          animate="animate"
          custom={3}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Text */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 0.5,
                ease: "easeOut"
              }}
              className="space-y-6"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 text-primary-800 dark:text-primary-300 text-sm font-medium mb-4">
                <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2"></span>
                Revolutionary Voice AI Technology
              </div>
            
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-bright-500 dark:text-accent-100">
                <span className="text-primary-500 dark:text-primary-400 inline-block">
                  {siteConfig.name}
                </span>{" "}
                <br />
                <span className="text-bright-600 dark:text-accent-200 inline-block mt-1">
                  {siteConfig.description}
                </span>
              </h1>
              
              <p className="text-xl text-bright-600 dark:text-accent-300 max-w-xl">
                AI phone agents that sound human, speak any language, and work 24/7. 
                Integrate seamlessly with your CRM and business tools.
              </p>
              
              <div className="flex flex-wrap gap-5 pt-4">
                <Button 
                  href={siteConfig.cta.secondary.url} 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-primary-500/50 text-primary-600 dark:text-primary-400 hover:bg-primary-500/10 hover:scale-[1.02] transition-all duration-300"
                >
                  {siteConfig.cta.secondary.text}
                </Button>
              </div>
              
              <div className="pt-8">
                <p className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-2 text-primary-500" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Trusted by innovative companies worldwide
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right column - Interactive Phone Experience */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: 0.7, 
              delay: 0.3,
              type: "spring",
              stiffness: 100
            }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[340px] h-[750px]">
              {/* 3D Phone Device Frame */}
              <motion.div
                className="absolute inset-0 w-full bg-gradient-to-b from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900 rounded-[40px] overflow-hidden shadow-2xl border border-neutral-400/20 dark:border-neutral-600/20"
                initial={{ rotateY: 0 }}
                animate={{
                  rotateY: animationStage >= 1 ? [0, -15, 0, -5, 0] : 0,
                  scale: 0.88
                }}
                transition={{
                  rotateY: { duration: 1.5, ease: "easeInOut" }
                }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                  boxShadow: "0 50px 100px -20px rgba(0, 0, 0, 0.25), 0 30px 60px -30px rgba(0, 0, 0, 0.3)"
                }}
              >
                {/* Phone Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-7 bg-neutral-800 dark:bg-neutral-950 rounded-b-xl z-10" />

                {/* Phone Screen with High-Definition Visuals */}
                <div className="pt-8 pb-4 px-3 min-h-[650px] bg-surface-50/90 dark:bg-surface-900/90 backdrop-blur-md">
                  {/* Status Bar */}
                  <div className="flex justify-between text-xs text-neutral-800 dark:text-neutral-200 mb-4">
                    <span>9:41 AM</span>
                    <div className="flex space-x-1">
                      <motion.svg 
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                      </motion.svg>
                      <motion.svg 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
                        <path d="M5 5v1.5" />
                        <path d="M9 5v1.5" />
                        <path d="M5 11.5v1" />
                        <path d="M9 11.5v1" />
                        <path d="M5 15v1.5" />
                        <path d="M9 15v1.5" />
                        <path d="M19 5v1.5" />
                        <path d="M19 11.5v1" />
                        <path d="M19 15v1.5" />
                        <path d="M15 5v1.5" />
                        <path d="M15 11.5v1" />
                        <path d="M15 15v1.5" />
                      </motion.svg>
                      <motion.svg 
                        animate={{ 
                          fill: ["rgba(0,0,0,0)", "currentColor", "rgba(0,0,0,0)"] 
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </motion.svg>
                    </div>
                  </div>

                  {/* AI Assistant Visual */}
                  <div className="relative mb-6">
                    <motion.div 
                      className="w-full h-40 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-600 dark:to-secondary-600 overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: animationStage >= 1 ? 1 : 0, 
                        y: animationStage >= 1 ? 0 : 20,
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                      }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 0.2,
                        backgroundPosition: {
                          duration: 10,
                          repeat: Infinity,
                          ease: "linear"
                        }
                      }}
                    >
                      {/* Animated sound waves */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex space-x-2">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <motion.div
                              key={`sound-wave-${i}`}
                              className="w-1 bg-white/80 rounded-full"
                              animate={{ 
                                height: animationStage >= 2 ? 
                                  [15, 30 + (i * 5), 10, 40 - (i * 3), 20] : 
                                  [15, 15, 15] 
                              }}
                              transition={{ 
                                duration: 1,
                                repeat: Infinity, 
                                ease: "easeInOut",
                                delay: i * 0.05
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    {/* Dynamic Voice Assistant Icon */}
                    <motion.div 
                      className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-primary-600 dark:bg-primary-700 flex items-center justify-center border-4 border-white dark:border-surface-900 shadow-lg"
                      animate={{ 
                        scale: animationStage >= 2 ? [1, 1.1, 1] : 1,
                        boxShadow: animationStage >= 2 ? [
                          "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                          "0 15px 25px -5px rgba(59, 130, 246, 0.3)",
                          "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                        ] : "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                      }}
                      transition={{ 
                        scale: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
                        boxShadow: { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                        <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
                        <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Animated Message Area - No AnimatePresence */}
                  <div className="mt-6 pt-2">
                    {/* Assistant message */}
                    {animationStage >= 2 && (
                      <motion.div
                        key="assistant-message"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-4"
                      >
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                          {siteConfig.name} Assistant
                        </h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          {isTyping ? (
                            <span>{currentText}<span className="animate-blink">|</span></span>
                          ) : (
                            animationStage >= 3 && fullText
                          )}
                        </p>
                      </motion.div>
                    )}

                    {/* Show error message if there's an error */}
                    {error && (
                      <motion.div
                        key="error-message"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-red-500 text-white rounded-2xl p-3 mb-3 text-center text-sm"
                      >
                        {error}
                      </motion.div>
                    )}

                    {/* Conditionally render only one of these at a time */}
                    {animationStage >= 4 && !isSubmitted && (
                      <motion.div
                        key="phone-input"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ 
                          duration: 0.3,
                          type: "spring", 
                          stiffness: 500, 
                          damping: 25 
                        }}
                        className="relative bg-white dark:bg-neutral-800 rounded-2xl p-4 shadow-xl border border-neutral-200 dark:border-neutral-700"
                        style={{
                          boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.15), 0 0 10px rgba(0, 0, 0, 0.1)"
                        }}
                      >
                        <h3 className="text-lg font-bold text-center text-neutral-900 dark:text-white mb-3">
                          Get a Personal Demo
                        </h3>
                        <p className="text-sm text-center text-neutral-600 dark:text-neutral-300 mb-3">
                          Enter your phone number and we&apos;ll call you back instantly
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-2">
                          {/* Settings icon triggers modal */}
                          <button
                            type="button"
                            className="absolute top-4 right-4 p-2 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700"
                            onClick={() => setShowSettings(true)}
                          >
                            <Cog6ToothIcon className="h-6 w-6 text-neutral-600 dark:text-neutral-300" />
                          </button>
                          
                          {/* Template Settings Modal */}
                          {showSettings && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                              <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto relative">
                                <button
                                  type="button"
                                  className="absolute top-2 right-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-100"
                                  onClick={() => setShowSettings(false)}
                                >
                                  <XMarkIcon className="h-5 w-5" />
                                </button>
                                <h2 className="text-lg font-semibold mb-4">Conversation Settings</h2>
                                
                                {/* Template selection dropdown */}
                                <div className="mb-4">
                                  <label className="block text-sm font-medium mb-1">
                                    Conversation Template
                                  </label>
                                  <select
                                    value={selectedTemplateId}
                                    onChange={(e) => handleTemplateChange(e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-700 border-2 border-transparent focus:border-primary-500 focus:outline-none transition-all duration-300"
                                  >
                                    {callTemplates.map(template => (
                                      <option key={template.id} value={template.id}>
                                        {template.name}
                                      </option>
                                    ))}
                                  </select>
                                  <p className="text-xs text-neutral-500 mt-1">
                                    {selectedTemplate.description}
                                  </p>
                                </div>
                                
                                {/* Dynamic form fields based on selected template */}
                                <div className="space-y-4">
                                  {selectedTemplate.fields.map(field => (
                                    <label key={field.name} className="block text-sm font-medium">
                                      {field.label}
                                    <div className="relative">
                                        {field.type === 'text' && field.name === 'expectedFlow' ? (
                                          <textarea
                                            value={templateValues[field.name] || ''}
                                            onChange={(e) => handleTemplateFieldChange(field.name, e.target.value)}
                                            className="mt-1 block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-700 dark:text-white"
                                            placeholder={field.placeholder}
                                            maxLength={field.maxLength}
                                            rows={5}
                                            required={field.required}
                                          />
                                        ) : field.type === 'date' ? (
                                      <input
                                            type="date"
                                            value={templateValues[field.name] || ''}
                                            onChange={(e) => handleTemplateFieldChange(field.name, e.target.value)}
                                            className="mt-1 block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-700 dark:text-white"
                                            placeholder={field.placeholder}
                                            required={field.required}
                                          />
                                        ) : (
                                          <input
                                            type={field.type}
                                            value={templateValues[field.name] || ''}
                                            onChange={(e) => handleTemplateFieldChange(field.name, e.target.value)}
                                            className="mt-1 block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-700 dark:text-white"
                                            placeholder={field.placeholder}
                                            maxLength={field.maxLength}
                                            required={field.required}
                                      />
                                        )}
                                        {field.maxLength && (
                                      <div className="absolute bottom-2 right-2 text-xs text-neutral-500">
                                            {(templateValues[field.name] || '').length}/{field.maxLength}
                                      </div>
                                        )}
                                    </div>
                                  </label>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                          
                          <div className="relative">
                            <motion.div
                              animate={{ 
                                boxShadow: ["0 0 0 0 rgba(59, 130, 246, 0)", "0 0 0 4px rgba(59, 130, 246, 0.3)", "0 0 0 0 rgba(59, 130, 246, 0)"]
                              }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                              <div className="flex flex-col sm:flex-row gap-1">
                                {/* Country code dropdown */}
                                <select
                                  value={countryCode}
                                  onChange={(e) => setCountryCode(e.target.value)}
                                  className="w-full sm:w-auto px-2 py-2 rounded-xl text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-700 border-2 border-transparent focus:border-primary-500 focus:outline-none transition-all duration-300 text-sm"
                                  aria-label="Country code"
                                >
                                  {countryCodes.map((country) => (
                                    <option key={country.code} value={country.code}>
                                      {country.code} {country.name}
                                    </option>
                                  ))}
                                </select>

                                {/* Phone input */}
                              <input
                                type="tel"
                                  placeholder="123-456-7890"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-700 border-2 border-transparent focus:border-primary-500 focus:outline-none transition-all duration-300 text-sm"
                                  pattern="[0-9-\s\(\)\.]{7,}"
                                  title="Please enter a valid phone number (7-15 digits)"
                                required
                              />
                              </div>

                              {/* Language selection dropdown */}
                              <div className="mt-2">
                                <label htmlFor="language-select" className="block text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-1">
                                  Preferred Language
                                </label>
                                <select
                                  id="language-select"
                                  value={language}
                                  onChange={(e) => setLanguage(e.target.value)}
                                  className="w-full px-3 py-2 rounded-xl text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-700 border-2 border-transparent focus:border-primary-500 focus:outline-none transition-all duration-300 text-sm"
                                  aria-label="Preferred language"
                                  required
                                >
                                  {supportedLanguages.map((lang) => (
                                    <option key={lang.code} value={lang.code}>
                                      {lang.name}
                                    </option>
                                  ))}
                                </select>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                                  Select the language you&apos;d like for your demo call
                                </p>
                              </div>
                            </motion.div>
                          </div>

                          {/* Security badge instead of visible CAPTCHA */}
                          <div className="flex flex-col items-center mt-1">
                            <div className="bg-neutral-50 dark:bg-neutral-700 rounded-xl p-2 flex items-center text-xs text-secondary-600 dark:text-secondary-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Protected by reCAPTCHA Enterprise
                            </div>
                          </div>

                          <motion.button
                            type="submit"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            disabled={isSubmitting}
                            className={`w-full py-2.5 mt-2 rounded-xl border border-primary-500 bg-primary-600 dark:bg-gradient-primary text-white dark:text-white font-bold shadow-lg shadow-primary-500/20 text-sm ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                          >
                            {isSubmitting ? (
                              <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                              </span>
                            ) : "Call Me Now"}
                          </motion.button>
                        </form>
                      </motion.div>
                    )}

                    {/* Success message */}
                    {isSubmitted && (
                      <motion.div
                        key="success-message"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-success text-white rounded-2xl p-5 text-center shadow-lg"
                      >
                        <motion.div 
                          animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, 0]
                          }}
                          transition={{ duration: 0.5 }}
                          className="w-12 h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-3"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </motion.div>
                        <h3 className="text-lg font-bold mb-1">Thank You!</h3>
                        <p className="text-sm opacity-90 mb-3">Our team will call you back shortly</p>
                        <motion.div 
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          className="text-xs opacity-75"
                        >
                          Connecting to the future of customer service...
                        </motion.div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Home indicator */}
                <div className="h-1.5 w-1/3 bg-neutral-500 rounded-full mx-auto my-4"></div>
              </motion.div>

              {/* Interactive notification pulse - without AnimatePresence */}
              {animationStage >= 1 && (
                <motion.div
                  key="notification-pulse"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 0.7, 0], scale: [1, 1.5, 1] }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 0.5
                  }}
                  className="absolute -bottom-2 right-10 w-6 h-6 bg-primary-500 rounded-full z-20"
                  style={{ filter: "blur(8px)" }}
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 74" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-surface-100 dark:text-surface-800 translate-y-[1px]">
          <path d="M0 25.0194L60 32.5585C120 40.0252 240 55.8083 360 62.333C480 68.8083 600 66.533 720 59.0083C840 51.5329 960 38.9996 1080 36.6663C1200 34.333 1320 42.4996 1380 46.5829L1440 50.6663V74.0001H1380C1320 74.0001 1200 74.0001 1080 74.0001C960 74.0001 840 74.0001 720 74.0001C600 74.0001 480 74.0001 360 74.0001C240 74.0001 120 74.0001 60 74.0001H0V25.0194Z" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
} 