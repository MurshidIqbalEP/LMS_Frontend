// tailwind.config.js
const {heroui} = require("@heroui/react");



/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
   "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kodeMono: ['Kode Mono', 'monospace'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};