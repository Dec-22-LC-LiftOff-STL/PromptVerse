/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['Helvetica', 'Arial', 'sans-serif'],
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
