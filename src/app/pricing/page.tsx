"use client";

import React from 'react';
import siteConfig from '@/config/site.json';

export default function PricingPage() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-4 text-secondary-900 dark:text-white">
        Pricing Plans
      </h1>
      <p className="text-xl text-center text-secondary-600 dark:text-secondary-300 mb-12 max-w-3xl mx-auto">
        Choose the perfect plan for your business needs
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {siteConfig.pricing.map((plan, index) => (
          <div 
            key={plan.name}
            className={`
              bg-white dark:bg-secondary-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow 
              ${plan.featured ? 'border-2 border-primary-500 relative transform hover:-translate-y-1 transition-transform' : ''}
            `}
          >
            {plan.featured && (
              <div className="absolute top-0 inset-x-0 bg-primary-500 text-white text-center py-1 text-sm font-medium">
                Most Popular
              </div>
            )}
            <div className={`p-6 ${plan.featured ? 'pt-8' : ''}`}>
              <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-2">
                {plan.name}
              </h3>
              <p className="text-secondary-600 dark:text-secondary-300 mb-4">
                {plan.description}
              </p>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-extrabold text-secondary-900 dark:text-white">
                  {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                </span>
                {typeof plan.price === 'number' && (
                  <span className="ml-1 text-secondary-600 dark:text-secondary-300">/month</span>
                )}
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-2 text-secondary-600 dark:text-secondary-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                className={`
                  w-full py-3 rounded-lg font-medium transition-colors 
                  ${plan.featured 
                    ? 'bg-primary-500 text-white hover:bg-primary-600' 
                    : 'bg-secondary-100 text-secondary-900 hover:bg-secondary-200 dark:bg-secondary-700 dark:text-white dark:hover:bg-secondary-600'}
                `}
              >
                {index === 2 ? 'Contact Sales' : 'Get Started'}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 bg-primary-50 dark:bg-secondary-800 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
          Need a custom solution?
        </h2>
        <p className="text-lg text-secondary-600 dark:text-secondary-300 mb-6 max-w-2xl mx-auto">
          Contact our sales team for custom pricing options tailored to your specific requirements
        </p>
        <button className="bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors">
          Contact Sales
        </button>
      </div>
    </div>
  );
} 