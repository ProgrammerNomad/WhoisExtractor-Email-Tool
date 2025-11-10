/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,ts,html,css}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        // Brand colors (light mode)
        brand: {
          blue: "#0066CC",
          darkBlue: "#004999",
          lightBlue: "#E6F2FF",
          green: "#28A745",
          red: "#DC3545",
        },
        // Background colors
        bg: {
          primary: "#F8F9FA",
          secondary: "#FFFFFF",
        },
        // Border colors
        border: {
          gray: "#DEE2E6",
        },
        // Text colors
        text: {
          dark: "#212529",
          muted: "#6C757D",
        },
      },
    },
  },
  plugins: [],
};
