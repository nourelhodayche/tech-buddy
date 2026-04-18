/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
        "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f0ff',
          100: '#e5e3ff',
          200: '#cfcbff',
          300: '#a8a2ff',
          400: '#877fff',
          500: '#6C63FF',
          600: '#5249e6',
          700: '#3d34cc',
          800: '#2b23a3',
          900: '#1d177a',
        },
        secondary: {
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#2A2A2A',
          900: '#18181B',
          950: '#09090B',
        },
        accent: {
          50: '#fff8f0',
          100: '#ffecd4',
          200: '#ffdaaa',
          300: '#ffc57a',
          400: '#FFB74D',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        }
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(0,0,0,0.08)',
      },

    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

