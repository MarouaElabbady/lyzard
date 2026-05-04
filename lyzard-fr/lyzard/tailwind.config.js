/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#fafaf8",
        foreground: "#0d0d0d",
        accent: "#e63946",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "serif"],
        sans: ['"DM Sans"', "sans-serif"],
      },
      keyframes: {
        "word-slide": {
          "0%, 20%": { transform: "translateY(0)" },
          "25%, 45%": { transform: "translateY(-20%)" },
          "50%, 70%": { transform: "translateY(-40%)" },
          "75%, 95%": { transform: "translateY(-60%)" },
          "100%": { transform: "translateY(-80%)" },
        },
        "fade-in-up": {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        }
      },
      animation: {
        "word-slide": "word-slide 10s cubic-bezier(0.8, 0, 0.2, 1) infinite",
        "fade-in-up": "fade-in-up 1s ease-out forwards",
      }
    },
  },
  plugins: [],
}
