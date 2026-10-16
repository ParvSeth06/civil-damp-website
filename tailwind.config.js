/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1e3a5f',
          light: '#2a4f7f',
          dark: '#132840',
        },
        gold: {
          DEFAULT: '#c9a84c',
          light: '#e0c470',
          dark: '#a8872e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      borderRadius: {
        card: '8px',
      },
      boxShadow: {
        card: '0 2px 12px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.15)',
      },
      backgroundImage: {
        'navy-gradient': 'linear-gradient(135deg, #132840 0%, #1e3a5f 50%, #2a4f7f 100%)',
      },
    },
  },
  plugins: [],
}
