var rule = require('../lib/rules/no-public-static-class-fields')
var RuleTester = require('eslint').RuleTester

var ruleTesterBabel = new RuleTester({parser: require.resolve('@babel/eslint-parser')})
var ruleTester = new RuleTester({parserOptions: {ecmaVersion: 2022}})

const tests = {
  valid: [
    {code: 'class Foo { bar(){} }'}, 
    {code: 'class Foo { static bar() {} }'},
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
}

ruleTester.run('no-public-static-class-fields', rule, tests)
ruleTesterBabel.run('no-public-static-class-fields', rule, {
  valid: [
    ...tests.valid,
    // This doesn't catch instance class fields.
    // TODO: fixme
    // {code: 'class Foo { bar: AType }'},
  ],
  invalid: [
    ...tests.invalid
  ]
})
