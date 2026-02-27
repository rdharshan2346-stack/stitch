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
        primary: "#17cf36",
        "primary-dark": "#12a32b",
        "forest-green": "#1a2e1e",
        "sage-green": "#8fa895",
        "background-light": "#f6f8f6",
        "surface-light": "#ffffff",
        "text-main": "#0f172a",
        "text-secondary": "#64748b",
        "background-dark": "#112114",
      },
      fontFamily: {
        display: "Inter",
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02)",
        card: "0 2px 8px rgba(0,0,0,0.04)",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
}
