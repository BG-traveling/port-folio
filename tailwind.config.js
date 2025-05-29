/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
        darkbg: '#18181b',
        darkcard: '#23272f',
        neonblue: '#60a5fa',
        neonpurple: '#a78bfa',
        neongreen: '#34d399',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 8px 2px #60a5fa' },
          '50%': { boxShadow: '0 0 24px 8px #a78bfa' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.7s cubic-bezier(.4,0,.2,1) both',
        'glow': 'glow 2s infinite alternate',
      },
    },
  },
  plugins: [],
} 