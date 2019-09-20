var rule = require('../lib/rules/no-public-static-class-fields')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester({parser: 'babel-eslint', parserOptions: {ecmaVersion: 2018}})

ruleTester.run('no-public-class-fields', rule, {
  valid: [
    {code: 'class Foo { bar(){} }'}, 
    {code: 'class Foo { static bar() {} }'},
    // This doesn't catch instance class fields.
    {code: 'class Foo { bar: AType }'},
    {code: 'class Foo { bar = () => {} }'},
    {code: 'class Foo { bar = 1 }'},
  ],
  invalid: [
    {
      code: 'class Foo { static bar = () => {} }',
      errors: [
        {
          message:
          'Static Class Fields are not supported in undefined'
        }
      ]
    },
    {
      code: 'class Foo { static bar = 1 }',
      errors: [
        {
          message:
          'Static Class Fields are not supported in undefined'
        }
      ]
    }
  ]
})
