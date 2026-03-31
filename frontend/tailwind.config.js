/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        blue:{
          
          800: "#0C2C55",
          600: "#296374",
          400: "#629FAD",
          200: "#EDEDCE",

         }

        
      },
    },
  },
  plugins: [],
}
