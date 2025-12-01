/** @type {import('tailwindcss').Config} */
import { tokens } from './tokens';

export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: tokens.colors,
      fontFamily: tokens.fonts,
      animation: tokens.animations,
      backgroundColor: {
        'surface-1': 'var(--surface-1)',
        'surface-2': 'var(--surface-2)',
        'surface-3': 'var(--surface-3)',
      },
      textColor: {
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        'text-disabled': 'var(--text-disabled)',
      },
      borderColor: {
        'border': 'var(--border)',
        'border-hover': 'var(--border-hover)',
      },
    },
  },
  plugins: [],
};

