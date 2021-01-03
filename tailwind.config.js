module.exports = {
    purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            boxShadow: {
                "inner-b" : "inset 0 -2px 4px 0 rgba(0, 0, 0, 0.06)"
            }
        },
        fontFamily: {
            "sans": "Arial, sans-serif"
        }
    },
    variants: {
        borderWidth: ["hover"]
    },
    plugins: []
}

