/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E96C34", // Main orange
        secondary: "#7a8a9e", // Cool blue-gray
        background: "#fef5f2", // Soft cream
        border: "#d1d1d1", // Light gray
      },
      fontFamily: {
        'open-sans': ['Open Sans', 'serif'],
      },
    },
  },
  plugins: [],
}

