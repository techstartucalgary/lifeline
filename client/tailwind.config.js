/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/src/**/*.{tsx, ts}"],
  theme: {
    colors: {
      'burgundy': '#B7194A',
    },
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
