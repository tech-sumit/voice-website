"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type ThemeProviderProps = {
  children: ReactNode;
};

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedPreference = localStorage.getItem('theme');
    const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = (isDark: boolean) => {
      setIsDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    };

    // Initial application
    if (storedPreference) {
      applyTheme(storedPreference === 'dark');
    } else {
      applyTheme(systemDarkMode.matches);
    }

    // Listen for system changes
    const listener = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches);
      }
    };

    systemDarkMode.addEventListener('change', listener);
    return () => systemDarkMode.removeEventListener('change', listener);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 