/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        // Phones held sideways and other very short viewports
        short: { raw: '(max-height: 500px)' },
      },
      colors: {
        brand: {
          rust: '#C4622D',       /* Primary CTA & Accent */
          terracotta: '#D4845A', /* Secondary Terracotta */
          sand: '#E8B89A',       /* Sand / Thin Border */
          cream: '#F5DEC8',      /* Light Cream Section */
          dark: '#1A1008',       /* Deep Rich Brown Dark */
          darkBrown: '#2B1810',
          terracottaAccent: '#A64A2E',
          rustOrange: '#C97A3D',
          maroon: '#6B1F22',
          creamBg: '#EFE6D8',
          creamLight: '#F7F1E7',
          black: '#1A1210',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        none: 'none',
      }
    },
  },
  plugins: [],
};
