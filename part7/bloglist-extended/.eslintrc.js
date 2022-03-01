module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'google',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'jest', 'prettier'],
  rules: {
    'no-undef': 0,
    'react/prop-types': 0,
    'prettier/prettier': ['error'],
    'indent': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
