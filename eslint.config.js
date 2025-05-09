export default [
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
        },
        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
        files: ["**/*.js"],
        rules: {
            quotes: ["error", "double", { avoidEscape: true }],
        },
    },
];
