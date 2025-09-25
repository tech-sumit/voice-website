"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
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
      className={`sticky top-0 z-50 transition-all duration-300 border-b-2
      ${scrolled 
        ? "bg-accent-100/95 dark:bg-surface-800/95 shadow-lg border-primary-200 dark:border-primary-700" 
        : "bg-accent-50/80 dark:bg-surface-800/80 border-primary-200 dark:border-primary-800"}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-20 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={200}
                height={120}
                className="h-8 w-auto sm:h-10 group-hover:opacity-80 transition-opacity duration-200"
                priority
              />
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.path} 
                className="px-4 py-2 rounded-lg text-bright-600 dark:text-accent-200 hover:bg-primary-100 dark:hover:bg-primary-800/30 hover:text-primary-600 dark:hover:text-primary-300 transition-all duration-200 font-medium border border-transparent hover:border-primary-200 dark:hover:border-primary-700 flex items-center gap-1"
              >
                {item.name}
                {item.hasArrow && (
                  <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                )}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Mobile menu button */}
            <motion.button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-bright-600 dark:text-accent-300 md:hidden hover:bg-primary-100 dark:hover:bg-primary-800/30 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200"
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
          className="md:hidden border-t-2 border-primary-200 dark:border-primary-800"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="pt-4 pb-6 space-y-2 px-4 sm:px-6 bg-accent-50/95 dark:bg-surface-800/95 backdrop-blur-md">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="flex items-center justify-between py-3 px-4 rounded-lg text-bright-600 dark:text-accent-200 hover:bg-primary-100 dark:hover:bg-primary-800/30 hover:text-primary-600 dark:hover:text-primary-300 transition-all duration-200 font-medium border border-transparent hover:border-primary-200 dark:hover:border-primary-700"
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