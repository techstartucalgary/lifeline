/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/src/**/*.{tsx, ts}"],
  theme: {
    extend: {
      colors: {
        'burgundy': '#B7194A',
        'disabled' : '#1C1B1F',
        'textdis' : '#400013',
        'tonal' : '#FFD7F4',
        'tonalText' : '#380037',
        'textHover' : '#6750a414'
      },
      fontFamily: {
        poppins: "'Poppins', sans-serif",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
