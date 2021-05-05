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
            100: '#ecdfe9'
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