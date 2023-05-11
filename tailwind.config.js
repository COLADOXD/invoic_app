/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {},
      textColor: (theme) => ({
        ...theme("colors"),
        primary: "hsl(209, 23%, 22%)",

        secondary: "hsl(207, 26%, 17%)",

        terceary: "hsl(200, 15%, 8%)",

        cuarto: "hsl(0, 0%, 52%)",

        quinto: "hsl(0, 0%, 98%)",

        sexto: "hsl(0, 0%, 100%)",
      }),
      backgroundColor: (theme) => ({
        ...theme("colors"),
        primary: "hsl(209, 23%, 22%)",

        secondary: "hsl(207, 26%, 17%)",

        terceary: "hsl(200, 15%, 8%)",

        cuarto: "hsl(0, 0%, 52%)",

        quinto: "hsl(0, 0%, 98%)",

        sexto: "hsl(0, 0%, 100%)",
        septimo: "#f3f4f6",
      }),
    },
  },
  plugins: [],
};
