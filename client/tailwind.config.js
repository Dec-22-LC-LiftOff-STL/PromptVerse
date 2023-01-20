/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['Helvetica', 'Arial', 'sans-serif'],
      'Title': ['Amatic SC', 'cursive']
    }
  },
  plugins: [require("daisyui")],
  daisyui: {

    themes: ['dark'],
    base: false,
    utils: true,

    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
}
