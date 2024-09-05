import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#fff1f1",
          "100": "#ffe4e5",
          "200": "#fecdd1",
          "300": "#fda4ab",
          "400": "#fb717f",
          "500": "#f43f56",
          "600": "#e11d3f",
          "700": "#c91337",
          "800": "#9f1232",
          "900": "#881332",
          "950": "#4c0516",
          DEFAULT: "#e11d3f",
          foreground: "#ffffff",
        },
        green: {
          "50": "#f0fdf6",
          "100": "#dcfceb",
          "200": "#baf8d7",
          "300": "#85f0b9",
          "400": "#32dc84",
          "500": "#20c771",
          "600": "#14a55b",
          "700": "#14814a",
          "800": "#15663e",
          "900": "#135435",
          "950": "#052e1b",
          DEFAULT: "#20c771",
        },
        yellow: {
          "50": "#fbfee8",
          "100": "#f5fdc4",
          "200": "#f1fd8b",
          "300": "#effb46",
          "400": "#f2f817",
          "500": "#e8e40a",
          "600": "#c8b506",
          "700": "#9f8409",
          "800": "#84670f",
          "900": "#705413",
          "950": "#412d07",
          DEFAULT: "#effb46",
        },
        red: {
          "50": "#fef2f2",
          "100": "#fde3e3",
          "200": "#fdcbcb",
          "300": "#f99090",
          "400": "#f57474",
          "500": "#ec4747",
          "600": "#d82a2a",
          "700": "#b61f1f",
          "800": "#961e1e",
          "900": "#7d1f1f",
          "950": "#440b0b",
          DEFAULT: "#ec4747",
        },
        blue: {
          "50": "#f0f8ff",
          "100": "#e1f0fd",
          "200": "#bce1fb",
          "300": "#90d1f9",
          "400": "#3eb1f2",
          "500": "#1597e2",
          "600": "#0877c1",
          "700": "#085f9c",
          "800": "#0b5181",
          "900": "#0f446b",
          "950": "#0a2b47",
          DEFAULT: "#1597e2",
        },
        black: "#222222",
      },
      keyframes: {
        "slide-in": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0", transform: "translateX(100%)" },
        },
        progress: {
          "0%": { width: "100%" },
          "100%": { width: "0%" },
        },
      },
      animation: {
        "slide-in": "slide-in 0.3s forwards",
        "fade-out": "fade-out 0.3s ease-out",
        progress: "progressAnimation",
      },
    },
  },
  darkMod: "class",
  plugins: [nextui()],
};
export default config;
