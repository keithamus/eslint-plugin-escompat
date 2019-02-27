var rule = require('../lib/rules/no-object-rest-spread')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester({parserOptions: {ecmaVersion: 2019}})

ruleTester.run('no-object-rest-spread', rule, {
  valid: [
    {code:'const x = { a, b, c }'},
    {code:'const { a, b, c } = x'},
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
