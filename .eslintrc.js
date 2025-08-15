module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // Override indent rule to use 2 spaces (matching current codebase)
    indent: ['error', 2],
    // Disable rules that might conflict with React app defaults
    'import/no-anonymous-default-export': 'warn',
    'no-unused-vars': 'warn',
    'consistent-return': 'off',
    // Jest specific rules
    'jest/no-jest-import': 'off',
  },
  env: {
    browser: true,
    es6: true,
    es2022: true,
    mocha: true,
    node: true,
    jest: true,
  },
};
