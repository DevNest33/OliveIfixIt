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
          navy: '#0F4C81',
          'navy-dark': '#0A345A',
          'navy-light': '#1A64A5',
          'navy-glow': 'rgba(15, 76, 129, 0.15)',
          orange: '#FF7A00',
          'orange-hover': '#E56D00',
          'orange-light': '#FFF4EB',
          'orange-glow': 'rgba(255, 122, 0, 0.25)',
          bg: '#FFFFFF',
          'bg-secondary': '#F8FAFC',
          'bg-card': '#F1F5F9',
          text: '#1F2937',
          'text-muted': '#64748B',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(15, 76, 129, 0.08)',
        'glass-hover': '0 20px 40px -15px rgba(15, 76, 129, 0.18)',
        'orange-glow': '0 10px 25px -5px rgba(255, 122, 0, 0.4)',
        'navy-glow': '0 12px 30px -5px rgba(15, 76, 129, 0.35)',
        'premium': '0 20px 50px rgba(15, 23, 42, 0.08)',
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
