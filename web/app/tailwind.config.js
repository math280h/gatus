import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,js,vue}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["Consolas", "Monaco", 'Courier New"', "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: {
          DEFAULT: "hsl(var(--background))",
          dark: "#070c13",
        },
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          dark: "#0d131a",
        },
        "card-secondary": {
          DEFAULT: "hsl(var(--card-secondary))",
          dark: "#1d232b",
        },
        "border-secondary": {
          DEFAULT: "hsl(var(--border-secondary))",
          dark: "#1d232b",
        },
        button: {
          DEFAULT: "hsl(var(--button))",
          dark: "#161c23",
        },
        "button-hover": {
          DEFAULT: "hsl(var(--button-hover))",
          dark: "#1a222c",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          dark: "#8b95a1",
        },
        "muted-hover": {
          DEFAULT: "hsl(var(--muted-hover))",
          dark: "#6e7782",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "rgba(28, 41, 55, 1)",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
