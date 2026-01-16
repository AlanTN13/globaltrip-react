/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#0b4e89",
        "background-light": "#ffffff",
        "background-dark": "#19202e",
        "surface-light": "#f8f9fa",
        "text-main": "#1F2933",
        "text-light": "#617789",
        "slate-850": "#1a202c",
      },
      fontFamily: {
        "display": ["Manrope", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "full": "9999px"
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(11, 78, 137, 0.05), 0 2px 4px -1px rgba(11, 78, 137, 0.05)',
      }
    },
  },
  plugins: [],
}
