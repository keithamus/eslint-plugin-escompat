'use strict';

const rule = require('../lib/index').rules['no-do-expression']
const RuleTester = require('eslint').RuleTester
const babelEslintParser = require('@babel/eslint-parser');

const ruleTester = new RuleTester({languageOptions: {ecmaVersion: 2018, parser: babelEslintParser}})

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
