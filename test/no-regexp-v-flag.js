'use strict';

const rule = require('../lib/index').rules['no-regexp-v-flag']
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({languageOptions: {ecmaVersion: 2024}})

ruleTester.run('no-regexp-v-flag', rule, {
  valid: [
    {code: '/foo.bar/'},
    {code: '/foo.bar/g'},
    {code: 'new RegExp("foo.bar")'},
    {code: 'new RegExp("foo.bar", flags)'},
    {code: 'new RegExp("foo.bar", "u")'},
    {code: 'new RegExp("foo.bar", "g")'},
    {code: 'RegExp("foo.bar", "g")'},
  ],
  invalid: [
    {
      code: '/foo.bar/v',
      errors: [
        {
          message: 'RegExp "v" flag is not supported in undefined'
        }
      ]
    },
    {
      code: 'new RegExp("foo.bar", "v")',
      errors: [
        {
          message: 'RegExp "v" flag is not supported in undefined'
        }
      ]
    },
    {
      code: 'new RegExp("foo.bar", `v`)',
      errors: [
        {
          message: 'RegExp "v" flag is not supported in undefined'
        }
      ]
    },
    {
      code: 'RegExp("foo.bar", "v")',
      errors: [
        {
          message: 'RegExp "v" flag is not supported in undefined'
        }
      ]
    },
  ]
})
