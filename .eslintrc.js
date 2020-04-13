module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: "eslint:recommended",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    semi: 0,
    "array-bracket-newline": 1,
    "no-unused-vars": 1,
    "no-var": 2,
    "prefer-const": 2,
    "no-console": 0,
    "prefer-arrow-callback": 2,
    "no-useless-constructor": 2,
    "no-empty": 2,
    "no-sparse-arrays": 2,
    "no-else-return": 1,
    // "no-use-before-define": 2,
    "for-direction": 2,
    "valid-typeof": 2,
    "no-duplicate-case": 2,
    quotes: [1, "single"],
    "padded-blocks": [2, "never"]
  }
};
