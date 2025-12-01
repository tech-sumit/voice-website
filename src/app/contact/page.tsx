"use client";

import React, { useState } from 'react';
import Script from 'next/script';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle reCAPTCHA script load
  const handleRecaptchaLoad = () => {
    setIsRecaptchaLoaded(true);
  };

  const handleRecaptchaError = () => {
    setSubmitError("Failed to load security system. Please check your internet connection or disable ad blockers.");
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    
    // Execute reCAPTCHA Enterprise
    if (!captchaToken) {
      // Check if grecaptcha is available even if onLoad didn't fire
      if (typeof window !== 'undefined' && window.grecaptcha && !isRecaptchaLoaded) {
        setIsRecaptchaLoaded(true);
      }

      if ((!isRecaptchaLoaded && typeof window.grecaptcha === 'undefined') || !window.grecaptcha) {
        setSubmitError("Security system is initializing. Please wait a few seconds and try again.");
        return;
      }
      
      try {
        setIsSubmitting(true);
    
        // Execute reCAPTCHA Enterprise
        window.grecaptcha.enterprise.ready(async () => {
          try {
            const token = await window.grecaptcha.enterprise.execute(
              process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LdSPC8rAAAAALSdtGhM_cj4t-HHu2040PI3zGbi', 
              { action: 'CONTACT' }
            );
            
            setCaptchaToken(token);
            
            // Continue with form submission
            await submitForm(token);
          } catch (error) {
            console.error('reCAPTCHA error:', error);
            setSubmitError("Security verification failed. Please try again.");
            setIsSubmitting(false);
          }
        });
      } catch (error) {
        console.error('reCAPTCHA execution error:', error);
        setSubmitError("Security verification failed. Please refresh the page and try again.");
        setIsSubmitting(false);
      }
    } else {
      // If we already have a token, proceed with submission
      setIsSubmitting(true);
      await submitForm(captchaToken);
    }
  };
  
  const submitForm = async (token: string) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          captchaToken: token
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // Generic error message to avoid exposing implementation details
        if (response.status === 429) {
          setSubmitError("Too many requests. Please try again later.");
        } else if (data.error?.includes('Security')) {
          setSubmitError("Security verification failed. Please refresh the page and try again.");
        } else {
          setSubmitError(data.error || 'Unable to process your request at this time');
        }
        
        // Reset captcha token if it was invalid
        if (data.error?.includes('Security')) {
          setCaptchaToken(null);
        }
        
      setIsSubmitting(false);
        return;
      }
      
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
      });
      
      // Reset captcha
      setCaptchaToken(null);
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch {
      console.error('Form submission error');
      setSubmitError('Unable to process your request. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-[var(--hw-chassis)] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-noise mix-blend-overlay"></div>
      
      {/* Load reCAPTCHA Enterprise script */}
      <Script
        src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LdSPC8rAAAAALSdtGhM_cj4t-HHu2040PI3zGbi'}`}
        onLoad={handleRecaptchaLoad}
        onError={handleRecaptchaError}
        strategy="afterInteractive"
      />
      
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <div className="inline-block bg-[var(--hw-border)] px-4 py-1 rounded border border-[var(--hw-border)] mb-6 shadow-sm">
               <span className="text-[var(--hw-text-muted)] text-xs font-bold tracking-[0.2em] uppercase">Communication Channel</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--hw-text-main)] mb-6 tracking-tight">
              Initiate <span className="text-[#FF5722]">Contact</span>
            </h1>
            <p className="text-lg text-[var(--hw-text-muted)] max-w-2xl mx-auto font-medium">
              Transmit your inquiry directly to our central processing unit. 
              Standard response time: &lt; 24 hours.
            </p>
          </div>
          
          {/* The Clipboard / Form Container */}
          <div className="max-w-3xl mx-auto w-full bg-[var(--hw-panel)] rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.1),0_1px_0_rgba(0,0,0,0.1)] border-t-[12px] border-[var(--hw-text-main)] relative p-8 md:p-12">
            
            {/* Clip Mechanism Visual */}
            <div className="absolute -top-[20px] left-1/2 transform -translate-x-1/2 w-32 h-4 bg-[#5D5955] rounded-b-lg shadow-md"></div>
            <div className="absolute -top-[35px] left-1/2 transform -translate-x-1/2 w-40 h-8 bg-[var(--hw-text-main)] rounded-lg shadow-lg flex items-center justify-center">
               <div className="w-20 h-1 bg-[#5D5955] rounded-full"></div>
            </div>

            <h2 className="text-xl font-bold text-[var(--hw-text-main)] mb-8 border-b-2 border-[var(--hw-border)] pb-4 uppercase tracking-wide flex justify-between items-center">
              <span>Service Request Form</span>
              <span className="text-xs font-mono text-[var(--hw-text-muted)] font-normal">REF: CX-900</span>
            </h2>
          
          {submitSuccess ? (
            <div className="bg-[#E8F3F1] border-l-4 border-[var(--hw-screen)] p-6 rounded-r-md mb-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-[var(--hw-screen)] rounded-full flex items-center justify-center">
                    <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-[var(--hw-screen)]">Transmission Successful</h3>
                  <p className="mt-1 text-[var(--hw-text-muted)]">
                    Your data packet has been received. Awaiting operator review.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {submitError && (
                <div className="bg-[#FDF4F2] border-l-4 border-[#D84315] p-4 rounded-r-md mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-[#D84315]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-[#D84315] font-mono">
                        ERROR: {submitError}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-[var(--hw-text-muted)] uppercase tracking-wider mb-2">
                    Identity (Name)
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="block w-full border-b-2 border-[var(--hw-border)] bg-[var(--hw-chassis)] focus:border-[#FF5722] focus:bg-[var(--hw-panel)] px-3 py-2 transition-colors outline-none font-mono text-[var(--hw-text-main)]"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-[var(--hw-text-muted)] uppercase tracking-wider mb-2">
                    Contact Frequency (Email)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full border-b-2 border-[var(--hw-border)] bg-[var(--hw-chassis)] focus:border-[#FF5722] focus:bg-[var(--hw-panel)] px-3 py-2 transition-colors outline-none font-mono text-[var(--hw-text-main)]"
                    placeholder="john@company.com"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <label htmlFor="company" className="block text-xs font-bold text-[var(--hw-text-muted)] uppercase tracking-wider mb-2">
                    Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="block w-full border-b-2 border-[var(--hw-border)] bg-[var(--hw-chassis)] focus:border-[#FF5722] focus:bg-[var(--hw-panel)] px-3 py-2 transition-colors outline-none font-mono text-[var(--hw-text-main)]"
                    placeholder="Acme Corp"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-[var(--hw-text-muted)] uppercase tracking-wider mb-2">
                    Comms Link (Phone)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full border-b-2 border-[var(--hw-border)] bg-[var(--hw-chassis)] focus:border-[#FF5722] focus:bg-[var(--hw-panel)] px-3 py-2 transition-colors outline-none font-mono text-[var(--hw-text-main)]"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-xs font-bold text-[var(--hw-text-muted)] uppercase tracking-wider mb-2">
                  Data Payload (Message)
                </label>
                <div className="bg-[var(--hw-chassis)] p-2 rounded-sm border border-[var(--hw-border)] focus-within:border-[#FF5722] transition-colors">
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="block w-full bg-transparent outline-none font-mono text-[var(--hw-text-main)] text-sm resize-none"
                    placeholder="Enter your specifications here..."
                  />
                </div>
              </div>
              
              {/* Security badge instead of visible CAPTCHA */}
              <div className="mt-4 flex justify-end">
                <div className="inline-flex items-center space-x-2 text-[var(--hw-text-muted)] text-[10px] font-mono uppercase border border-[var(--hw-border)] px-2 py-1 rounded bg-[var(--hw-chassis)]">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span>Secured via reCAPTCHA Protocol</span>
                </div>
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 text-lg font-bold uppercase tracking-wider text-white rounded shadow-[0_4px_0_#B33016] active:shadow-none active:translate-y-[4px] transition-all
                    ${isSubmitting ? 'bg-[#CC3D1A] cursor-wait' : 'bg-[#FF5722] hover:bg-[#FF6D3F]'}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      TRANSMITTING...
                    </span>
                  ) : "TRANSMIT DATA"}
                </button>
              </div>
            </form>
          )}
          </div>
        </div>
      </div>
    </div>
  );
} 