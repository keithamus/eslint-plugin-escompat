var rule = require('../lib/rules/no-nullish-coalescing')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester({parserOptions: {ecmaVersion: 2020}})

ruleTester.run('no-nullish-coalescing', rule, {
  valid: [
    {code: 'foo !== undefined && foo !== null ? foo : 1'},
  ],
  invalid: [
    {
      code: 'foo ?? 1',
      errors: [
        {
          message:
            'the Nullish Coalescing Operator is not supported in undefined'
        }
      ]
    }
  ]
})
