'use strict';

var rule = require('../lib/index').rules['no-async-generator']
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester({languageOptions: {ecmaVersion: 2018}})

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
