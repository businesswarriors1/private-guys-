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
          DEFAULT: "#111111",
          ink: "#000000",
          card: "#171717",
          elevated: "#313131",
        },
        accent: {
          gold: "#c551d0",
          "gold-light": "#e040c8",
          "gold-dark": "#9616a3",
          metal: "#c9a84c",
          "metal-dark": "#9a7830",
        },
        secondary: {
          wine: "#160d1e",
          "wine-dark": "#0f0a14",
        },
        text: {
          primary: "#ffffff",
          secondary: "#b5b5b5",
          muted: "#929495",
        },
        border: {
          DEFAULT: "#454545",
          gold: "#c551d0",
          metal: "#c9a84c",
          subtle: "#2a2a2a",
        },
        tier: {
          free: "#666666",
          standard: "#888888",
          premium: "#c551d0",
          platinum: "#c9a84c",
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
          "linear-gradient(135deg, #c551d0 0%, #e040c8 52%, #9616a3 100%)",
        "gradient-metal":
          "linear-gradient(135deg, #fff0a8 0%, #c9a84c 48%, #9a7830 100%)",
        "gradient-wine":
          "linear-gradient(135deg, #160d1e 0%, #0f0a14 100%)",
      },
      boxShadow: {
        gold: "0 0 20px rgba(197, 81, 208, 0.28)",
        "gold-lg": "0 0 40px rgba(197, 81, 208, 0.36)",
        metal: "0 0 22px rgba(201, 168, 76, 0.35)",
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
