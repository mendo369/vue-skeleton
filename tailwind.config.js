/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: {
          gray: '#45474D',
          purple: '#801586',
          
        }
      }
    },
  },
  plugins: [],
}
