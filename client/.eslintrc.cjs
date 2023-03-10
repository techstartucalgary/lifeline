// eslint-disable-next-line no-undef
module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "react-app",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "overrides": [
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint",
  ],
  "rules": {
    "indent": ["error", 2],
    "react/prop-types": "off",
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "double"],
    "camelcase": ["error", { "ignoreImports": true }],
    "semi": ["error", "always"],
    "semi-style": ["error", "last"],
    "curly": ["error", "multi-line"],
    "react/react-in-jsx-scope": "off",
    "multiline-comment-style": ["error", "separate-lines"],
    "no-eval": "error",
    "no-lone-blocks": "error",
    "no-var": "error",
    "arrow-spacing": "error",
    "block-spacing": "error",
    "func-call-spacing": ["error", "never"],
    "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
    "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
    "space-before-blocks": "error",
    "no-irregular-whitespace": "error",
    "max-depth": ["error", 4],
    "func-style": ["error", "expression"],
    "max-statements": ["error", 22],
    "no-confusing-arrow": "error",
    "no-empty-function": "error",
    "no-trailing-spaces": "error",
    "no-whitespace-before-property": "error",
    "max-lines": ["error", { "max": 250, "skipComments": true, "skipBlankLines": true }],
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        "alphabetize": {
          order: "asc",
          caseInsensitive: false
        }
      }
    ],
  }
};
