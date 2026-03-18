/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        bg: '#0a0e1a',
        surface: '#111827',
        surface2: '#1a2235',
        accent: '#6366f1',
        accent2: '#8b5cf6',
      }
    }
  },
  plugins: []
}
