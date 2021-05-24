module.exports = {
  "parser": "vue-eslint-parser",
  extends: [
    '@vue/typescript/recommended',
  ],
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module"
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
};
