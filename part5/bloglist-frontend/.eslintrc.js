module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'jest/globals': true,
  },
  'extends': [
    'eslint:recommended',
    'google',
    'plugin:react/recommended',
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    'react', 'jest',
  ],
  'rules': {
    'no-undef': 0,
    'react/prop-types': 0,
  },
  'settings': {
    'react': {
      'version': 'detect',
    },
  },
};
