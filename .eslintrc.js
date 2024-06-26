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
        'jest/no-hooks': ['off'],
      },
    },
  ],
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-param-reassign': ['error', { props: false }],
  },
};
