var rule = require('../lib/rules/no-regexp-lookbehind')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester({parserOptions: {ecmaVersion: 2020}})

ruleTester.run('no-regexp-lookbehind', rule, {
  valid: [
    {code: '/(?:a)b/'},
    {code: '/(?:a)b/g'},
    {code: '/(?<named_group_not_checked_here>)/'},
    {code: 'RegExp("(?:a)b", "g")'},
    {code: 'RegExp("(?:a)b", "g")'},
    {code: 'RegExp("(?<named-group-not-checked-here>)")'},
  ],
  invalid: [
    {
      code: '/(?<=a)b/',
      errors: [
        {
          message: 'RegExp lookbehinds are not supported in undefined'
        }
      ]
    },
    {
      code: 'new RegExp("/(?<=a)b")',
      errors: [
        {
          message: 'RegExp lookbehinds are not supported in undefined'
        }
      ]
    },
    {
      code: '/(?<=a)b/g',
      errors: [
        {
          message: 'RegExp lookbehinds are not supported in undefined'
        }
      ]
    },
    {
      code: 'new RegExp("/(?<=a)b", "g")',
      errors: [
        {
          message: 'RegExp lookbehinds are not supported in undefined'
        }
      ]
    },
  ]
})
