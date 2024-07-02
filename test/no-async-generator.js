'use strict';

const rule = require('../lib/index').rules['no-async-generator']
const RuleTester = require('eslint').RuleTester

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
