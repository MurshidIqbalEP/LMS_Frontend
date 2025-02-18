// tailwind.config.js
const {heroui} = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/components/(input|form).js",
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