/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        orange1: "rgba(232, 64, 64, 0.50)",
        orange2: "0px 0px 50px rgba(227, 181, 60, 0.50)"
      },
      backgroundImage: {
        homeBg: "linear-gradient(90deg, rgba(35,32,63,1) 37%, rgba(227,130,60,1) 100%)",
        homeRadialBg: "radial-gradient(circle, rgba(227,130,60,0.9416141456582633) 42%, rgba(35,32,63,1) 58%)"
      }
    },
  },
  plugins: [],
}
