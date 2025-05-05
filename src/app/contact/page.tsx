"use client";

import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import siteConfig from '@/config/site.json';
import ReCAPTCHA from "react-google-recaptcha";

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
  
  // Ref for reCAPTCHA
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Verify that CAPTCHA has been completed
    if (!captchaToken) {
      setSubmitError("Please complete the CAPTCHA verification first.");
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          captchaToken
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
          recaptchaRef.current?.reset();
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
      recaptchaRef.current?.reset();
      
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h1 className="text-4xl font-bold text-secondary-900 dark:text-white mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-secondary-600 dark:text-secondary-300 mb-8">
            Have questions about our services or need a custom solution? Get in touch with our team.
          </p>
          
          <div className="space-y-6 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-secondary-900 dark:text-white">Email</h3>
                <p className="mt-1 text-secondary-600 dark:text-secondary-300">
                  <a href={`mailto:${siteConfig.company.email}`} className="hover:text-primary-500 transition-colors">
                    {siteConfig.company.email}
                  </a>
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-secondary-900 dark:text-white">Phone</h3>
                <p className="mt-1 text-secondary-600 dark:text-secondary-300">
                  <a href={`tel:${siteConfig.company.phone}`} className="hover:text-primary-500 transition-colors">
                    {siteConfig.company.phone}
                  </a>
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-secondary-900 dark:text-white">Address</h3>
                <p className="mt-1 text-secondary-600 dark:text-secondary-300">
                  {siteConfig.company.address}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <a href={siteConfig.company.social.twitter} className="text-secondary-500 hover:text-primary-500 transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </a>
            <a href={siteConfig.company.social.linkedin} className="text-secondary-500 hover:text-primary-500 transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href={siteConfig.company.social.github} className="text-secondary-500 hover:text-primary-500 transition-colors">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg p-8">
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
              
              {/* Styled reCAPTCHA component */}
              <div className="mt-6">
                <div className="bg-neutral-50 dark:bg-neutral-700 rounded-xl p-3 border border-neutral-200 dark:border-neutral-600 shadow-sm flex justify-center">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LdSPC8rAAAAALSdtGhM_cj4t-HHu2040PI3zGbi'}
                    onChange={handleCaptchaChange}
                    theme="light"
                    className="transform scale-95 origin-center"
                  />
                </div>
                <p className="text-xs text-center text-secondary-500 dark:text-secondary-400 mt-2 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Secured by reCAPTCHA
                </p>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting || !captchaToken}
                  className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${(isSubmitting || !captchaToken) ? 'opacity-75 cursor-not-allowed' : ''}`}
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