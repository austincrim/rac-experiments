import rac from 'tailwindcss-react-aria-components'
import animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}', 'index.html'],
  theme: {
    extend: {},
  },
  plugins: [rac, animate],
}
