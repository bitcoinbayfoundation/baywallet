module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  globals: {
    localStorage: false,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        // 'no-shadow': 'off',
        'no-undef': 'off',
        'react-native/no-inline-styles': 0,
        'prettier/prettier': [
          'error',
          {
            'no-inline-styles': false,
          },
        ],
      },
    },
  ],
};
