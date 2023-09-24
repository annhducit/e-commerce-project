/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                "banner-advertiment": "url('/src/assets/images/men-adv.jpeg')",
            },
        },
    },
    plugins: [],
};
