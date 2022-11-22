/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily:{
        'poppins':'Poppins,sans-serif',
      },
      animation:{
          'scaleUp':'scaleUp 0.3s linear'
      },
      keyframes:{
        scaleUp:{
          '0%':{
            transform:'scale(0)'
          },
          '100%':{transform:'scale(1)'}

        }
      }
    },
  },
  plugins: [],
}
