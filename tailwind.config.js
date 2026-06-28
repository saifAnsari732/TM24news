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
          red: '#E11D48',      // Modern Rose Red
          'red-dark': '#9F1239',
          blue: '#1E40AF',     // Deep Royal Blue
          'blue-dark': '#1E3A8A',
          dark: '#0F172A',     // Slate 900
          accent: '#10B981',   // Emerald Accent
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.3) 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'soft': '0 20px 40px -15px rgba(0,0,0,0.05)',
      },
      fontFamily: {
        hindi: ['"Noto Sans Devanagari"', '"Mukta"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
