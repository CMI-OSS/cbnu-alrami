module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: [ "@typescript-eslint" ],
  rules: {
    camelcase: 0,
    "@typescript-eslint/ban-types": 0,
    "no-await-in-loop": 0,
    "no-restricted-syntax": 0,
    "no-undef": 0,
    "@typescript-eslint/no-var-requires": "error",
  },
};
