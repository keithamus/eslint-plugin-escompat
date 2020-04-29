var rule = require('../lib/rules/no-bigint')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester({parserOptions: {ecmaVersion: 2020}})

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
