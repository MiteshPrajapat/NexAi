/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ai-primary': '#6366f1', // Indigo-500
        'ai-secondary': '#8b5cf6', // Violet-500
        'ai-bg': '#0B0F19', // Very dark blue/slate
        'ai-panel': '#151C2C', // Slightly lighter panel
        'ai-border': '#2A344A', // Border color
        'ai-text': '#F1F5F9', // Light text
        'ai-text-muted': '#94A3B8', // Muted text
      },
      animation: {
        blob: "blob 7s infinite",
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
}
