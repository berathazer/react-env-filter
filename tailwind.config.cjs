/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation:{
        'pulse-100': 'pulse .1s linear'
      }
    },
  },
  plugins: [],
}
