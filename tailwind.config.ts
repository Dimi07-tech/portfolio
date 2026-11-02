import type { Config } from "tailwindcss";

const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: v("bg"),
        surface: v("surface"),
        "surface-2": v("surface-2"),
        fg: v("fg"),
        muted: v("muted"),
        faint: v("faint"),
        line: v("line"),
        accent: v("accent"),
        "accent-fg": v("accent-fg"),
        cyber: v("cyber"),
        ok: v("ok"),
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        site: "75rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".35" },
        },
        float: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-10px,0)" },
        },
        scan: {
          "0%": { transform: "translateY(-120%)" },
          "100%": { transform: "translateY(900%)" },
        },
        portrait: {
          "0%": { transform: "scale(1.12)", filter: "blur(6px) saturate(.6)" },
          "100%": { transform: "scale(1)", filter: "blur(0) saturate(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up .8s cubic-bezier(.2,.7,.2,1) both",
        pulse: "pulse 2.2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        scan: "scan 6s cubic-bezier(.4,0,.6,1) infinite",
        portrait: "portrait 1.6s cubic-bezier(.2,.7,.2,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
