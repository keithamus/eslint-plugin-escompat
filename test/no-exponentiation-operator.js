var rule = require('../lib/rules/no-exponentiation-operator')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester({parserOptions: {ecmaVersion: 2018}})

ruleTester.run('no-exponentiation-operator', rule, {
  valid: [
    {code: 'Math.pow(2, 2)'},
    {code: '2 * 2 * 2'},
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
    }
  ]
})
