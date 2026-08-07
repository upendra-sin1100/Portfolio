/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#0a0a0a',
        'slate-deep': '#121212',
        steel: '#8892A8',
        ice: '#E4E8F0',
        sapphire: {
          DEFAULT: '#00F0FF', // Vibrant cyan/neon blue accent
          hover: '#00D1DF',
          light: '#70F8FF',
        },
        'amber-signal': '#F59E0B',
      },
      fontFamily: {
        display: ['"Outfit"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      gridTemplateColumns: {
        'bento': 'repeat(auto-fit, minmax(250px, 1fr))',
        'bento-lg': 'repeat(3, 1fr)',
      },
    },
  },
  plugins: [],
}
