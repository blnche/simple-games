/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require('daisyui')
  ],
  daisyui: {
    themes: [
      'retro',
      {
        animalCrossing: {
          "primary": "#14b8a6",
          "secondary": "#fbcfe8",
          "accent": "#10b981",
          "neutral": "#001317",
          "base-100": "#fff8e8",
          "info": "#60a5fa",
          "success": "#4ade80",
          "warning": "#fde047",
          "error": "#fb7185",
        }
      }
    ],
  }
}

