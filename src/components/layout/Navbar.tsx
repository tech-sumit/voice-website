"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import siteConfig from "@/config/site.json";
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

  // Filter out pricing from navigation
  const filteredNavItems = siteConfig.nav.filter(item => item.path !== '/pricing');

  return (
    <nav 
      className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 
      ${scrolled 
        ? "bg-surface-50/90 dark:bg-surface-900/95 shadow-md" 
        : "bg-transparent"}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-20 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-gradient-primary">
                {siteConfig.name}
              </span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex space-x-1 lg:space-x-2">
            {filteredNavItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.path} 
                className="px-3 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-surface-200/50 dark:hover:bg-surface-800/50 hover:text-primary-600 dark:hover:text-primary-400 transition-all"
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link
              href={siteConfig.cta.secondary.url}
              className="hidden md:inline-flex items-center px-3 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-surface-200/50 dark:hover:bg-surface-800/50 hover:text-accent-600 dark:hover:text-accent-400 transition-all"
            >
              {siteConfig.cta.secondary.text}
            </Link>
            
            {/* Mobile menu button */}
            <motion.button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-neutral-500 md:hidden hover:bg-surface-200/70 dark:hover:bg-surface-800/70 hover:text-primary transition"
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
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div 
          className="md:hidden border-t border-surface-200 dark:border-surface-800"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="pt-2 pb-4 space-y-1 px-4 sm:px-6 bg-surface-50/95 dark:bg-surface-900/95 backdrop-blur-md">
            {filteredNavItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="block py-3 px-3 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-surface-200/70 dark:hover:bg-surface-800/70 hover:text-primary-600 dark:hover:text-primary-400 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href={siteConfig.cta.secondary.url}
              className="block py-3 px-3 mt-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-surface-200/70 dark:hover:bg-surface-800/70 hover:text-accent-600 dark:hover:text-accent-400 transition-all border border-surface-200 dark:border-surface-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              {siteConfig.cta.secondary.text}
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
} 