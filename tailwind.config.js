const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#387ADF",
        primaryblur: "#CCDEF7",
        secondary: "#FBA834",
        secondaryblur: "#FEE6C9",
        asset: "#9DD356",
        inUseRed: "#FF0000",
        inUseGray: "#757575",
      },
      backgroundColor: {
        primary: "#387ADF",
        primaryblur: "#CCDEF7",
        secondary: "#FBA834",
        secondaryblur: "#FEE6C9",
        asset: "#9DD356",
        inUseRed: "#FF0000",
        inUseGray: "#757575",
      },
      boxShadow: {
        sd: "1px 1px 10px 0px #CCDEF7",
      },
    },
  },
  plugins: [nextui()],
};

// shadow-sd
