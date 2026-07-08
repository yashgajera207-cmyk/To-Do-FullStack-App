import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#07070B",
          900: "#0B0B12",
          800: "#13131C",
          700: "#1C1C28",
          600: "#2A2A3A",
        },
        accent: {
          400: "#5B8CFF",
          500: "#3D6BFF",
          600: "#2E52E0",
          700: "#233FB0",
        },
        mist: {
          50: "#F7F8FC",
          100: "#EEF0F8",
          200: "#DCE0EE",
          400: "#8A8FA3",
          500: "#6B7086",
        },
      },
      fontFamily: {
        display: ["Sora", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 20px 60px -15px rgba(10, 12, 30, 0.35)",
        glow: "0 0 0 1px rgba(93,140,255,0.15), 0 8px 30px rgba(61,107,255,0.35)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        drift: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        drift: "drift 40s linear infinite",
        fadeUp: "fadeUp 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
