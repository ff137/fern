const path = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{ts,tsx}",
        path.join(path.dirname(require.resolve("@fern-api/ui")), "../src/**/*.{ts,tsx}"),
    ],
    theme: {
        extend: {},
        colors: ({ colors }) => {
            return {
                ...colors,
                accentPrimary: withOpacity("--accent-primary"),
                accentHighlight: "rgba(var(--accent-primary), 10%)",
            };
        },
    },
    plugins: [require("@tailwindcss/typography")],
};

// https://stackoverflow.com/a/72831219/4238485
function withOpacity(variableName) {
    return ({ opacityValue }) => {
        if (opacityValue !== undefined) {
            return `rgba(var(${variableName}), ${opacityValue})`;
        }
        return `rgb(var(${variableName}))`;
    };
}
