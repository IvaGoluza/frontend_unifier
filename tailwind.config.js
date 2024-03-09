/* eslint-disable */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customPurple: '#5422E1',
        customPurpleDarker: '#09115B',
        customPurpleDarkest: '#1F2340',
      },
      fontFamily: {
        krub: ['Krub', 'sans-serif'],
      },
    },
  },
  plugins: [require('prettier-plugin-tailwindcss')],
};
