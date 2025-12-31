/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       fontFamily: {
      // roboto: ['Roboto', 'sans-serif'],
       //lato: ['Lato', 'sans-serif'],
       sans: ['Archivo', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#1E1B4B',
          light: '#312E81',
        },
        accent: {
          DEFAULT: '#FFC107',
        }
      }
    },
  },
  plugins: [],
}
