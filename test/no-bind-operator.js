'use strict';

var rule = require('../lib/index').rules['no-bind-operator']
var RuleTester = require('eslint').RuleTester
var babelEslintParser = require('@babel/eslint-parser');

var ruleTester = new RuleTester({languageOptions: {ecmaVersion: 2018, parser: babelEslintParser}})

ruleTester.run('no-bind-operator', rule, {
  valid: [
    {code: 'console.log.bind(console)'},
    {code: 'console.log.call(console)'},
  ],
  invalid: [
    {
      code: 'console::log',
      errors: [
        {
          message:
            'The Bind Operator is not supported in undefined'
        }
      ]
    },
    {
      code: '::console.log',
      errors: [
        {
          message:
            'The Bind Operator is not supported in undefined'
        }
      ]
    },
    {
      code: 'console::log(1)',
      errors: [
        {
          message:
            'The Bind Operator is not supported in undefined'
        }
      ]
    },
    {
      code: '::console.log(1)',
      errors: [
        {
          message:
            'The Bind Operator is not supported in undefined'
        }
      ]
    },
  ]
})
