/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        peyda: ['PEYDA', 'PEYDA-BLACK', 'Arial', 'Helvetica', 'sans-serif'],
      },
      colors: {
        'gholamzadeh-color': '#C38065',
        'gholamzadeh-productcolor': '#282828',
      },
      screens: {
        mdlg: '1500px',
        bordersize: '1654px',
      },
    },
  },
  plugins: [],
};

export default config;