module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        patient: {
          primary: "#EFEFEF",
          secondary: "#1A1A1A",
          accent: "#8DC956",
        },
      },
    },
  },
  plugins: [],
};
