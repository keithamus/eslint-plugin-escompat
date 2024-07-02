'use strict';

const rule = require('../lib/index').rules['no-bigint']
const RuleTester = require('eslint').RuleTester

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
