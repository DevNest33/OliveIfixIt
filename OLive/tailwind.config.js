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
          black: '#000000',
          'black-light': '#111111',
          'black-lighter': '#222222',
          gold: '#D4AF37',
          'gold-light': '#E5C158',
          'gold-dark': '#B8942F',
          'gold-glow': 'rgba(212, 175, 55, 0.15)',
          'gold-bright': '#FFD700',
          bg: '#000000',
          'bg-secondary': '#0A0A0A',
          'bg-card': '#111111',
          text: '#FFFFFF',
          'text-muted': '#9CA3AF',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(212, 175, 55, 0.08)',
        'glass-hover': '0 20px 40px -15px rgba(212, 175, 55, 0.18)',
        'gold-glow': '0 10px 25px -5px rgba(212, 175, 55, 0.4)',
        'black-glow': '0 12px 30px -5px rgba(0, 0, 0, 0.5)',
        'premium': '0 20px 50px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
