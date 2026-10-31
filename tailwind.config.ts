import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#070709",
        surface: "#0f0f13",
        "surface-elevated": "#18181f",
        border: "#23232b",
        "text-primary": "#ffffff",
        "text-muted": "#9ca3af",
        accent: "#6366f1",
        "accent-glow": "#6366f126",
      },
      letterSpacing: {
        widest: "0.12em",
        tighter: "-0.04em",
      },
    },
  },
  plugins: [],
};
export default config;
