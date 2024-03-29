/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        red: "#FF0000",
        secondary: "#0F0F0F",
      },
    },
  },
  plugins: [],
};
