import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

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
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        brand: {
          50: "#f5f9f2",
          100: "#e5f1df",
          200: "#c7dfbb",
          300: "#a4ca92",
          400: "#7db464",
          500: "#5a9a3d",
          600: "#3f7d27",
          700: "#2f601d",
          800: "#234919",
          900: "#183313",
        },
        field: {
          50: "#fdf8f3",
          100: "#faeedf",
          200: "#f3d6ba",
          300: "#e9b989",
          400: "#d59254",
          500: "#bf6d2c",
          600: "#a25120",
          700: "#82401d",
          800: "#5d2c16",
          900: "#3a1b0f",
        },
        sky: {
          50: "#f1f8fb",
          100: "#dbeef7",
          200: "#bad9ee",
          300: "#8dbde1",
          400: "#609ecf",
          500: "#3e82bc",
          600: "#2c659f",
          700: "#244f7d",
          800: "#1f4063",
          900: "#1b3651",
        },
        soil: {
          50: "#f6f1ed",
          100: "#e9ddd1",
          200: "#d6baa5",
          300: "#c09378",
          400: "#a27251",
          500: "#7f5334",
          600: "#624026",
          700: "#4a301d",
          800: "#321f13",
          900: "#1d110a",
        },
        cream: {
          50: "#fcfbf7",
          100: "#f7f2e3",
          200: "#ece0bc",
          300: "#ddc18b",
          400: "#cba060",
          500: "#b1813f",
          600: "#936433",
          700: "#734b29",
          800: "#52341f",
          900: "#362014",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      boxShadow: {
        card: "0 10px 25px -15px rgba(63, 125, 39, 0.45)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
