var rule = require('../lib/rules/no-private-class-fields')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester({parser: 'babel-eslint', parserOptions: {ecmaVersion: 2018}})

ruleTester.run('no-private-class-fields', rule, {
  valid: [
    {code: 'class Foo { bar(){} }'}, 
    {code: 'class Foo { static bar() {} }'},
  ],
  invalid: [
    {
      code: 'class Foo { #bar = () => {} }',
      errors: [
        {
          message:
            'Private Class Fields are not supported in undefined'
        }
      ]
    },
    {
      code: 'class Foo { #bar = 1 }',
      errors: [
        {
          message:
          'Private Class Fields are not supported in undefined'
        }
      ]
    },
    {
      code: 'class Foo { static #bar = () => {} }',
      errors: [
        {
          message:
          'Private Class Fields are not supported in undefined'
        }
      ]
    },
    {
      code: 'class Foo { static #bar = 1 }',
      errors: [
        {
          message:
          'Private Class Fields are not supported in undefined'
        }
      ]
    }
  ]
})
