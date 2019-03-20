const customRules = {
  'no-underscore-dangle': 'off',
  'array-callback-return': 'off',
  'no-loop-func': 'off',
  'class-methods-use-this': 'off',
  'no-restricted-syntax': 'off',
  'import/no-extraneous-dependencies': 'off',
  'no-continue': 'off',
  'no-param-reassign': 'off',
};

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': 'off',
    'no-plusplus': 'off',
    'prefer-destructuring': 'off',
    ...customRules,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
