// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
      colors: {
          primary: {
            DEFAULT: '#59344F',
            100: '#ecdfe9'
          },
          secondary: colors.emerald,
          info: colors.blue,
          danger: colors.red,
          warning: colors.yellow,
          white: colors.white,
          black: colors.black,
          gray: colors.gray,
          purple: colors.purple,
        },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}