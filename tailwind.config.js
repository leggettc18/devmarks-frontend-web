// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: {
            DEFAULT: '#59344F',
            100: '#ecdfe9',
            200: '#d9bfd2',
            300: '#c69fbb',
            400: '#b47ea5',
            500: '#a15e8f',
            600: '#814b72',
            700: '#603956',
            800: '#402639',
            900: '#20131d',
          },
          secondary: colors.emerald,
          info: colors.blue,
          danger: colors.red,
          warning: colors.yellow,
        }
      }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}