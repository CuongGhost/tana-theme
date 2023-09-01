/** @type {import('tailwindcss').Config} */

const glob = require('glob');

const commonFontFamily = 'Inter, Roboto, "Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif';

let contentArray = glob.sync("./custom-*.hbs")
    .concat(glob.sync("partials/*.hbs"))
    .concat(glob.sync("partials/home/*.hbs"));

module.exports = {
  content: contentArray,
  darkMode: 'class',
  theme: {
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    extend: {
      colors: {
        'white': '#fcfcfd',
        'black': '#151719',
        'black-secondary': '#18181b',
        'lightblack': '#242424',
        'darkgray': 'rgb(55 65 81)',
        'lightgray': 'rgb(229 231 235)',
        'ghost': 'var(--ghost-accent-color)',
        'secondary': 'var(--color-secondary)', // secondary color
      },
      fontFamily: {
        'body': commonFontFamily,
        'sans': commonFontFamily,
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'), // Add custom scrollbar styles
    require('@tailwindcss/typography'), // Add typography plugin
    require('@tailwindcss/forms'), // Add forms plugin
    require('preline/plugin') // Add preline plugin
  ],
};