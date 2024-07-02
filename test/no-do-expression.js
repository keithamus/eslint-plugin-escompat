'use strict';

var rule = require('../lib/index').rules['no-do-expression']
var RuleTester = require('eslint').RuleTester
var babelEslintParser = require('@babel/eslint-parser');

var ruleTester = new RuleTester({languageOptions: {ecmaVersion: 2018, parser: babelEslintParser}})

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
