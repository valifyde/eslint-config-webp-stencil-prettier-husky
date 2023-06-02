const base = require('./lib/base.js');
const stencil = require('./lib/stencil.js');
const prettier = require('./lib/prettier.js');

module.exports = {
  extends: ['airbnb-base', 'airbnb-typescript', 'plugin:@stencil-community/recommended', 'plugin:import/typescript', 'prettier'],
  plugins: ['prettier'],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  rules: {
    ...base,
    ...stencil,
    ...prettier,
  },
  settings: {},
};
