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
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    
    // Execute reCAPTCHA Enterprise
    if (!captchaToken) {
      if (!isRecaptchaLoaded || typeof window.grecaptcha === 'undefined') {
        setSubmitError("Security verification is still loading. Please try again in a moment.");
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
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Load reCAPTCHA Enterprise script */}
      <Script
        src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LdSPC8rAAAAALSdtGhM_cj4t-HHu2040PI3zGbi'}`}
        onLoad={handleRecaptchaLoad}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-4xl font-bold text-secondary-900 dark:text-white mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-secondary-600 dark:text-secondary-300 mb-8">
            Have questions about our services or need a custom solution? Get in touch with our team using the form below.
          </p>
        </div>
        
        <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg p-8 max-w-3xl mx-auto w-full">
          <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
            Send us a message
          </h2>
          
          {submitSuccess ? (
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg mb-6">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="ml-3 text-sm font-medium text-green-800 dark:text-green-200">
                  Your message has been sent! We&apos;ll get back to you soon.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitError && (
                <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg mb-6">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="ml-3 text-sm font-medium text-red-800 dark:text-red-200">
                      {submitError}
                    </p>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-secondary-700 dark:border-secondary-600 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-secondary-700 dark:border-secondary-600 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-secondary-700 dark:border-secondary-600 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-secondary-700 dark:border-secondary-600 dark:text-white"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-secondary-700 dark:border-secondary-600 dark:text-white"
                />
              </div>
              
              {/* Security badge instead of visible CAPTCHA */}
              <div className="mt-6">
                <div className="bg-neutral-50 dark:bg-neutral-700 rounded-xl p-3 flex items-center justify-center space-x-2 text-secondary-600 dark:text-secondary-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Protected by reCAPTCHA Enterprise</span>
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : "Send Message"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
} 