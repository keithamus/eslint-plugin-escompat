var rule = require('../lib/rules/no-pipeline-operator')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester({parser: 'babel-eslint', parserOptions: {ecmaVersion: 2018}})

ruleTester.run('no-pipeline-operator', rule, {
  valid: [
    {code: 'bar(foo)'}, 
  ],
  invalid: [
    {
      code: 'foo |> bar',
      errors: [
        {
          message:
            'The Pipeline Operator is not supported in undefined'
        }
      ]
    }
  ]
})
