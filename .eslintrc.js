module.exports = {
    root: true,
    env: {
        node: true
    },
    "extends": [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "@vue/typescript/recommended"
    ],
    rules: {
        "@typescript-eslint/ban-ts-ignore": "off",
        "array-bracket-newline": ["error", "consistent"],
        "array-bracket-spacing": ["error"],
        "array-element-newline": ["error", "consistent"],
        "brace-style": ["error", "1tbs", {
            allowSingleLine: false
        }],
        camelcase: ["error", {
            properties: "never",
            ignoreDestructuring: false
        }],
        "comma-dangle": ["error"],
        "comma-style": ["error"],
        "computed-property-spacing": ["error", "never"],
        "consistent-this": ["error", "self"],
        curly: ["error", "all"],
        eqeqeq: 0,
        "func-call-spacing": ["error", "never"],
        "func-name-matching": ["error", "always", {
            considerPropertyDescriptor: true,
            includeCommonJSModuleExports: true
        }],
        "function-paren-newline": ["error", "consistent"],
        "handle-callback-err": 0,
        "implicit-arrow-linebreak": ["error", "beside"],
        indent: ["error", 4, {
            SwitchCase: 1,
            flatTernaryExpressions: true
        }],
        "linebreak-style": ["error"],
        "new-cap": "error",
        "newline-per-chained-call": 0,
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-multi-str": 0,
        "no-fallthrough": 0,
        "no-return-assign": 0,
        "prefer-const": "error",
        "no-undef": 0,
        "no-empty-pattern": 0,
        quotes: ["error", "double", {
            avoidEscape: true,
            allowTemplateLiterals: true
        }],
        "space-infix-ops": "error",
        "no-multi-spaces": ["error", { exceptions: { "Property": false } }],
        "space-before-blocks": "error",
        "keyword-spacing": ["error", { "before": true }],
        "space-before-function-paren": ["error", "never"],
        "space-in-parens": ["error", "never"],
        "object-curly-spacing": ["error", "always"],
        "comma-spacing": ["error", { "before": false, "after": true }],
        "arrow-spacing": "error",
        "no-useless-escape": 0,
        "vue/no-v-html": 0,
        "vue/html-indent": ["error", 4, {
            "attribute": 1,
            "closeBracket": 0,
            "alignAttributesVertically": true
        }],
        "vue/max-attributes-per-line": ["warn", {
            "singleline": 3,
            "multiline": {
                "max": 1,
                "allowFirstLine": false
            }
        }]
    },
    globals: {
        accounting: true,
        axios: true,
        moment: true,
        window: true
    }
}
