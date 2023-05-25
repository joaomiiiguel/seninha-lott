/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/templates/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors:{
      'primary': '#193424',
      'primary-dark': '#082012',
      'primary-light': '#6A7F71',
      'secondary': '#F29D4E',
      'secondary-dark': '#F98822',
      'secondary-light': '#FBC956',
      'white': '#F8FAF3',
      'black': '#050F09',
      'success': '#33963D',
    }
  },
  plugins: [],
}
