import { RuleTester } from "eslint"
import babelEslintParser from "@babel/eslint-parser"

import Rule from '../lib/index.js'

const rule = /** @type {Required<import('eslint').ESLint.Plugin>} */ (
  Rule
).rules['no-pipeline-operator']

const ruleTester = new RuleTester({languageOptions: {parser: babelEslintParser}})

ruleTester.run('no-pipeline-operator', rule, {
  valid: [
    {code: 'bar(foo)'},
  ],
  invalid: [
    {
      code: 'foo |> bar(^^)',
      errors: [
        {
          message:
            'The Pipeline Operator is not supported in undefined'
        }
      ]
    }
  ]
})
