/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E6BFF",
        secondary: "#F3F4F6",
        accent: "#14B8A6",
        background: "#FBFCF8",
        surface: "#FFFFFF",
        "text-primary": "#111827",
        "text-secondary": "#4B5563",
        "border-custom": "#E5E7EB",
      },
      borderRadius: {
        card: "5px",
        control: "28px",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
        body: ["Geist", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
}


