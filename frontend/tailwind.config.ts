// frontend/tailwind.config.ts

import type { Config } from "tailwindcss";
import scrollbar from "tailwind-scrollbar";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "#0B0C10",
        surface: "#1F2833",
        primary: "#45A29E",
        secondary: "#66FCF1",
        danger: "#EF4444",
        warning: "#F59E0B",
        success: "#10B981",
        textMain: "#C5C6C7",
        textLight: "#FFFFFF",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },

  plugins: [scrollbar],
};

export default config;