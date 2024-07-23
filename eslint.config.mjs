import eslint from "@eslint/js";
import globals from "globals";

export default [
  eslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.es2015,
        ...globals.node
      },
      sourceType: 'script',
      ecmaVersion: 2022
    }
  },
  {
    files: ['**/*.mjs'],
    languageOptions: {
      sourceType: 'module'
    }
  },
  {
    files: ['**/*.js'],
    rules: {
      strict: ['error', 'global']
    }
  }
]
