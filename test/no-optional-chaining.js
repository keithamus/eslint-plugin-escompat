'use strict';

const rule = require('../lib/index').rules['no-optional-chaining']
const RuleTester = require('eslint').RuleTester
const babelEslintParser = require('@babel/eslint-parser');

const ruleTesterBabel = new RuleTester({languageOptions: {parser: babelEslintParser}})
const ruleTester = new RuleTester({languageOptions: {ecmaVersion: 2020}})

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
