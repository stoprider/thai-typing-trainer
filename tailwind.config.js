/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1f2937',
        mist: '#f6efe4',
        sand: '#eadfce',
        ember: '#bb4d00',
        pine: '#164e63',
        lagoon: '#0f766e',
      },
      fontFamily: {
        sans: ['"Noto Sans Thai"', '"Segoe UI"', 'Tahoma', 'sans-serif'],
        display: ['"Trebuchet MS"', '"Noto Sans Thai"', 'sans-serif'],
        mono: ['"Cascadia Code"', '"Consolas"', 'monospace'],
      },
      boxShadow: {
        soft: '0 20px 60px rgba(15, 23, 42, 0.10)',
      },
      backgroundImage: {
        grid:
          'linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
