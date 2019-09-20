var rule = require('../lib/rules/no-dynamic-imports')
var RuleTester = require('eslint').RuleTester

var ruleTesterBabel = new RuleTester({ parser: require.resolve('babel-eslint') })
var ruleTester = new RuleTester({parserOptions: {sourceType: 'module', ecmaVersion: 2020}})

ruleTester.run('no-dynamic-imports', rule, {
  valid: [
    {code: 'import foo from "foo"'}, 
    {code: 'Import("foo").then'}, 
    {code: 'System.import("foo").then'}, 
  ],
  invalid: [
    {
      code: 'import("foo")',
      errors: [
        {
          message:
            'Dynamic import is not supported in undefined'
        }
      ]
    }
  ]
})

ruleTesterBabel.run('no-dynamic-imports (babel)', rule, {
  valid: [
    {code: 'import foo from "foo"'}, 
    {code: 'Import("foo").then'}, 
    {code: 'System.import("foo").then'}, 
  ],
  invalid: [
    {
      code: 'import("foo")',
      errors: [
        {
          message:
            'Dynamic import is not supported in undefined'
        }
      ]
    }
  ]
})
