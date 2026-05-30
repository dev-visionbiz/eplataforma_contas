import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          primary: "#0D1117",
          secondary: "#111827",
          card: "#161B22",
        },
        surface: {
          default: "#161B22",
          hover: "#1E293B",
          active: "#2563EB",
        },
        vision: {
          500: "#2563EB",
        },
        graphite: {
          900: "#0D1117",
        },
        ice: {
          50: "#F8FAFC",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.08)",
          strong: "rgba(255,255,255,0.16)",
          focus: "#2563EB",
        },
        success: {
          500: "#22C55E",
        },
        warning: {
          500: "#F59E0B",
        },
        danger: {
          500: "#EF4444",
        },
        info: {
          500: "#3B82F6",
        },
      },
      fontFamily: {
        primary: ["var(--font-inter)", "sans-serif"],
        secondary: ["var(--font-sora)", "sans-serif"],
        code: ["var(--font-jetbrains)", "monospace"],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.15)",
        md: "0 4px 12px rgba(0,0,0,0.18)",
        lg: "0 10px 24px rgba(0,0,0,0.22)",
        xl: "0 20px 48px rgba(0,0,0,0.28)",
      },
      transitionDuration: {
        fast: "120ms",
        normal: "220ms",
        slow: "420ms",
      },
      transitionTimingFunction: {
        "ease-default": "cubic-bezier(0.4, 0, 0.2, 1)",
        "ease-smooth": "cubic-bezier(0.22, 1, 0.36, 1)",
        "ease-soft": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    },
  },
  plugins: [],
};
export default config;
