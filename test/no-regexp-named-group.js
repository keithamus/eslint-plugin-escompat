'use strict';

const rule = require('../lib/index').rules['no-regexp-named-group']
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({languageOptions: {ecmaVersion: 2020}})

ruleTester.run('no-regexp-named-group', rule, {
  valid: [
    {code: '/(?:a)/'},
    {code: '/(?:a)/g'},
    {code: 'RegExp("(?:a)b")'},
    {code: 'RegExp("(?:a)b", "g")'},
  ],
  invalid: [
    {
      code: '/(?<name>)/',
      errors: [
        {
          message: 'RegExp named groups are not supported in undefined'
        }
      ]
    },
    {
      code: 'new RegExp("(?<name>)")',
      errors: [
        {
          message: 'RegExp named groups are not supported in undefined'
        }
      ]
    },
    {
      code: '/(?<$name>)/',
      errors: [
        {
          message: 'RegExp named groups are not supported in undefined'
        }
      ]
    },
    {
      code: '/(?<_name>)/',
      errors: [
        {
          message: 'RegExp named groups are not supported in undefined'
        }
      ]
    },
  ]
})
