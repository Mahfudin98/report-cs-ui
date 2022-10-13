/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: {
          // light
          "bg-light": "#f27272",
          primary: "#570DF8",
          secondary: "#F000B8",
          accent: "#37CDBE",
          neutral: "#3D4451",
          "base-100": "#FFFFFF",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",

          // dark
          "bg-dark": "#29283E",
          "primary-dark": "#e59d44",
          "secondary-dark": "#583faa",
          "accent-dark": "#f2b3cd",
          "neutral-dark": "#171D21",
          "base-100-dark": "#2F2F3D",
          "info-dark": "#59AAE3",
          "success-dark": "#3FCF96",
          "warning-dark": "#A25C06",
          "error-dark": "#F53D50",
        },
      },
      fontFamily: {
        roboto: ["Roboto"],
        poppins: ["Poppins"],
      },
      container: {
        center: true,
      },
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1600px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("flowbite/plugin")],
  variants: {
    scrollbar: ["rounded"],
  },
};
