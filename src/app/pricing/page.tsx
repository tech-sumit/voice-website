"use client";

import React from 'react';
import Link from 'next/link';

export default function PricingPage() {
  const plans = [
    {
      id: 'free',
      name: 'PROTOTYPE',
      subtitle: 'For Development & Testing',
      price: '0',
      currency: '₹',
      period: '/mo',
      features: [
        'Web Access',
        '5 Minutes / Month',
        'Community Pool (DID & Channels)',
        'No Dedicated Calling Capacity',
        'Limited Languages',
        'No API Support',
        'Community Support'
      ],
      cta: 'Start Building',
      href: '/contact',
      highlight: false,
      color: '#78909C' // Blue Grey
    },
    {
      id: 'starter',
      name: 'PRODUCTION',
      subtitle: 'For Small Business',
      price: '2,500',
      currency: '₹',
      period: '/mo',
      features: [
        'Web Access',
        '300 Minutes / Month Included',
        '1 Channel (Parallel Call)',
        '1 Mobile Number Included',
        'All Languages Supported',
        'Incoming / Outgoing Supported',
        'Unlimited Agents',
        'Unlimited Campaigns',
        'Limited Integrations & Tools',
        'Limited API Access',
        'Support on Email'
      ],
      cta: 'Deploy Unit',
      href: '/contact?plan=starter',
      highlight: true,
      color: '#FF5722' // Orange
    },
    {
      id: 'enterprise',
      name: 'MAINFRAME',
      subtitle: 'For Scaling Operations',
      price: 'CUSTOM',
      currency: '',
      period: '',
      features: [
        'Web Access',
        'Custom Volume / Month',
        'Unlimited Channels (Scaled)',
        'Dedicated Mobile Number Inventory',
        'All Languages Supported',
        'Incoming / Outgoing Supported',
        'Unlimited Agents',
        'Unlimited Campaigns',
        'Full Integrations & Tools',
        'Full API Access',
        'Dedicated Account Manager'
      ],
      cta: 'Contact Command',
      href: '/contact?plan=enterprise',
      highlight: false,
      color: '#26A69A' // Teal
    }
  ];

  const addOns = [
    {
      name: 'Channel Expansion',
      price: '₹800',
      unit: 'per channel/mo',
      desc: 'Add parallel calling capacity',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      name: 'Additional DID',
      price: '₹600',
      unit: 'per DID/mo',
      desc: 'Direct Inward Dialing numbers',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    },
    {
      name: 'Overage Minutes',
      price: '₹3',
      unit: 'per minute',
      desc: 'Pay-as-you-go calling',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--hw-chassis)] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-noise mix-blend-overlay"></div>
      
      {/* Header Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-[var(--hw-border)] px-4 py-1 rounded border border-[var(--hw-border)] mb-6 shadow-sm">
             <span className="text-[var(--hw-text-muted)] text-xs font-bold tracking-[0.2em] uppercase">Procurement Catalog</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--hw-text-main)] mb-6 tracking-tight">
            Select Your <span className="text-[#FF5722]">Configuration</span>
          </h1>
          <p className="text-lg text-[var(--hw-text-muted)] font-medium max-w-2xl mx-auto">
            Choose the optimal processing unit for your operational needs. 
            Scale capacity with modular upgrades as required.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-20">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative flex flex-col ${plan.highlight 
                ? 'z-20 md:-mt-4 md:-mb-4' 
                : 'z-10'}`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 inset-x-0 flex justify-center">
                  <span className="bg-[#FF5722] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                    Recommended
                  </span>
                </div>
              )}
              
              <div className={`flex-1 bg-[var(--hw-panel)] rounded-xl border-[2px] ${plan.highlight ? 'border-[#FF5722] shadow-[0_0_30px_rgba(255,87,34,0.15)]' : 'border-[var(--hw-border)]'} flex flex-col p-6 sm:p-8 relative overflow-hidden transition-transform hover:-translate-y-1 duration-300`}>
                {/* Screw details */}
                <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-[var(--hw-border)] shadow-inner"></div>
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[var(--hw-border)] shadow-inner"></div>
                <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-[var(--hw-border)] shadow-inner"></div>
                <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-[var(--hw-border)] shadow-inner"></div>

                <h3 className="text-lg font-bold text-[var(--hw-text-main)] tracking-wider uppercase mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: plan.color }}></span>
                  {plan.name}
                </h3>
                <p className="text-xs text-[var(--hw-text-muted)] uppercase tracking-wide mb-6 h-4">
                  {plan.subtitle}
                </p>

                {/* Price Display */}
                <div className="bg-[var(--hw-chassis)] border border-[var(--hw-border)] rounded-lg p-4 mb-8 text-center shadow-inner">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-xl text-[var(--hw-text-muted)]">{plan.currency}</span>
                    <span className={`text-4xl font-mono font-bold ${plan.highlight ? 'text-[#FF5722]' : 'text-[var(--hw-text-main)]'}`}>
                      {plan.price}
                    </span>
                    <span className="text-xs text-[var(--hw-text-muted)] uppercase">{plan.period}</span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[var(--hw-text-muted)]">
                      <svg className={`w-5 h-5 flex-shrink-0 ${plan.highlight ? 'text-[#FF5722]' : 'text-[var(--hw-text-muted)]'}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="font-mono text-xs sm:text-sm pt-0.5">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link href={plan.href} className="block mt-auto">
                  <button 
                    className={`w-full py-3 px-4 rounded text-sm font-bold uppercase tracking-wider transition-all
                      ${plan.highlight 
                        ? 'bg-[#FF5722] text-white shadow-[0_4px_0_#B33016] hover:bg-[#FF6D3F] active:shadow-none active:translate-y-[4px]' 
                        : 'bg-[var(--hw-chassis)] text-[var(--hw-text-main)] border border-[var(--hw-border)] hover:border-[#FF5722] hover:text-[#FF5722]'
                      }`}
                  >
                    {plan.cta}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] flex-1 bg-[var(--hw-border)]"></div>
            <h2 className="text-xl font-bold text-[var(--hw-text-main)] uppercase tracking-widest">Expansion Modules</h2>
            <div className="h-[1px] flex-1 bg-[var(--hw-border)]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {addOns.map((addon, i) => (
              <div key={i} className="bg-[var(--hw-panel)] p-6 rounded-lg border border-[var(--hw-border)] flex flex-col items-center text-center hover:border-[#FF5722]/50 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-[var(--hw-chassis)] flex items-center justify-center text-[var(--hw-text-muted)] mb-4 group-hover:text-[#FF5722] transition-colors border border-[var(--hw-border)]">
                  {addon.icon}
                </div>
                <h4 className="text-[var(--hw-text-main)] font-bold uppercase tracking-wide text-sm mb-1">{addon.name}</h4>
                <div className="text-[#FF5722] font-mono font-bold text-xl mb-1">{addon.price}</div>
                <div className="text-[var(--hw-text-muted)] text-[10px] uppercase tracking-wider mb-3">{addon.unit}</div>
                <p className="text-[var(--hw-text-muted)] text-xs font-medium border-t border-[var(--hw-border)] pt-3 w-full">
                  {addon.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-[var(--hw-chassis)] border border-[var(--hw-border)] p-6 rounded-lg text-center">
            <p className="text-[var(--hw-text-muted)] text-sm font-mono">
              NEED CUSTOM CONFIGURATION? <Link href="/contact" className="text-[#FF5722] underline hover:text-[#FF6D3F]">CONTACT ENGINEERING</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
