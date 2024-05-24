module.exports = {
  extends: ['eslint:recommended', 'airbnb-base', 'prettier'],
  overrides: [
    {
      files: ['src/**/*.test.js'],
      extends: ['plugin:jest/all'],
    },
  ],
  globals: {
    browser: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
};
