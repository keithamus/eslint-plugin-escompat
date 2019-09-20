var rule = require('../lib/rules/no-regexp-s-flag')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester({parserOptions: {ecmaVersion: 2018}})

ruleTester.run('no-regexp-s-flag', rule, {
  valid: [
    {code: '/foo.bar/'},
    {code: '/foo.bar/g'},
    {code: 'new RegExp("foo.bar")'},
    {code: 'new RegExp("foo.bar", "u")'},
    {code: 'new RegExp("foo.bar", "g")'},
    {code: 'RegExp("foo.bar", "g")'},
  ],
  invalid: [
    {
      code: '/foo.bar/s',
      errors: [
        {
          message: 'RegExp "s" flag is not supported in undefined'
        }
      ]
    },
    {
      code: 'new RegExp("foo.bar", "s")',
      errors: [
        {
          message: 'RegExp "s" flag is not supported in undefined'
        }
      ]
    },
    {
      code: 'RegExp("foo.bar", "s")',
      errors: [
        {
          message: 'RegExp "s" flag is not supported in undefined'
        }
      ]
    },
  ]
})
