/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#07090e',
          900: '#0B0F19',
          850: '#0f1422',
          800: '#151c2e',
          700: '#1e293b',
          600: '#334155',
        },
        brand: {
          purple: '#7C3AED',
          indigo: '#6366F1',
          violet: '#8B5CF6',
          cyan: '#06B6D4',
          blue: '#3B82F6',
          pink: '#EC4899',
          accent: '#A855F7',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'glow-purple': '0 0 50px -10px rgba(124, 58, 237, 0.35)',
        'glow-blue': '0 0 50px -10px rgba(59, 130, 246, 0.35)',
        'glow-cyan': '0 0 50px -10px rgba(6, 182, 212, 0.35)',
        'glow-card': '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 25px -5px rgba(124, 58, 237, 0.15)',
        'glow-lg': '0 0 80px -15px rgba(124, 58, 237, 0.25)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'float-reverse 7s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(12px)' },
        },
        glowPulse: {
          '0%': { opacity: '0.4', filter: 'blur(40px)' },
          '100%': { opacity: '0.8', filter: 'blur(60px)' },
        }
      }
    },
  },
  plugins: [],
}
