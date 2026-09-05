import { RuleTester } from "eslint"
import babelEslintParser from "@babel/eslint-parser"

import Rule from '../lib/index.js'

const rule = /** @type {Required<import('eslint').ESLint.Plugin>} */ (
  Rule
).rules['no-optional-chaining']

const ruleTesterBabel = new RuleTester({languageOptions: {parser: babelEslintParser}})
const ruleTester = new RuleTester({languageOptions: {ecmaVersion: 2020}})

const tests = {
  valid: [
    {code: '(foo||{}).bar'},
  ],
  invalid: [
    {
      code: 'foo?.bar',
      errors: [
        {
          message:
            'Optional Chaining is not supported in undefined'
        }
      ]
    }
  ]
}

ruleTester.run('no-optional-chaining', rule, tests)
ruleTesterBabel.run('no-optional-chaining (babel)', rule, tests)
