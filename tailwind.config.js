/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'Roboto',
          'Open Sans',
          'Lato',
          'Nunito',
          'Source Sans Pro',
          'sans-serif',
        ],
        modern: ['Poppins', 'Montserrat', 'sans-serif'],
        serif: ['Georgia', 'Merriweather', 'PT Serif', 'serif'],
        tech: ['Exo', 'Titillium Web', 'Audiowide', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
