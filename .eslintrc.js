module.exports = {
  extends: ['eslint:recommended', 'airbnb-base', 'prettier'],
  overrides: [
    {
      files: ['src/**/*.test.js'],
      extends: ['plugin:jest/all'],
      rules: {
        'jest/prefer-expect-assertions': [
          'warn',
          {
            onlyFunctionsWithAsyncKeyword: true,
            onlyFunctionsWithExpectInLoop: true,
            onlyFunctionsWithExpectInCallback: true,
          },
        ],
      },
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
