import { RuleTester } from "eslint"
import babelEslintParser from "@babel/eslint-parser"

import Rule from '../lib/index.js'
const rule = /** @type {Required<import('eslint').ESLint.Plugin>} */ (
  Rule
).rules['no-numeric-separators']

const ruleTesterBabel = new RuleTester({ languageOptions: {parser: babelEslintParser} })
const ruleTester = new RuleTester({languageOptions: {sourceType: 'module', ecmaVersion: 2021}})

const tests = {
  valid: [
    {code: '100000000'},
    {code: '1.00000000'},
    {code: '1e8'},
    {code: '"1_000_000"'},
    {code: '0'},
  ],
  invalid: [
    {
      code: '100_000_000',
      output: '100000000',
      errors: [
        {
          message:
            'Numeric Separators are not supported in undefined'
        }
      ]
    },
    {
      code: '1_000_000',
      output: '1000000',
      errors: [
        {
          message:
          'Numeric Separators are not supported in undefined'
        }
      ]
    },
    {
      code: '100_0',
      output: '1000',
      errors: [
        {
          message:
          'Numeric Separators are not supported in undefined'
        }
      ]
    }
  ]
}

ruleTester.run('no-numeric-separators (babel)', rule, tests)
ruleTesterBabel.run('no-numeric-separators (babel)', rule, tests)
