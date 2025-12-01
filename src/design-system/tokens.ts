export const tokens = {
  colors: {
    // Dark Teal - Primary brand color inspired by retro-modern aesthetic
    primary: {
      DEFAULT: "#1A5C54", // Rich teal - main
      50: "#E8F3F1", // Very light teal
      100: "#D1E7E3", // Light teal
      200: "#A3CFC7", // Medium light teal
      300: "#75B7AB", // Medium teal
      400: "#479F8F", // Medium dark teal
      500: "#1A5C54", // Rich teal - main
      600: "#154A43", // Darker teal
      700: "#103732", // Dark teal
      800: "#0B2521", // Very dark teal
      900: "#061211", // Darkest teal
    },
    // Medium Teal - Secondary color for depth
    secondary: {
      DEFAULT: "#2A7A6F", // Medium teal - main
      50: "#EBF5F3", // Very light teal
      100: "#D7EBE7", // Light teal
      200: "#AFD7CF", // Medium light teal
      300: "#87C3B7", // Medium teal
      400: "#5FAF9F", // Medium dark teal
      500: "#2A7A6F", // Medium teal - main
      600: "#226259", // Darker teal
      700: "#194943", // Dark teal
      800: "#11312C", // Very dark teal
      900: "#081816", // Darkest teal
    },
    // Warm Cream - Accent color for breathing room
    accent: {
      DEFAULT: "#F5F1E8", // Warm cream - main
      50: "#FEFDFB", // Lightest cream
      100: "#F5F1E8", // Warm cream - main
      200: "#EBE3D5", // Light cream
      300: "#E1D5C2", // Medium light cream
      400: "#D7C7AF", // Medium cream
      500: "#CDB99C", // Medium dark cream
      600: "#C3AB89", // Dark cream
      700: "#B99D76", // Darker cream
      800: "#AF8F63", // Very dark cream
      900: "#A58150", // Darkest cream
    },
    // Bright Orange - For energy and calls-to-action
    bright: {
      DEFAULT: "#FF5722", // Vibrant orange - main
      50: "#FFF3F0", // Very light orange
      100: "#FFE7E1", // Light orange
      200: "#FFCFC3", // Medium light orange
      300: "#FFB7A5", // Medium orange
      400: "#FF9F87", // Medium dark orange
      500: "#FF5722", // Vibrant orange - main
      600: "#E64A1E", // Darker orange
      700: "#CC3D1A", // Dark orange
      800: "#B33016", // Very dark orange
      900: "#992312", // Darkest orange
    },
    // Neutral palette based on warm tones
    neutral: {
      DEFAULT: "#3D3935", // Warm dark gray for text
      50: "#F9F8F7", // Very light warm gray
      100: "#F3F1EF", // Light warm gray
      200: "#E7E3DF", // Medium light warm gray
      300: "#DBD5CF", // Medium warm gray
      400: "#CFC7BF", // Medium dark warm gray
      500: "#A09890", // Gray
      600: "#6D6560", // Dark gray
      700: "#3D3935", // Very dark warm gray - main
      800: "#2A2622", // Darkest warm gray
      900: "#171410", // Deepest warm gray
    },
    // Success - using teal
    success: {
      DEFAULT: "#1A5C54", // Teal for success
      50: "#E8F3F1", // Very light teal
      100: "#D1E7E3", // Light teal
      200: "#A3CFC7", // Medium light teal
      300: "#75B7AB", // Medium teal
      400: "#479F8F", // Medium dark teal
      500: "#1A5C54", // Rich teal - main
      600: "#154A43", // Darker teal
      700: "#103732", // Dark teal
      800: "#0B2521", // Very dark teal
      900: "#061211", // Darkest teal
    },
    // Warning - orange tone
    warning: {
      DEFAULT: "#FF9800", // Warm orange
      50: "#FFF8F0", // Very light orange
      100: "#FFF1E1", // Light orange
      200: "#FFE3C3", // Medium light orange
      300: "#FFD5A5", // Medium orange
      400: "#FFC787", // Medium dark orange
      500: "#FF9800", // Warm orange - main
      600: "#E68900", // Darker orange
      700: "#CC7A00", // Dark orange
      800: "#B36B00", // Very dark orange
      900: "#995C00", // Darkest orange
    },
    // Error - muted red tone that fits the palette
    error: {
      DEFAULT: "#D84315", // Warm red-orange
      50: "#FDF4F2", // Very light red
      100: "#FAE9E5", // Light red
      200: "#F5D3CB", // Medium light red
      300: "#F0BDB1", // Medium red
      400: "#EBA797", // Medium dark red
      500: "#D84315", // Warm red-orange - main
      600: "#C33C13", // Dark red
      700: "#AE3511", // Darker red
      800: "#992E0F", // Very dark red
      900: "#84270D", // Darkest red
    },
    // Surface - warm cream background
    surface: {
      DEFAULT: "#F5F1E8", // Warm cream
      50: "#FEFDFB", // Lightest cream
      100: "#F5F1E8", // Warm cream - main
      200: "#EBE3D5", // Light cream
      300: "#E1D5C2", // Medium light cream
      400: "#D7C7AF", // Medium cream
      500: "#CDB99C", // Medium dark cream
      600: "#C3AB89", // Dark cream
      700: "#B99D76", // Darker cream
      800: "#1A5C54", // Dark teal for dark mode
      900: "#0F3A34", // Darker teal for dark mode background
    },
  },
  fonts: {
    sans: ["var(--font-geist-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial"],
    mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New"],
  },
  animations: {
    "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    "bounce-slow": "bounce 3s infinite",
    "spin-slow": "spin 6s linear infinite",
    "fade-in": "fadeIn 0.5s ease-in",
    "slide-up": "slideUp 0.3s ease-out",
  },
};

