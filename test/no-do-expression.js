var rule = require('../lib/rules/no-do-expression')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester({parser: require.resolve('babel-eslint'), parserOptions: {ecmaVersion: 2018}})

ruleTester.run('no-do-expression', rule, {
  valid: [
    {code: '() => { return 1 > 0 }'}, 
  ],
  invalid: [
    {
      code: '() => { return do { return 1 > 0 } === true }',
      errors: [
        {
          message:
            'Do Expressions are not supported in undefined'
        }
      ]
    }
  ]
})
