import Rule from '../lib/index.js'

import { RuleTester } from 'eslint'

const rule = Rule.rules['no-bigint-function']

const ruleTester = new RuleTester({languageOptions: {ecmaVersion: 2020}})

ruleTester.run('no-bigint-function', rule, {
  valid: [
    {code: 'bigint()'},
    {code: 'Bigint()'},
  ],
  invalid: [
    {
      code: "BigInt('1000000')",
      errors: [
        {
          message:
            'BigInt functions are not supported in undefined'
        }
      ]
    }
  ]
})
