import eslint from "@eslint/js";
import globals from "globals";

export default [
  eslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.es2015,
        ...globals.node,
        ...globals.mocha
      },
      sourceType: "module",
      ecmaVersion: 2025
    }
  }
]
