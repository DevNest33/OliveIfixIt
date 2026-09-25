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
          bg: '#111111',
          'bg-secondary': '#0D0D0D',
          'bg-card': '#111111',
          text: '#FFFFFF',
          'text-muted': '#9CA3AF',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(212, 175, 55, 0.08)',
        'glass-hover': '0 20px 40px -15px rgba(212, 175, 55, 0.18)',
        'gold-glow': '0 10px 25px -5px rgba(212, 175, 55, 0.4)',
        'gold-glow-lg': '0 20px 50px -10px rgba(212, 175, 55, 0.5)',
        'black-glow': '0 12px 30px -5px rgba(0, 0, 0, 0.5)',
        'premium': '0 20px 50px rgba(0, 0, 0, 0.15)',
        'premium-lg': '0 30px 70px rgba(0, 0, 0, 0.25)',
        'inner-gold': 'inset 0 2px 4px 0 rgba(212, 175, 55, 0.1)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 20px 40px -12px rgba(212, 175, 55, 0.15), 0 8px 16px -8px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'border-glow': 'border-glow 2s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'slow-zoom': 'slow-zoom 12s ease-in-out infinite alternate',
      },
      keyframes: {
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.12)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'border-glow': {
          '0%, 100%': { borderColor: 'rgba(212, 175, 55, 0.2)' },
          '50%': { borderColor: 'rgba(212, 175, 55, 0.5)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}
