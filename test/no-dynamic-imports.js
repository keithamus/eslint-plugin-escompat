var rule = require('../lib/rules/no-dynamic-imports')
var RuleTester = require('eslint').RuleTester

var ruleTesterBabel = new RuleTester({ parser: require.resolve('@babel/eslint-parser') })
var ruleTester = new RuleTester({parserOptions: {sourceType: 'module', ecmaVersion: 2020}})

const tests = {
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
}

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

ruleTester.run('no-dynamic-imports', rule, tests)
ruleTesterBabel.run('no-dynamic-imports', rule, tests)
