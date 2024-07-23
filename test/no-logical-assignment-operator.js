'use strict';

const rule = require('../lib/index').rules['no-logical-assignment-operator']
const RuleTester = require('eslint').RuleTester

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
