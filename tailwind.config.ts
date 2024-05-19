import type { Config } from "tailwindcss";

const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {},
    extend: {
      colors: {
        bg: {
          light: "rgb(255, 255, 255)",
          dark: "rgb(12, 9, 9)",
        },
        "bg-cover": "rgb(0,0,0,0.5)",

        "card-light": {
          DEFAULT: "rgb(255, 255, 255)",
          foreground: "rgb(10, 10, 13)",
        },

        "card-dark": {
          DEFAULT: "rgb(28, 23, 23)",
          foreground: "rgb(242, 242, 242)",
        },

        text: {
          light: "rgb(9, 9, 10)",
          dark: "rgb(242, 242, 242)",
        },

        "primary-light": {
          DEFAULT: "rgb(24, 173, 117)",
          foreground: "rgb(255, 240, 242)",
        },

        "primary-dark": {
          DEFAULT: "rgb(52, 190, 135)",
          foreground: "rgb(5, 46, 27)",
        },

        "secondary-light": {
          DEFAULT: "rgb(243, 244, 245)",
          foreground: "rgb(24, 24, 26)",
        },
        "secondary-dark": {
          DEFAULT: "rgb(39, 40, 41)",
          foreground: "rgb(250, 250, 250)",
        },
        white: "#fff",
        dark: "#000",

        // primary: "rgb(255, 209, 102)",
        // accent: "rgb(255, 225, 156)",
        // onHover: "rgba(255, 209, 102,0.3)",

        // "gray-1": "#DCE1E7",
        // "gray-2": "#E9ECEF",
        // "gray-3": "#F8F9FA",

        // "text-1": "#21201f",
        // "text-2": "#404040",
        // "text-3": "#7D7C83",
        // "text-4": "#AAAAAA",

        // "bg-1": "#fff",
        // "bg-2": "#f1f1f1",

        // success: "#208B3A",
        // warning: "#F8961E",
        // error: "#D00000",
      },
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
