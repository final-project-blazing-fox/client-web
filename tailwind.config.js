module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        poppins: "'Poppins', sans-serif;",
      },
      colors: {
        "custom-gray": "#222831",
        "light-gray": "#393E46",
        "custom-green": "#00ADB5",
      },
      gridTemplateColumns: {
        desktop: "20% 1fr",
        settings: "30% 1fr",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
