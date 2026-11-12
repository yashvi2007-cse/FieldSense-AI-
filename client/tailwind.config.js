/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080c14",
        surface: "#0d1424",
        "surface-card": "#111a30",
        "surface-elevated": "#182442",
        brand: {
          cyan: "#00e5ff",
          teal: "#00f0b5",
          blue: "#38bdf8",
          dark: "#050b14",
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 229, 255, 0.2), 0 0 10px rgba(0, 229, 255, 0.2)' },
          '100%': { boxShadow: '0 0 15px rgba(0, 229, 255, 0.6), 0 0 25px rgba(0, 229, 255, 0.4)' },
        }
      }
    },
  },
  plugins: [],
}

