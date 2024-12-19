/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        hatsuneMikuGreen: "#39c5bb",
        hatsuneMikuBule: "#00b2ff",
        hatsuneMikuPink: "#ff3399",
        kagamineOrangeDark: "#FFB400",
        kagamineOrange: "#FFA400",
        kagamineYellow: "#FFE211",
      },
    },
  },
  plugins: [],
};
