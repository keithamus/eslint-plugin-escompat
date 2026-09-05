import { RuleTester } from "eslint"

import Rule from '../lib/index.js'

const rule = /** @type {Required<import('eslint').ESLint.Plugin>} */ (
  Rule
).rules['no-logical-assignment-operator']

const ruleTester = new RuleTester({languageOptions: {ecmaVersion: 2021}})

ruleTester.run('no-logical-assignment-operator', rule, {
  valid: [
    {code: 'a = a || b'},
    {code: 'a = a && b'},
    {code: 'a = a ?? b'},
  ],
  invalid: [
    {
      code: 'a ||= b',
      errors: [
        {
          message:
            'Logical assignment operators are not supported in undefined'
        }
      ]
    },
    {
      code: 'a &&= b',
      errors: [
        {
          message:
            'Logical assignment operators are not supported in undefined'
        }
      ]
    },
    {
      code: 'a ??= b',
      errors: [
        {
          message:
            'Logical assignment operators are not supported in undefined'
        }
      ]
    }
  ]
})
