/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto, sans-serif;",
      },
      backgroundImage: {
        "nlw-copa": "url(/background-effects.png)",
      },
      colors: {
        ignite: {
          500: "#129E57",
        },
        gray: {
          100: "#E1E1E6",
          600: "#323238",
          800: "#202024",
          900: "#121214",
        },
        yellow: {
          500: "#F7DD43",
          700: "#E5CD3D",
        },
      },
    },
  },
  plugins: [],
};