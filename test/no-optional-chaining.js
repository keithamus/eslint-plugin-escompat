'use strict';

var rule = require('../lib/index').rules['no-optional-chaining']
var RuleTester = require('eslint').RuleTester
var babelEslintParser = require('@babel/eslint-parser');

var ruleTesterBabel = new RuleTester({languageOptions: {parser: babelEslintParser}})
var ruleTester = new RuleTester({languageOptions: {ecmaVersion: 2020}})

const tests = {
  valid: [
    {code: '(foo||{}).bar'},
  ],
  invalid: [
    {
      code: 'foo?.bar',
      errors: [
        {
          message:
            'Optional Chaining is not supported in undefined'
        }
      ]
    }
  ]
}

ruleTester.run('no-optional-chaining', rule, tests)
ruleTesterBabel.run('no-optional-chaining (babel)', rule, tests)
