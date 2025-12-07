/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Claude Code Terminal - Dark purple with peach text
        claude: {
          bg: '#2d0a16',           // Dark purple/burgundy background
          surface: '#3c0d1a',      // Slightly lighter surface
          text: '#DE7356',         // Peach - main text color
          dim: '#a08080',          // Dimmed text
          accent: '#DE7356',       // Peach accent
          link: '#7dd3fc',         // Light blue/cyan for links
          border: '#5c2a38',       // Border color
          error: '#ef4444',        // Red for errors
        }
      },
      fontFamily: {
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
