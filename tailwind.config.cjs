/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#1c1917',
          900: '#292524',
          700: '#44403c',
          500: '#78716c',
          300: '#d6d3d1',
          100: '#f5f5f4',
          50: '#fafaf9',
        },
        accent: {
          DEFAULT: '#57534e',
          soft: '#a8a29e',
        },
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['"Source Sans 3"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      maxWidth: {
        prose: '42rem',
        site: '44rem',
      },
      typography: ({ theme }) => ({
        editorial: {
          css: {
            '--tw-prose-body': theme('colors.ink.700'),
            '--tw-prose-headings': theme('colors.ink.950'),
            '--tw-prose-links': theme('colors.ink.900'),
            '--tw-prose-bold': theme('colors.ink.950'),
            '--tw-prose-quotes': theme('colors.ink.700'),
            '--tw-prose-quote-borders': theme('colors.ink.300'),
            '--tw-prose-code': theme('colors.ink.900'),
            maxWidth: '42rem',
            fontSize: '1.125rem',
            lineHeight: '1.8',
            a: {
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              fontWeight: '500',
            },
            'h1, h2, h3': {
              fontFamily: theme('fontFamily.serif').join(', '),
              fontWeight: '600',
              letterSpacing: '-0.01em',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
