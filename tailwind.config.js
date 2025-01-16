/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customRed: "#F64A4A",
        customGreen: "#A4FFAF",
        customYellow: "#F8CD65",
        customOrange: "#FB7C58",
        customBlack: "#18171F",
        customDarkGrey: "#24232C",
        customLightGrey: "#E6E5EA",
        customGreyBlue: "#817D92",

      },
      fontSize: {
        "body-xxs": ["0.8rem", "1rem"],
        "body-xs": ["1rem", "1.238rem"],
        "body-s": ["1.125rem", "1.438rem"],
        "heading-m": ["1.5rem", "1.938rem"],
        "heading-l": ["2.125rem", "2.688rem"],
      },
      fontFamily: {
        jetBrains: "JetBrains Mono, monospace",
      },
    },
  },
  plugins: [],
};
