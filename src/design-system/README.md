# Retro Hardware Design System

This directory contains the core files for the "Retro Hardware" theme. To use this theme in another Next.js + Tailwind CSS project:

## 1. Install Dependencies

Ensure you have the required packages:

```bash
npm install framer-motion @heroicons/react
```

## 2. Setup Tailwind CSS

1. Copy `tailwind.preset.js` and `tokens.ts` to your project (e.g., in `src/design-system/` or root).
2. Update your `tailwind.config.js` to use the preset:

```js
// tailwind.config.js
module.exports = {
  presets: [
    require('./src/design-system/tailwind.preset.js') // Adjust path
  ],
  content: [
    // ... your content paths
  ],
  // ...
};
```

## 3. Setup Global CSS

Copy the contents of `base.css` into your global CSS file (e.g., `src/app/globals.css`). This file contains the CSS variables for the theme and essential utility classes.

## 4. Setup Theme Provider

1. Copy the `components` folder to your project.
2. Wrap your root layout with `ThemeProvider`:

```tsx
// src/app/layout.tsx
import { ThemeProvider } from '@/design-system/components/ThemeProvider'; // Adjust path
import ThemeToggle from '@/design-system/components/ThemeToggle'; // Adjust path
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          {children}
          <ThemeToggle /> {/* Optional floating toggle */}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## 5. Using the Theme

You can now use the theme classes in your components:

- **Colors**: `bg-primary`, `text-accent`, `border-border`
- **Hardware Theme Variables**: `bg-[var(--hw-chassis)]`, `text-[var(--hw-text-main)]`, etc.
- **Utilities**: `bg-noise`, `crt-overlay`

Enjoy the retro vibes!

