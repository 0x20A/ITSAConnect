/** @type {import('tailwindcss').Config} */
import { defineConfig } from 'tailwindcss';
import flowbiteReact from "flowbite-react/plugin/tailwindcss";

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        ".flowbite-react\\class-list.json"
    ],
    theme: {
        extend: {
        colors: {
            'white': '#FFFFFF',
            'black': '#242424',
            'grey': '#F3F3F3',
            'stone': '#D6D6D6',
            'dark-grey': '#6B6B6B',
            'red': '#FF4E4E',
            'transparent': 'transparent',
            'twitter': '#1DA1F2',
            'purple': '#8B46FF',
            'cyan': '#67E8F9',
        },

        fontSize: {
            'sm': '12px',
            'base': '14px',
            'xl': '16px',
            '2xl': '20px',
            '3xl': '28px',
            '4xl': '38px',
            '5xl': '50px',
        },
        fontFamily: {
            inter: ["'Inter'", "sans-serif"],
            gelasio: ["'Gelasio'", "serif"]
        },
    },
},
    plugins: [flowbiteReact],
};