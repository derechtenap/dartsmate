/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./renderer/pages/**/*.{js,ts,jsx,tsx}",
    "./renderer/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        // TODO: Update both themes with nice colors :)
        light: {
          primary: "#264574",
          secondary: "#f4f0d4",
          accent: "#1FB2A5",
          neutral: "#ebeaec",
          "base-100": "#f5f6fa",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
      {
        dark: {
          primary: "#264574",
          secondary: "#f4f0d4",
          accent: "#1FB2A5",
          neutral: "#ebeaec",
          "base-100": "#23252b",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
