/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#ac0202',
          'red-dark': '#820000',
          blue: '#002698',
          'blue-dark': '#001A66',
          dark: '#18181b',
        }
      },
      fontFamily: {
        hindi: ['"Noto Sans Devanagari"', '"Mukta"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
