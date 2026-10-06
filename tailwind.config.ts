import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        page: "var(--page)",
        footer: "var(--footer)",
        "ink-green": "var(--ink-green)",
        ink: "var(--ink)",
        sage: "var(--sage)",
        "sage-soft": "var(--sage-soft)",
        cream: "var(--cream)",
        outline: "var(--outline)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
