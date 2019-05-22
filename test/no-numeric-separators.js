var rule = require('../lib/rules/no-numeric-separators')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester({parser: 'babel-eslint', parserOptions: {ecmaVersion: 2018}})

ruleTester.run('no-numeric-separators', rule, {
  valid: [
    {code: '100000000'}, 
    {code: '1.00000000'}, 
    {code: '1e8'}, 
  ],
  invalid: [
    {
      code: '100_000_000',
      errors: [
        {
          message:
            'Numeric Separators are not supported in undefined'
        }
      ]
    },
    {
      code: '1_000_000',
      errors: [
        {
          message:
          'Numeric Separators are not supported in undefined'
        }
      ]
    },
    {
      code: '100_0',
      errors: [
        {
          message:
          'Numeric Separators are not supported in undefined'
        }
      ]
    },
    {
      code: '100_000_000',
      errors: [
        {
          message:
          'Numeric Separators are not supported in undefined'
        }
      ]
    }
  ]
})
