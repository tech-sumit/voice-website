"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Logo from "@/components/ui/Logo";
import { motion } from "framer-motion";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Updated navigation items with relevant section links
  const navItems = [
    { name: "Features", path: "#features", isAnchor: true, hasArrow: false },
    { name: "How It Works", path: "#how-it-works", isAnchor: true, hasArrow: false },
    { name: "Agents", path: "#agents", isAnchor: true, hasArrow: false },
    { name: "FAQ", path: "#faq", isAnchor: true, hasArrow: false },
    { name: "Contact", path: "/contact", isAnchor: false, hasArrow: true },
    { name: "Careers", path: "/careers", isAnchor: false, hasArrow: true },
  ];

    return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 border-b-[4px] border-[var(--hw-border)]
      ${scrolled 
        ? "bg-[var(--hw-border)] shadow-md py-2" 
        : "bg-[var(--hw-chassis)] py-4"}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Brand Label */}
          <div className="flex-shrink-0 relative group">
            <div className="absolute -inset-2 bg-white/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Link href="/" className="flex items-center relative z-10">
              <Logo className="h-10 w-auto text-[var(--hw-text-main)] transition-transform duration-300 group-hover:scale-105" />
            </Link>
          </div>
          
          {/* Desktop Control Array */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3 bg-[var(--hw-border)] p-1 rounded-lg shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1)]">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.isAnchor ? `/${item.path}` : item.path}
                className={`px-4 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-1
                  ${item.name === 'Contact' || item.name === 'Careers' 
                    ? 'bg-[var(--hw-text-main)] text-[var(--hw-panel)] shadow-[0_2px_0_rgba(0,0,0,0.2)] hover:bg-[#FF5722] hover:shadow-none hover:translate-y-[2px]' 
                    : 'text-[var(--hw-text-muted)] hover:text-[var(--hw-text-main)] hover:bg-[var(--hw-chassis)] hover:shadow-[0_1px_2px_rgba(0,0,0,0.1)] active:translate-y-[1px] active:shadow-none'
                  }`}
              >
                {item.name}
                {item.hasArrow && (
                  <ArrowTopRightOnSquareIcon className="w-3 h-3 opacity-70" />
                )}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4 md:hidden">
            {/* Mobile Toggle Switch */}
            <motion.button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md bg-[var(--hw-border)] text-[var(--hw-text-main)] shadow-[2px_2px_0_var(--hw-border)] active:shadow-none active:translate-y-[2px] border border-[var(--hw-border)]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Mobile Control Panel */}
      {mobileMenuOpen && (
        <motion.div 
          className="md:hidden bg-[var(--hw-chassis)] border-b-4 border-[var(--hw-border)]"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.isAnchor ? `/${item.path}` : item.path}
                className="flex items-center justify-between py-3 px-4 rounded-lg bg-[var(--hw-panel)] border border-[var(--hw-border)] text-[var(--hw-text-main)] font-bold shadow-sm active:shadow-inner active:bg-[var(--hw-chassis)] transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{item.name}</span>
                {item.hasArrow && (
                  <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                )}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}