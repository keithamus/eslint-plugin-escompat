var rule = require('../lib/rules/no-public-instance-class-fields')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester({parser: require.resolve('babel-eslint'), parserOptions: {ecmaVersion: 2018}})

ruleTester.run('no-public-class-fields', rule, {
  valid: [
    {code: 'class Foo { bar(){} }'}, 
    {code: 'class Foo { static bar() {} }'},
    {code: 'class Foo { bar: AType }'},
    // This doesn't catch static class fields.
    {code: 'class Foo { static bar: AType }'},
    {code: 'class Foo { static bar = () => {} }'},
    {code: 'class Foo { static bar = 1 }'},
  ],
  invalid: [
    {
      code: 'class Foo { bar = () => {} }',
      errors: [
        {
          message:
            'Instance Class Fields are not supported in undefined'
        }
      ]
    },
    {
      code: 'class Foo { bar = 1 }',
      errors: [
        {
          message:
          'Instance Class Fields are not supported in undefined'
        }
      ]
    }
  ]
})
