import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                utama: ['Poppins', ...defaultTheme.fontFamily.sans],
                hero: ['Lobster Two', ...defaultTheme.fontFamily.sans],
                rubik: ['Rubik', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'main': '#4F8A75',
                'main_dark': '#2E5445',
                'main_light': '#7AB49A',
                'main-white': '#F6F6F6',
                'putih': '#f2f2f2',
                'cream': '#FEE9DE',
                'kuning': '#F2C94C',
              },
        },
    },

    plugins: [
        forms,
        function ({ addBase, theme }) {
            addBase({
                ':root': {
                    '--color-main': theme('colors.main'),
                },
            });
        },
    ],
};


















