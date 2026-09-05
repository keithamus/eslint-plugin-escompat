import { RuleTester } from 'eslint'

import Rule from '../lib/index.js'

const rule = Rule.rules['no-async-generator']

const ruleTester = new RuleTester({languageOptions: {ecmaVersion: 2018}})

ruleTester.run('no-async-generator', rule, {
  valid: [
    {code: 'function*generator(){yield 42;}'},
    {code: 'async function generator(){await 42;}'},
  ],
  invalid: [
    {
      code: 'async function*generator(){yield 42;}',
      errors: [
        {
          message:
            'Async Generators are not supported in undefined'
        }
      ]
    }
  ]
})
