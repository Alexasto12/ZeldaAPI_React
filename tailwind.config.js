// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'zelda-green': '#4CAF50',
        'zelda-dark': '#282c34',
      }
    },
  },
  plugins: [],
}