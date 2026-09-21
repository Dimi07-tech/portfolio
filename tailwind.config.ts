import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "rgb(var(--ink-950) / <alpha-value>)",
          900: "rgb(var(--ink-900) / <alpha-value>)",
          800: "rgb(var(--ink-800) / <alpha-value>)",
          700: "rgb(var(--ink-700) / <alpha-value>)",
          600: "rgb(var(--ink-600) / <alpha-value>)",
        },
        venom: {
          DEFAULT: "rgb(var(--venom) / <alpha-value>)",
          soft: "rgb(var(--venom-soft) / <alpha-value>)",
        },
        white: "rgb(var(--white) / <alpha-value>)",
        slate: {
          300: "rgb(var(--slate-300) / <alpha-value>)",
          400: "rgb(var(--slate-400) / <alpha-value>)",
          500: "rgb(var(--slate-500) / <alpha-value>)",
          600: "rgb(var(--slate-600) / <alpha-value>)",
        },
        cyan: {
          300: "rgb(var(--cyan-300) / <alpha-value>)",
          400: "rgb(var(--cyan-400) / <alpha-value>)",
        },
        violet: {
          300: "rgb(var(--violet-300) / <alpha-value>)",
          500: "rgb(var(--violet-500) / <alpha-value>)",
        },
        amber: {
          300: "rgb(var(--amber-300) / <alpha-value>)",
          400: "rgb(var(--amber-400) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["var(--font-space)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(28px, -20px) scale(1.08)" },
          "66%": { transform: "translate(-18px, 16px) scale(0.95)" },
        },
        "scan-sweep": {
          "0%": { top: "-15%" },
          "100%": { top: "112%" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        scan: {
          "0%": { top: "0%" },
          "100%": { top: "100%" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        drift: "drift 16s ease-in-out infinite",
        "scan-sweep": "scan-sweep 7s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "fade-up": "fade-up 0.7s ease-out both",
        blink: "blink 1s step-end infinite",
        scan: "scan 8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;