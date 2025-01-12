/** @type {import('tailwindcss').Config} */
export default {
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
        'lucano-color': '#69B0C4',
        'lucano-productcolor':'#0F2636',
      },
    },
  },
  variants: {},
};
