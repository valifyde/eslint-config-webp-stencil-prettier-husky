module.exports = {
  'semi': ['error', 'always'],
  'import/prefer-default-export': 'off',
  'class-methods-use-this': 'off',
  'import/no-extraneous-dependencies': [
    'error',
    {
      devDependencies: ['**/*.test.ts', '**/*.test.tsx'],
    },
  ],
  "@typescript-eslint/no-unused-vars": ["error", { 
    "varsIgnorePattern": "^h$"
  }],
};
