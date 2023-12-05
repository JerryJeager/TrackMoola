/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#141326",
        secondary: "#E33C3C",
        tertiary: "#E3B53C"
      },
      backgroundColor: {
        orange1: "rgba(232, 64, 64, 0.50)",
        orange2: "0px 0px 50px rgba(227, 181, 60, 0.50)",
        formBg: "rgba(35, 32, 63, 0.5)",

      },
      backgroundImage: {
        homeBg: "linear-gradient(90deg, rgba(35,32,63,1) 37%, rgba(227,130,60,1) 100%)",
        homeRadialBg: "radial-gradient(circle, rgba(227,130,60,0.9416141456582633) 42%, rgba(35,32,63,1) 58%)",
        homeRadialBg2: "radial-gradient(circle, rgba(20,19,38,1) 6%, rgba(20,19,38,1) 35%, rgba(20,19,38,1) 54%, rgba(159,95,61,1) 90%, rgba(227,130,60,0.9416141456582633) 100%)",
        homeRadialBg3: "radial-gradient(circle, rgba(20,19,38,1) 0%, rgba(159,95,61,1) 37%, rgba(227,130,60,0.9416141456582633) 47%, rgba(20,19,38,1) 75%, rgba(20,19,38,1) 96%)",
        homeRadialBg4: "radial-gradient(50% 50% at 50% 50%, rgba(227, 60, 60, 0.85) 0%, rgba(20, 19, 38, 0.85) 100%)"
      },
      boxShadow: {
        formShadow: "0 4px 30px rgba(0, 0, 0, 0.1)"
      }
    },
  },
  plugins: [],
}
