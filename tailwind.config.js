/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // 🌊 Sea-green brand (primary)
        primary: {
          50:  "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#22c19e",
          600: "#20c997", // main
          700: "#18a67e",
          800: "#0f8b6a",
          900: "#0a6b53",
        },
        // 💚 Light green accents (replaces black accents in UI) 
        leaf: {
          100: "#e7ffe8",
          300: "#bff7c7",
          500: "#9ae6b4",
        },
        dark: "#0f172a",      // text heading
      },
      boxShadow: {
        soft: "0 6px 24px rgba(0,0,0,0.06)",
      },
      borderRadius: {
        xl2: "1rem",
      },
    },
  },
  plugins: [],
};
