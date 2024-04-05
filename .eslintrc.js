module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: [
    '@stylistic',
  ],
  rules: {
    'linebreak-style': 0,
    'prefer-const': 'off',
    'no-use-before-define': 'off',
    'no-undef': 'off',
    '@stylistic/indent': ['error', 2],
  },
};
