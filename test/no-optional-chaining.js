var rule = require('../lib/rules/no-optional-chaining')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester({parser: require.resolve('babel-eslint'), parserOptions: {ecmaVersion: 2018}})

ruleTester.run('no-optional-chaining', rule, {
  valid: [
    {code: '(foo||{}).bar'}, 
  ],
  invalid: [
    {
      code: 'foo?.bar',
      errors: [
        {
          message:
            'Optional Chaining is not supported in undefined'
        }
      ]
    }
  ]
})
