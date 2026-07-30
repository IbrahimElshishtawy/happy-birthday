/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF5FA2',
          light: '#FF8DC3',
          dark: '#E04A8A',
        },
        secondary: {
          DEFAULT: '#C084FC',
          light: '#D8A8FF',
          dark: '#9B59D9',
        },
        accent: {
          DEFAULT: '#FFD166',
          light: '#FFE299',
          dark: '#E6B84D',
        },
        blush: '#FFF0F7',
        lavender: '#F5F0FF',
        rose: '#FFE4EF',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        script: ['Dancing Script', 'cursive'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        'heart-beat': 'heartBeat 1.2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'gradient-x': 'gradientX 4s ease infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'rise': 'rise 1s ease-out forwards',
        'typewriter': 'typewriter 3s steps(40) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,95,162,0.4)' },
          '50%': { boxShadow: '0 0 60px rgba(255,95,162,0.8)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        heartBeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.15)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.15)' },
          '70%': { transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientX: {
          '0%, 100%': { backgroundSize: '200% 200%', backgroundPosition: 'left center' },
          '50%': { backgroundSize: '200% 200%', backgroundPosition: 'right center' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(0.8)' },
        },
        rise: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
        'glass-lg': '0 16px 48px 0 rgba(31, 38, 135, 0.15)',
        'glow-pink': '0 0 30px rgba(255, 95, 162, 0.5)',
        'glow-purple': '0 0 30px rgba(192, 132, 252, 0.5)',
        'glow-gold': '0 0 30px rgba(255, 209, 102, 0.5)',
        'card': '0 20px 60px rgba(255, 95, 162, 0.12)',
        'card-hover': '0 30px 80px rgba(255, 95, 162, 0.2)',
        'float': '0 40px 80px rgba(255, 95, 162, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #FFE4EF 0%, #F5F0FF 50%, #FFF0F7 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
      },
    },
  },
  plugins: [],
}
