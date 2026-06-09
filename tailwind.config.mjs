/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#060b25',
        'primary-deep': '#070c26',
        'primary-medium': '#0a163e',
        'primary-light': '#1b2c5a',
        'primary-hover': '#0a1a4a',
        'accent-gold': '#83776d',
        'accent-gold-hover': '#6c6158',
        'accent-blue': '#0052b4',
        'accent-blue-light': '#E1EEFE',
        'accent-cyan': '#B4D5E6',
        'neutral-warm': '#eceff0',
        'text-light-primary': '#ffffff',
        'text-secondary': '#828797',
        'text-muted': '#696d78',
        'border-gray': '#858D9A',
      },
      fontFamily: {
        sans: ['Satoshi', 'sans-serif'],
        serif: ['BigCaslonFB', 'serif'],
      },
    },
  },
  plugins: [],
};
