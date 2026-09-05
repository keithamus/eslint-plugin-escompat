import Rule from '../lib/index.js'

import { RuleTester } from 'eslint'

const rule = /** @type {Required<import('eslint').ESLint.Plugin>} */ (
  Rule
).rules['no-bigint']

const ruleTester = new RuleTester({languageOptions: {ecmaVersion: 2020}})

ruleTester.run('no-bigint', rule, {
  valid: [
    {code: '0'},
    {code: '1000000'},
  ],
  invalid: [
    {
      code: '0n',
      errors: [
        {
          message:
            'BigInts are not supported in undefined'
        }
      ]
    }
  ]
})
