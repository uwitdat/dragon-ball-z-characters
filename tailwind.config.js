/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        prim: ['Bebas Neue', 'sans-serif'],
      },
      colors: {
        lav: '#DADFF7',
        dark: '#232C33'
      },
    },
  },
  plugins: [],
}