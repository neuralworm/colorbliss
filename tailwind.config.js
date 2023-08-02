/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors:{
        'accent': "#60efff"
      }
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /bg-./
    }
  ]
}

