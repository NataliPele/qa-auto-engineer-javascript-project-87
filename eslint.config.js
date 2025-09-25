import js from '@eslint/js'
import globals from 'globals'

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node, // console, process, __dirname и т.п.
      },
    },
    ignores: ['coverage/**', 'dist/**', 'node_modules/**'],
    rules: {
      ...js.configs.recommended.rules,
      'no-console': 'off',
      'no-var': 'error',
      'prefer-const': 'error',
    },
  },
  {
    files: ['**/__tests__/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest, // describe, test, expect и пр.
      },
    },
  },
]
