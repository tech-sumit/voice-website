"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import siteConfig from '@/config/site.json';
import { Button } from '@/components/ui/Button';

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    password: '',
    planId: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectPlan = (planId: string) => {
    setFormData(prev => ({ ...prev, planId }));
    setStep(2);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    console.log('Form submitted:', formData);
    setStep(3);
  };
  
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
            {step === 1 ? 'Choose Your Plan' : step === 2 ? 'Create Your Account' : 'Success!'}
          </h1>
          <p className="text-secondary-600 dark:text-secondary-300">
            {step === 1 
              ? 'Select the plan that best fits your needs' 
              : step === 2 
                ? 'Almost there! Fill in your account details' 
                : 'Your account has been created successfully'}
          </p>
        </div>
        
        {/* Step indicator */}
        <div className="flex items-center justify-center mb-10">
          {[1, 2, 3].map((i) => (
            <React.Fragment key={i}>
              <div 
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${i <= step 
                    ? 'bg-primary-500 text-white'
                    : 'bg-secondary-200 text-secondary-600 dark:bg-secondary-700 dark:text-secondary-300'
                  }
                `}
              >
                {i < step ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : i}
              </div>
              {i < 3 && (
                <div 
                  className={`
                    w-20 h-1 mx-1
                    ${i < step
                      ? 'bg-primary-500'
                      : 'bg-secondary-200 dark:bg-secondary-700'
                    }
                  `}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        
        {/* Step 1: Plan Selection */}
        {step === 1 && (
          <div className="space-y-4">
            {siteConfig.pricing.map((plan) => (
              <div 
                key={plan.name}
                className={`
                  bg-white dark:bg-secondary-800 p-6 rounded-lg border-2 hover:shadow-md transition cursor-pointer
                  ${formData.planId === plan.name 
                    ? 'border-primary-500' 
                    : 'border-secondary-200 dark:border-secondary-700'}
                `}
                onClick={() => handleSelectPlan(plan.name)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-secondary-900 dark:text-white">
                      {plan.name}
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-300">
                      {plan.description}
                    </p>
                  </div>
                  <div className="text-lg font-bold text-secondary-900 dark:text-white">
                    {typeof plan.price === 'number' ? `$${plan.price}/mo` : plan.price}
                  </div>
                </div>
              </div>
            ))}
            
            <p className="text-sm text-secondary-500 dark:text-secondary-400 text-center mt-4">
              All plans come with a 14-day free trial. No credit card required.
            </p>
          </div>
        )}
        
        {/* Step 2: Account Creation */}
        {step === 2 && (
          <div className="bg-white dark:bg-secondary-800 p-8 rounded-lg shadow">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
                  Full Name
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
                  Email Address
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
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
                  Company Name
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
                  Phone Number
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
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-secondary-700 dark:border-secondary-600 dark:text-white"
                />
                <p className="mt-1 text-xs text-secondary-500 dark:text-secondary-400">
                  Password must be at least 8 characters long
                </p>
              </div>
              
              <div className="flex flex-col space-y-4">
                <button
                  type="submit"
                  className="w-full bg-primary-500 text-white py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
                >
                  Create Account
                </button>
                
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full bg-transparent text-secondary-700 dark:text-secondary-300 py-2 rounded-lg font-medium hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
                >
                  Back to Plan Selection
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Step 3: Success */}
        {step === 3 && (
          <div className="bg-white dark:bg-secondary-800 p-8 rounded-lg shadow text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
              Welcome to {siteConfig.name}!
            </h2>
            
            <p className="text-secondary-600 dark:text-secondary-300 mb-8">
              Your account has been created successfully. We&apos;ve sent a confirmation email to <span className="font-medium">{formData.email}</span>.
            </p>
            
            <div className="space-y-4">
              <Button href="/" size="lg" className="w-full">
                Go to Dashboard
              </Button>
              
              <p className="text-sm text-secondary-500 dark:text-secondary-400">
                Need help? <Link href="/contact" className="text-primary-500 hover:underline">Contact support</Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 