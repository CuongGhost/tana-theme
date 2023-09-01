/** @type {import('tailwindcss').Config} */

const glob = require('glob');

const commonFontFamily = 'Inter, Roboto, "Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif';

let contentArray = glob.sync("./*.hbs")
    .concat(glob.sync("./**/*.hbs"))
    .concat(glob.sync("./**/**/*.hbs"));

let purgeContentArray = contentArray.filter(file => !file.includes('custom-') && !file.includes('partials/home') && !file.includes('home.hbs'));

module.exports = {
  content: purgeContentArray,
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
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            'font-size': '17px',
            '--tw-prose-body': '#000000',
            '--tw-prose-hr': '#8e8e8e',
            '--tw-prose-code': '#f9439e',
            '--tw-prose-invert-body': 'rgba(255, 255, 255, 0.75)',
            '--tw-prose-invert-headings': '#fcfcfd',
            '--tw-prose-invert-lead': '#fcfcfd',
            '--tw-prose-invert-links': 'white',
            '--tw-prose-invert-bold': '#fcfcfd',
            '--tw-prose-invert-counters': '#fcfcfd',
            '--tw-prose-invert-bullets': '#fcfcfd',
            '--tw-prose-invert-hr': '#1f2937',
            '--tw-prose-invert-quotes': '#fcfcfd',
            '--tw-prose-invert-quote-borders': '#fcfcfd',
            '--tw-prose-invert-captions': '#fcfcfd',
            '--tw-prose-invert-code': '#f9439e',
            '--tw-prose-invert-pre-code': '#fcfcfd',
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': '#1f2937',
            '--tw-prose-invert-td-borders': '#1f2937',
            'strong, a': {
              'font-weight': '700',
            },
            'a': {
              'border-bottom': '3px solid var(--ghost-accent-color)',
              'text-decoration': 'none',
            },
            'a:hover': {
              'color': 'var(--ghost-accent-color)',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('tailwind-scrollbar'), // Add custom scrollbar styles
    require('@tailwindcss/typography'), // Add typography plugin
    require('@tailwindcss/forms'), // Add forms plugin
    require('preline/plugin') // Add preline plugin
  ],
};