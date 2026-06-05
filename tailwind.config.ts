import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0a0a0a",
          card: "#1a1a1a",
          elevated: "#252525",
        },
        accent: {
          gold: "#c9a227",
          "gold-light": "#e0c158",
          "gold-dark": "#9a7b1a",
        },
        secondary: {
          wine: "#8b2635",
          "wine-dark": "#5c181f",
        },
        text: {
          primary: "#f5f5f5",
          secondary: "#888888",
          muted: "#666666",
        },
        border: {
          DEFAULT: "#333333",
          gold: "#c9a227",
          subtle: "#2a2a2a",
        },
        tier: {
          free: "#666666",
          standard: "#888888",
          premium: "#c9a227",
          platinum: "#8b2635",
          new: "#22c55e",
          verified: "#3b82f6",
        },
      },
      fontFamily: {
        heading: ["Playfair Display", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-gold":
          "linear-gradient(135deg, #c9a227 0%, #e0c158 50%, #9a7b1a 100%)",
        "gradient-wine":
          "linear-gradient(135deg, #8b2635 0%, #5c181f 100%)",
      },
      boxShadow: {
        gold: "0 0 20px rgba(201, 162, 39, 0.3)",
        "gold-lg": "0 0 40px rgba(201, 162, 39, 0.4)",
        card: "0 4px 20px rgba(0, 0, 0, 0.3)",
        elevated: "0 8px 40px rgba(0, 0, 0, 0.4)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        shimmer: "shimmer 2s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
