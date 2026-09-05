import { RuleTester } from "eslint"

import Rule from '../lib/index.js'

const rule = /** @type {Required<import('eslint').ESLint.Plugin>} */ (
  Rule
).rules['no-nullish-coalescing']

const ruleTester = new RuleTester({languageOptions: {ecmaVersion: 2020}})

ruleTester.run('no-nullish-coalescing', rule, {
  valid: [
    {code: 'foo !== undefined && foo !== null ? foo : 1'},
  ],
  invalid: [
    {
      code: 'foo ?? 1',
      errors: [
        {
          message:
            'the Nullish Coalescing Operator is not supported in undefined'
        }
      ]
    }
  ]
})
