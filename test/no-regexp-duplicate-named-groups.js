'use strict';

const rule = require('../lib/index').rules['no-regexp-duplicate-named-groups']
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({languageOptions: {ecmaVersion: 2025}})

ruleTester.run('no-regexp-duplicate-named-groups', rule, {
  valid: [
    {code: '/(?:a)/'},
    {code: '/(?:a)/g'},
    {code: 'RegExp("(?:a)b")'},
    {code: 'RegExp("(?:a)b", "g")'},
    {code: '/(?<name>a)/'},
    {code: 'RegExp("(?<name>a)")'},
    {code: '/(?<name>a)|(?<anotherName>a)/'},
  ],
  invalid: [
    {
      code: '/(?<name>a)|(?<name>b)/',
      errors: [
        {
          message: 'RegExp duplicate named groups are not supported in undefined'
        }
      ]
    },
    {
      code: 'new RegExp("(?<name>a)|(?<name>b)")',
      errors: [
        {
          message: 'RegExp duplicate named groups are not supported in undefined'
        }
      ]
    },
    {
      code: '/(?<$name>a)|(?<$name>b)/',
      errors: [
        {
          message: 'RegExp duplicate named groups are not supported in undefined'
        }
      ]
    },
    {
      code: '/(?<_name>)|(?<_name>)/',
      errors: [
        {
          message: 'RegExp duplicate named groups are not supported in undefined'
        }
      ]
    },
  ]
})
