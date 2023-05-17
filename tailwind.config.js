/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {},
      textColor: (theme) => ({
        ...theme("colors"),
        primary: "#141624",

        secondary: "#1f2138",

        terceary: "#373b54",

        cuarto: "#262943",

        quinto: "#f8f8fb",

        sexto: "hsl(0, 0%, 100%)",
      }),
      backgroundColor: (theme) => ({
        ...theme("colors"),
        primary: "#141624",

        secondary: "#1f2138",

        terceary: "#373b54",

        cuarto: "#262943",

        quinto: "#f8f8fb",

        sexto: "hsl(0, 0%, 100%)",

        septimo: "#f3f4f6",
      }),
    },
  },
  plugins: [],
};
