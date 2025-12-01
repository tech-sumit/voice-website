"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";

export default function ThemeToggle({ isFixed = true, className = "" }: { isFixed?: boolean, className?: string }) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <motion.button 
      onClick={toggleTheme}
      className={`${isFixed ? 'dark-toggle' : 'p-2 rounded-md bg-[var(--hw-border)] text-[var(--hw-text-main)] shadow-sm hover:bg-[var(--hw-chassis)] border border-[var(--hw-border)] transition-all'} ${className}`}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDarkMode ? 180 : 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        className="relative"
      >
        {isDarkMode ? (
          <SunIcon className="h-6 w-6 text-yellow-300" />
        ) : (
          <MoonIcon className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
        )}
      </motion.div>
    </motion.button>
  );
}

