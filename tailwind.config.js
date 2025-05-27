/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        commissioner: ['Commissioner', 'sans-serif'],
        dancing: ['Dancing Script', 'cursive'],
        mulish: ['Mulish', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
        sixcaps: ['Six Caps', 'sans-serif'],
        spacegrotesk: ['Space Grotesk', 'sans-serif'],
        poppins: [ 'Poppins',' sans-serif'],
        chalk:['Fredericka the Great', 'serif']
      },
    },
  },
  plugins: [],
}
