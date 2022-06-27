var rule = require('../lib/rules/no-optional-chaining')
var RuleTester = require('eslint').RuleTester

var ruleTesterBabel = new RuleTester({parser: require.resolve('@babel/eslint-parser')})
var ruleTester = new RuleTester({parserOptions: {ecmaVersion: 2020}})

const tests = {
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
}

ruleTester.run('no-optional-chaining', rule, tests)
ruleTesterBabel.run('no-optional-chaining (babel)', rule, tests)
