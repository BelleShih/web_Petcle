module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'one-var': 'off',
    'prettier/prettier': 'off',
    'generator-star-spacing': 'off',
    'arrow-parens': 'off',
    'space-before-function-paren': 'off',
    'comma-dangle': 'off'
  }
}
