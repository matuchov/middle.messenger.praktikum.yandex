module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'no-underscore-dangle': 'off',
    'no-restricted-syntax': 'off',
    'class-methods-use-this': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {}, // чтобы ESLint понимал TS alias'ы
    },
  },
};
