/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
// const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "monts": ['"Montserrat"', 'sans-serif']
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
