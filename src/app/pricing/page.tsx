"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

type Currency = 'INR' | 'USD';

const PRICING_CONFIG = {
  INR: {
    symbol: '₹',
    baseRate: '3',
    channelPrice: '800',
    numberPrice: '600',
    channelUnit: 'per channel/mo',
    numberUnit: 'per Mobile Number/mo',
    disclaimer: '* Base Rate. Tools, Integrations & Memory usage charged separately based on usage.'
  },
  USD: {
    symbol: '$',
    baseRate: '0.05',
    channelPrice: 'NA',
    numberPrice: 'NA',
    channelUnit: 'per channel/mo',
    numberUnit: 'per Mobile Number/mo',
    disclaimer: '* Base Rate. Tools, Integrations & Memory usage charged separately based on usage.'
  }
};

export default function PricingPage() {
  const [currency, setCurrency] = useState<Currency>('USD');

  useEffect(() => {
    // Detect timezone
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timeZone === 'Asia/Kolkata' || timeZone === 'Asia/Calcutta') {
      setCurrency('INR');
    }
  }, []);

  const pricing = PRICING_CONFIG[currency];

  const payAsYouGoFeatures = [
    'No fixed monthly platform fees',
    'Unlimited Agents & Concurrent Calls',
    'Unlimited Campaigns',
    'Bring Your Own Carrier (Twilio / KooKoo)',
    'Full API Access & Integrations',
    'All Languages Included',
    'Real-time Analytics & Call Recording',
    'Memory & Knowledge Base'
  ];

  const addOns = [
    {
      name: 'Channel Expansion',
      price: `${pricing.symbol}${pricing.channelPrice}`,
      unit: pricing.channelUnit,
      desc: 'For PixPoc provided numbers',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      name: 'Additional Mobile Number',
      price: `${pricing.symbol}${pricing.numberPrice}`,
      unit: pricing.numberUnit,
      desc: 'For PixPoc provided numbers',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    },
    {
      name: 'Volume Discounts',
      price: 'Custom',
      unit: 'for high scale',
      desc: 'For volumes > 10,000 mins/month',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
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
            <span className="text-[var(--hw-text-muted)] text-xs font-bold tracking-[0.2em] uppercase">Flexible Consumption</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--hw-text-main)] mb-6 tracking-tight">
            Simple, <span className="text-[#FF5722]">Transparent</span> Pricing
          </h1>
          <p className="text-lg text-[var(--hw-text-muted)] font-medium max-w-2xl mx-auto">
            No complex tiers or hidden fees. Just pay for what you use and scale as you grow.
          </p>
        </div>

        {/* Pay As You Go Main Card */}
        <div className="max-w-4xl mx-auto mb-20 relative z-20">
          <div className="bg-[var(--hw-panel)] rounded-2xl border-[2px] border-[#FF5722] shadow-[0_20px_50px_rgba(255,87,34,0.15)] flex flex-col md:flex-row p-8 md:p-12 relative overflow-hidden">

            {/* Recommended Badge */}
            <div className="absolute top-0 right-0 p-4">
              <span className="bg-[#FF5722] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                Pay As You Go
              </span>
            </div>

            {/* Screw details */}
            <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-[var(--hw-border)] shadow-inner flex items-center justify-center"><div className="w-1.5 h-px bg-[#A09890] rotate-45"></div></div>
            <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-[var(--hw-border)] shadow-inner flex items-center justify-center"><div className="w-1.5 h-px bg-[#A09890] rotate-45"></div></div>
            <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-[var(--hw-border)] shadow-inner flex items-center justify-center"><div className="w-1.5 h-px bg-[#A09890] rotate-45"></div></div>

            {/* Left: Pricing & CTA */}
            <div className="flex-1 flex flex-col justify-center items-start md:border-r border-[var(--hw-border)] md:pr-12 md:mr-12 mb-8 md:mb-0">
              <h3 className="text-2xl font-bold text-[var(--hw-text-main)] tracking-wider uppercase mb-2">
                Standard Rate
              </h3>
              <p className="text-sm text-[var(--hw-text-muted)] mb-8">
                For inbound and outbound calls
              </p>

              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl text-[var(--hw-text-muted)]">{pricing.symbol}</span>
                <span className="text-7xl font-mono font-bold text-[#FF5722] tracking-tighter">
                  {pricing.baseRate}<span className="text-2xl align-top">*</span>
                </span>
                <span className="text-xl text-[var(--hw-text-muted)] font-medium">/ min</span>
              </div>
              <p className="text-xs text-[var(--hw-text-muted)] mb-8 italic opacity-80 leading-relaxed">
                {pricing.disclaimer}
              </p>

              <Link href="https://app.pixpoc.ai/" className="w-full">
                <button className="w-full py-4 px-6 rounded-xl text-base font-bold uppercase tracking-wider transition-all bg-[#FF5722] text-white shadow-[0_4px_0_#B33016] hover:bg-[#FF6D3F] hover:scale-[1.02] active:shadow-none active:translate-y-[4px]">
                  Start Building Now
                </button>
              </Link>
              <p className="text-xs text-[var(--hw-text-muted)] mt-4 text-center w-full">
                No credit card required
              </p>
            </div>

            {/* Right: Features */}
            <div className="flex-1 flex flex-col justify-center">
              <h4 className="text-sm font-bold text-[var(--hw-text-main)] uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1A5C54]"></span>
                Everything Included
              </h4>
              <ul className="space-y-4">
                {payAsYouGoFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-[#E8F3F1] flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-[#1A5C54]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-[var(--hw-text-main)] font-medium text-sm sm:text-base">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Add-ons Section */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-[1px] flex-1 bg-[var(--hw-border)]"></div>
            <h2 className="text-xl font-bold text-[var(--hw-text-main)] uppercase tracking-widest">Expansion Modules</h2>
            <div className="h-[1px] flex-1 bg-[var(--hw-border)]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {addOns.map((addon, i) => (
              <div key={i} className="bg-[var(--hw-panel)] p-6 rounded-lg border border-[var(--hw-border)] flex flex-col items-center text-center hover:border-[#FF5722]/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg">
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

          <div className="mt-12 bg-[var(--hw-chassis)] border border-[var(--hw-border)] p-6 rounded-lg text-center shadow-inner">
            <p className="text-[var(--hw-text-muted)] text-sm font-mono">
              NEED CUSTOM CONFIGURATION OR VOLUME DISCOUNTS? <Link href="/contact" className="text-[#FF5722] underline hover:text-[#FF6D3F] font-bold">CONTACT ENGINEERING</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
