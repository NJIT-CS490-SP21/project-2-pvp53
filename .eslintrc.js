module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/no-array-index-key': 'off',
    'react-hooks/exhaustiSve-deps': 'off',
    'react/jsx-filename-extension': 'off',
    'import/no-cycle': 'off',
  },
};
