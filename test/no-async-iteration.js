var rule = require('../lib/rules/no-async-iteration')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester({parserOptions: {ecmaVersion: 2018}})

ruleTester.run('no-async-generator', rule, {
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
