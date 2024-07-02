'use strict';

var rule = require('../lib/index').rules['no-exponentiation-operator']
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester({languageOptions: {ecmaVersion: 2018}})

ruleTester.run('no-exponentiation-operator', rule, {
  valid: [
    {code: 'Math.pow(2, 2)'},
    {code: '2 * 2 * 2'},
    {code: 'a = Math.pow(a * 2)'},
    {code: 'a = a * 2 * 2'},
  ],
  invalid: [
    {
      code: '2 ** 2',
      errors: [
        {
          message:
            'Exponentiation Operator is not supported in undefined'
        }
      ]
    },
    {
      code: 'a **= 2',
      errors: [
        {
          message:
            'Exponentiation Operator is not supported in undefined'
        }
      ]
    }
  ]
})
