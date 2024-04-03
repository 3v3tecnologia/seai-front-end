/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", ],
  theme: {
      extend: {
        colors: {
          primary: '#003B66', 
          warning: '#EF8A17', 
          sucess: '#C6DEA6',
          danger: '#9E2A2B',

        },
      },
  },
  plugins: [],
}

