/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "0px 0px 3px 3px #0000001f", // إضافة الشادو المخصص
      },
      backgroundColor: {
        light: "#fff",
        dark: "#1f2937",
        main: "#f7faff",
      },
    },
  },
  plugins: [],
};
