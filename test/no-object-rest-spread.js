'use strict';

const rule = require('../lib/index').rules['no-object-rest-spread']
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({languageOptions: {ecmaVersion: 2019}})

ruleTester.run('no-object-rest-spread', rule, {
  valid: [
    {code:'const x = { a, b, c }'},
    {code:'const { a, b, c } = x'},
    {code:'const x = [...[1], ...[2]]'},
    {code:'const [x, ...y] = [1,2,3]'},
  ],
  invalid: [
    {
      code: 'const x = { ...b }',
      errors: [
        {
          message:
            'Object Rest/Spread is not supported in undefined'
        }
      ]
    },
    {
      code: 'const { ...b } = x',
      errors: [
        {
          message:
            'Object Rest/Spread is not supported in undefined'
        }
      ]
    }
  ]
})
