/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/src/**/*.{tsx, ts}"],
  theme: {
    extend: {
      colors: {
        'gray': '#D9D9D9',
        'pink': '#FF2480',
        'getStarted': '#B7194A',
        'learnMore': '#B7194A',
        'divider': "ADADAD",
        'start': '#B7194A'
      },
      fontFamily: {
        poppins: "'Poppins', sans-serif",
      },
      lineHeight: {
        '12': '3rem',
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
