/** @type {import('tailwindcss').Config} */
export default {
  content: ['./temp/*/*.ejs'],
  theme: {
    extend: {},
  },
  plugins: [{
    tailwindcss: {},
    autoprefixer: {},
  }],
}