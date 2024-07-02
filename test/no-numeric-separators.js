'use strict';

var rule = require('../lib/index').rules['no-numeric-separators']
var RuleTester = require('eslint').RuleTester
var babelEslintParser = require('@babel/eslint-parser');

var ruleTesterBabel = new RuleTester({ languageOptions: {parser: babelEslintParser} })
var ruleTester = new RuleTester({languageOptions: {sourceType: 'module', ecmaVersion: 2021}})

const tests = {
  valid: [
    {code: '100000000'},
    {code: '1.00000000'},
    {code: '1e8'},
    {code: '"1_000_000"'},
    {code: '0'},
  ],
  invalid: [
    {
      code: '100_000_000',
      output: '100000000',
      errors: [
        {
          message:
            'Numeric Separators are not supported in undefined'
        }
      ]
    },
    {
      code: '1_000_000',
      output: '1000000',
      errors: [
        {
          message:
          'Numeric Separators are not supported in undefined'
        }
      ]
    },
    {
      code: '100_0',
      output: '1000',
      errors: [
        {
          message:
          'Numeric Separators are not supported in undefined'
        }
      ]
    }
  ]
}

ruleTester.run('no-numeric-separators (babel)', rule, tests)
ruleTesterBabel.run('no-numeric-separators (babel)', rule, tests)
