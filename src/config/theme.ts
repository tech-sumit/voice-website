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
    // Forest Green - Primary brand color from new Color Hunt palette
    // https://colorhunt.co/palette/edf1d69dc08b60996640513b
    primary: {
      DEFAULT: "#609966", // Forest green - main
      50: "#F0F4F0", // Very light forest
      100: "#E1E9E1", // Light forest
      200: "#C3D3C3", // Medium light forest
      300: "#A5BDA5", // Medium forest
      400: "#87A787", // Medium dark forest
      500: "#609966", // Color Hunt forest green - main
      600: "#4D7A52", // Darker forest
      700: "#3A5B3E", // Dark forest
      800: "#273C2A", // Very dark forest
      900: "#141D16", // Darkest forest
    },
    // Sage Green - Secondary color from new Color Hunt palette
    secondary: {
      DEFAULT: "#9DC08B", // Color Hunt sage green - main
      50: "#F4F7F2", // Very light sage
      100: "#E9EFE5", // Light sage
      200: "#D3DFCB", // Medium light sage
      300: "#BDCFB1", // Medium sage
      400: "#A7BF97", // Medium dark sage
      500: "#9DC08B", // Color Hunt sage green - main
      600: "#7DA06F", // Darker sage
      700: "#5D8053", // Dark sage
      800: "#3D6037", // Very dark sage
      900: "#1D401B", // Darkest sage
    },
    // Light Cream - Accent color from new Color Hunt palette
    accent: {
      DEFAULT: "#EDF1D6", // Color Hunt light cream - main
      50: "#F8FAF4", // Lightest cream
      100: "#EDF1D6", // Color Hunt light cream - main
      200: "#E3E7C6", // Light cream
      300: "#D9DDB6", // Medium light cream
      400: "#CFD3A6", // Medium cream
      500: "#C5C996", // Medium dark cream
      600: "#BBBF86", // Dark cream
      700: "#B1B576", // Darker cream
      800: "#A7AB66", // Very dark cream
      900: "#9DA156", // Darkest cream
    },
    // Dark Forest Green - Text and strong elements
    bright: {
      DEFAULT: "#40513B", // Dark forest green
      50: "#F2F4F1", // Very light forest
      100: "#E5E9E3", // Light forest
      200: "#CBD3C7", // Medium light forest
      300: "#B1BDAB", // Medium forest
      400: "#97A78F", // Medium dark forest
      500: "#40513B", // Dark forest green - main
      600: "#33412F", // Darker forest
      700: "#263123", // Very dark forest
      800: "#192117", // Darkest forest
      900: "#0C110B", // Deepest forest
    },
    // Neutral palette based on forest green tones
    neutral: {
      DEFAULT: "#40513B", // Dark forest for text
      50: "#F2F4F1", // Very light forest
      100: "#E5E9E3", // Light forest
      200: "#CBD3C7", // Medium light forest
      300: "#B1BDAB", // Medium forest
      400: "#97A78F", // Medium dark forest
      500: "#40513B", // Dark forest - main
      600: "#33412F", // Darker forest
      700: "#263123", // Very dark forest
      800: "#192117", // Darkest forest
      900: "#0C110B", // Deepest forest
    },
    // Success - using forest green
    success: {
      DEFAULT: "#609966", // Forest green for success
      50: "#F0F4F0", // Very light forest
      100: "#E1E9E1", // Light forest
      200: "#C3D3C3", // Medium light forest
      300: "#A5BDA5", // Medium forest
      400: "#87A787", // Medium dark forest
      500: "#609966", // Color Hunt forest green - main
      600: "#4D7A52", // Darker forest
      700: "#3A5B3E", // Dark forest
      800: "#273C2A", // Very dark forest
      900: "#141D16", // Darkest forest
    },
    // Warning - warm earth tone
    warning: {
      DEFAULT: "#B8860B", // Dark goldenrod
      50: "#FDF9F0", // Very light goldenrod
      100: "#FBF3E1", // Light goldenrod
      200: "#F7E7C3", // Medium light goldenrod
      300: "#F3DBA5", // Medium goldenrod
      400: "#EFCF87", // Medium dark goldenrod
      500: "#B8860B", // Dark goldenrod - main
      600: "#966B09", // Darker goldenrod
      700: "#745007", // Very dark goldenrod
      800: "#523505", // Darkest goldenrod
      900: "#301A03", // Deepest goldenrod
    },
    // Error - muted red tone
    error: {
      DEFAULT: "#B85450", // Muted red
      50: "#FDF5F5", // Very light red
      100: "#FAEAEA", // Light red
      200: "#F5D5D5", // Medium light red
      300: "#F0C0C0", // Medium red
      400: "#E5ABAB", // Medium dark red
      500: "#B85450", // Muted red - main
      600: "#A64B47", // Dark red
      700: "#94423E", // Darker red
      800: "#823935", // Very dark red
      900: "#70302C", // Darkest red
    },
    // Surface - light cream background
    surface: {
      DEFAULT: "#EDF1D6", // Color Hunt light cream
      50: "#F8FAF4", // Lightest cream
      100: "#EDF1D6", // Color Hunt light cream - main
      200: "#E3E7C6", // Light cream
      300: "#D9DDB6", // Medium light cream
      400: "#CFD3A6", // Medium cream
      500: "#C5C996", // Medium dark cream
      600: "#BBBF86", // Dark cream
      700: "#B1B576", // Darker cream
      800: "#40513B", // Dark forest for dark mode
      900: "#2D3A2A", // Darker forest for dark mode background
    },
  },
  fonts: {
    sans: ["var(--font-geist-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial"],
    mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New"],
  },
  darkMode: {
    backgroundColor: "#2D3A2A", // Dark forest for dark mode background
    textColor: "#EDF1D6", // Light cream for dark mode text
  },
  lightMode: {
    backgroundColor: "#EDF1D6", // Color Hunt light cream background
    textColor: "#40513B", // Dark forest for text - excellent contrast
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