/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
    },
    extend: {
      colors: {
        'dark-bg': '#0a0a0a',
        'dark-border': '#2a2a2a',
        'text-primary': '#ffffff',
        'text-secondary': '#b8b8b8',
        'text-muted': '#808080',
        'accent-purple': '#a855f7',
        'accent-pink': '#ec4899',
      },
    },
  },
  plugins: [],
}

module.exports = config
