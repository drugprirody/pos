import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    colors: {
      primary: "rgb(255, 209, 102)",
      accent: "rgb(255, 225, 156)",
      onHover: "rgba(255, 209, 102,0.3)",

      "gray-1": "#DCE1E7",
      "gray-2": "#E9ECEF",
      "gray-3": "#F8F9FA",

      "text-1": "#21201f",
      "text-2": "#404040",
      "text-3": "#7D7C83",
      "text-4": "#AAAAAA",

      "bg-1": "#fff",
      "bg-2": "#f1f1f1",
      "bg-cover": "rgb(0,0,0,0.5)",

      success: "#208B3A",
      warning: "#F8961E",
      error: "#D00000",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {},
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
