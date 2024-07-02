'use strict';

var rule = require('../lib/index').rules['no-private-class-fields']
var RuleTester = require('eslint').RuleTester
var babelEslintParser = require('@babel/eslint-parser');

var ruleTesterBabel = new RuleTester({languageOptions: {parser: babelEslintParser}})
var ruleTester = new RuleTester({languageOptions: {ecmaVersion: 2022}})

const tests = {
  valid: [
    {code: 'class Foo { bar(){} }'},
    {code: 'class Foo { static bar() {} }'},
  ],
  invalid: [
    {
      code: 'class Foo { #bar = () => {} }',
      errors: [
        {
          message:
            'Private Class Fields are not supported in undefined'
        }
      ]
    },
    {
      code: 'class Foo { #bar = 1 }',
      errors: [
        {
          message:
          'Private Class Fields are not supported in undefined'
        }
      ]
    },
    {
      code: 'class Foo { static #bar = () => {} }',
      errors: [
        {
          message:
          'Private Class Fields are not supported in undefined'
        }
      ]
    },
    {
      code: 'class Foo { static #bar = 1 }',
      errors: [
        {
          message:
          'Private Class Fields are not supported in undefined'
        }
      ]
    }
  ]
}

ruleTester.run('no-private-class-fields', rule, tests)
ruleTesterBabel.run('no-private-class-fields (babel)', rule, tests)
