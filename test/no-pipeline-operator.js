'use strict';

var rule = require('../lib/index').rules['no-pipeline-operator']
var RuleTester = require('eslint').RuleTester
var babelEslintParser = require('@babel/eslint-parser');

var ruleTester = new RuleTester({languageOptions: {parser: babelEslintParser}})

ruleTester.run('no-pipeline-operator', rule, {
  valid: [
    {code: 'bar(foo)'},
  ],
  invalid: [
    {
      code: 'foo |> bar(^^)',
      errors: [
        {
          message:
            'The Pipeline Operator is not supported in undefined'
        }
      ]
    }
  ]
})
