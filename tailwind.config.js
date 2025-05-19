// tailwind.config.js
const {heroui} = require("@heroui/react");



/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
   "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
   "node_modules/antd/dist/antd.min.css"
  ],
  safelist: ['bg-primary'],
  theme: {
    extend: {
      fontFamily: {
        kodeMono: ['Kode Mono', 'monospace'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: "#212529",
      }
    },
  },
  darkMode: "class",
  plugins: [ require('@tailwindcss/line-clamp'),heroui()],
};