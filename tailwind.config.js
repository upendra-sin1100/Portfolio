/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          purple: '#d946ef',
          pink: '#ec4899',
          cyan: '#06b6d4',
          green: '#10b981',
          orange: '#f97316',
          blue: '#0ea5e9',
        },
        dark: {
          bg: '#0f0f1e',
          card: '#1a1a2e',
          border: '#2d2d44',
        }
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px #d946ef, 0 0 10px #d946ef' },
          '50%': { boxShadow: '0 0 20px #d946ef, 0 0 30px #d946ef, 0 0 40px #d946ef' },
        },
        'pulse-neon': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      boxShadow: {
        'neon-purple': '0 0 20px #d946ef, 0 0 40px #d946ef',
        'neon-cyan': '0 0 20px #06b6d4, 0 0 40px #06b6d4',
        'neon-pink': '0 0 20px #ec4899, 0 0 40px #ec4899',
      }
    },
  },
  plugins: [],
}
