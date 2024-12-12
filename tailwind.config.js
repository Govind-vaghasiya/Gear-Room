/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        'input-lg': '1.125rem',
      },
      spacing: {
        'input-y': '0.875rem',
      },
      boxShadow: {
        'input': '0 2px 4px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};