/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        height: {
          '92vh': '92vh',
          '70vh': '70vh',
          '8vh': '8vh'
        },
      },
    },
    plugins: [],
  };  