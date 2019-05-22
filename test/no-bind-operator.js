var rule = require('../lib/rules/no-bind-operator')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester({parser: 'babel-eslint', parserOptions: {ecmaVersion: 2018}})

ruleTester.run('no-bind-operator', rule, {
  valid: [
    {code: 'console.log.bind(console)'}, 
  ],
  invalid: [
    {
      code: 'console::log',
      errors: [
        {
          message:
            'The Bind Operator is not supported in undefined'
        }
      ]
    },
    {
      code: '::console.log',
      errors: [
        {
          message:
            'The Bind Operator is not supported in undefined'
        }
      ]
    }
  ]
})
