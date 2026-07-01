import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        venus: {
          DEFAULT: "#FF4500",
          dim: "#cc3700",
          glow: "#ff866b",
          dark: "#1a0500",
        },
        void: {
          DEFAULT: "#050505",
          panel: "#0f0f11",
          border: "#27272a",
        },
        tech: {
          DEFAULT: "#00f0ff",
          dim: "rgba(0, 240, 255, 0.2)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
