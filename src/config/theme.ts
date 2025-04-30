export type ThemeConfig = {
  colors: {
    primary: ColorConfig;
    secondary: ColorConfig;
    accent: ColorConfig;
    bright: ColorConfig;
    neutral: ColorConfig;
    success: ColorConfig;
    warning: ColorConfig;
    error: ColorConfig;
    surface: ColorConfig;
  };
  fonts: {
    sans: string[];
    mono: string[];
  };
  darkMode: {
    backgroundColor: string;
    textColor: string;
  };
  lightMode: {
    backgroundColor: string;
    textColor: string;
  };
  animations: {
    [key: string]: string;
  };
};

type ColorConfig = {
  DEFAULT: string;
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

const theme: ThemeConfig = {
  colors: {
    // Modern blue inspired by Synthflow and Bland.ai - professional, innovative
    primary: {
      DEFAULT: "#2563EB",
      50: "#EFF6FF",
      100: "#DBEAFE",
      200: "#BFDBFE",
      300: "#93C5FD",
      400: "#60A5FA",
      500: "#2563EB", // Modern blue
      600: "#1D4ED8",
      700: "#1E40AF",
      800: "#1E3A8A",
      900: "#172554",
    },
    // Vibrant teal/green - elegant, fresh from Bland.ai
    secondary: {
      DEFAULT: "#0EA5E9",
      50: "#F0F9FF",
      100: "#E0F2FE",
      200: "#BAE6FD",
      300: "#7DD3FC",
      400: "#38BDF8",
      500: "#0EA5E9", // Sky blue
      600: "#0284C7",
      700: "#0369A1",
      800: "#075985",
      900: "#0C4A6E",
    },
    // Soft purple/violet from Synthflow - creative, premium
    accent: {
      DEFAULT: "#7C3AED",
      50: "#F5F3FF",
      100: "#EDE9FE",
      200: "#DDD6FE",
      300: "#C4B5FD",
      400: "#A78BFA",
      500: "#7C3AED", // Vibrant purple
      600: "#6D28D9",
      700: "#5B21B6",
      800: "#4C1D95",
      900: "#2E1065",
    },
    // Modern orange/red - energy, call-to-action
    bright: {
      DEFAULT: "#F97316",
      50: "#FFF7ED",
      100: "#FFEDD5",
      200: "#FED7AA",
      300: "#FDBA74",
      400: "#FB923C",
      500: "#F97316", // Vibrant orange
      600: "#EA580C",
      700: "#C2410C",
      800: "#9A3412",
      900: "#7C2D12",
    },
    // Refined neutral palette - sophisticated, balanced
    neutral: {
      DEFAULT: "#64748B",
      50: "#F8FAFC",
      100: "#F1F5F9",
      200: "#E2E8F0",
      300: "#CBD5E1",
      400: "#94A3B8",
      500: "#64748B", // Slate
      600: "#475569",
      700: "#334155",
      800: "#1E293B",
      900: "#0F172A",
    },
    // Success green - positive feedback
    success: {
      DEFAULT: "#10B981",
      50: "#ECFDF5",
      100: "#D1FAE5",
      200: "#A7F3D0",
      300: "#6EE7B7",
      400: "#34D399",
      500: "#10B981", // Emerald green
      600: "#059669",
      700: "#047857",
      800: "#065F46",
      900: "#064E3B",
    },
    // Warning yellow - caution, attention
    warning: {
      DEFAULT: "#F59E0B",
      50: "#FFFBEB",
      100: "#FEF3C7",
      200: "#FDE68A",
      300: "#FCD34D",
      400: "#FBBF24",
      500: "#F59E0B", // Amber
      600: "#D97706",
      700: "#B45309",
      800: "#92400E",
      900: "#78350F",
    },
    // Error red - alerts, critical actions
    error: {
      DEFAULT: "#EF4444",
      50: "#FEF2F2",
      100: "#FEE2E2",
      200: "#FECACA",
      300: "#FCA5A5",
      400: "#F87171",
      500: "#EF4444", // Modern red
      600: "#DC2626",
      700: "#B91C1C",
      800: "#991B1B",
      900: "#7F1D1D",
    },
    // Surface colors - clean, minimal
    surface: {
      DEFAULT: "#FFFFFF",
      50: "#FFFFFF",
      100: "#FAFAFA", // Slightly off-white for subtle cards
      200: "#F4F4F5", // Very light gray for hover states
      300: "#E4E4E7",
      400: "#D4D4D8",
      500: "#A1A1AA",
      600: "#71717A",
      700: "#52525B",
      800: "#27272A", // Dark gray for dark mode elements
      900: "#18181B", // Near black for dark mode background
    },
  },
  fonts: {
    sans: ["var(--font-geist-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial"],
    mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New"],
  },
  darkMode: {
    backgroundColor: "#18181B", // Zinc 900 for dark mode background
    textColor: "#F4F4F5", // Zinc 100 for dark mode text
  },
  lightMode: {
    backgroundColor: "#FFFFFF", // Clean white
    textColor: "#0F172A", // Slate 900 for better contrast than pure black
  },
  animations: {
    "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    "bounce-slow": "bounce 3s infinite",
    "spin-slow": "spin 6s linear infinite",
    "fade-in": "fadeIn 0.5s ease-in",
    "slide-up": "slideUp 0.3s ease-out",
  },
};

export default theme; 