/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    fontFamily :{
      sans : ['Rubik','Padauk', 'sans-serif'],
    },
    extend: {

      fontFamily :{
        heading : ['Montserrat', 'sans-serif']
       
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
],

}

