import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#09111f",
        cyanGo: "#00ADD8",
        graphite: "#151923",
        vapor: "#f6f9fb"
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "monospace"]
      },
      boxShadow: {
        glow: "0 24px 80px rgba(0, 173, 216, 0.22)",
        panel: "0 18px 70px rgba(9, 17, 31, 0.16)"
      },
      backgroundImage: {
        "mesh-light":
          "radial-gradient(circle at 18% 16%, rgba(0,173,216,0.20), transparent 28%), radial-gradient(circle at 76% 18%, rgba(35,197,94,0.16), transparent 24%), radial-gradient(circle at 48% 92%, rgba(245,158,11,0.12), transparent 32%)",
        "mesh-dark":
          "radial-gradient(circle at 15% 14%, rgba(0,173,216,0.24), transparent 28%), radial-gradient(circle at 76% 18%, rgba(52,211,153,0.12), transparent 24%), radial-gradient(circle at 48% 92%, rgba(251,191,36,0.10), transparent 32%)"
      }
    }
  },
  plugins: []
};

export default config;
