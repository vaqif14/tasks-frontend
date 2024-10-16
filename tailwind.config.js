/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#50c878",
        secondary: "#99e999",
        darkBg: "#121212",
        lightBg: "#ffffff",
      },
    },
  },
  plugins: [],
};
