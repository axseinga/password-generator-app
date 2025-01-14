/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customRed: "#F64A4A",
        customGreen: "#F64A4A",
        customYellow: "#F64A4A",
        customOrange: "#F64A4A",
        customBlack: "#18171F",
        customDarkGrey: "#24232C",
        customLightGrey: "#E6E5EA",
        customGreyBlue: "#817D92",

      },
      fontSize: {
        "body": ["1.125rem", "1.438rem"],
        "heading-m": ["1.5rem", "1.938rem"],
        "heading-l": ["2.125", "2.688"],
      },
      fontFamily: {
        jetBrains: "JetBrains Mono, monospace",
      },
    },
  },
  plugins: [],
};
