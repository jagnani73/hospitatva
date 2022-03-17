module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EFEFEF",
        primaryLight: "#F6F6F6",
        primaryDark: "#e5e5e5",
        secondary: "#1A1A1A",
        accent: {
          patient: { start: "#8DC956", stop: "#7CA655" },
          hospital: { start: "#73C1CE", stop: "#4495A2" },
        },
      },
      fontFamily: {
        serif: ["Inter", "Montserrat", "sans-serif"],
      },
      spacing: {
        "128": "32rem",
      },
    },
  },
  plugins: [],
};
