'use strict';

var rule = require('../lib/index').rules['no-async-iteration']
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester({languageOptions: {ecmaVersion: 2018}})

ruleTester.run('no-async-iteration', rule, {
  valid: [
    {code: 'async function foo() { for(const a of b) {} }'},
  ],
  invalid: [
    {
      code: 'async function foo() { for await(const a of b) {} }',
      errors: [
        {
          message:
            'Async Iteration is not supported in undefined'
        }
      ]
    }
  ]
})
