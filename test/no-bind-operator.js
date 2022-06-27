var rule = require('../lib/rules/no-bind-operator')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester({parser: require.resolve('@babel/eslint-parser'), parserOptions: {ecmaVersion: 2018}})

ruleTester.run('no-bind-operator', rule, {
  valid: [
    {code: 'console.log.bind(console)'}, 
    {code: 'console.log.call(console)'}, 
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
    },
    {
      code: 'console::log(1)',
      errors: [
        {
          message:
            'The Bind Operator is not supported in undefined'
        }
      ]
    },
    {
      code: '::console.log(1)',
      errors: [
        {
          message:
            'The Bind Operator is not supported in undefined'
        }
      ]
    },
  ]
})
