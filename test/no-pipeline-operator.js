'use strict';

const rule = require('../lib/index').rules['no-pipeline-operator']
const RuleTester = require('eslint').RuleTester
const babelEslintParser = require('@babel/eslint-parser');

const ruleTester = new RuleTester({languageOptions: {parser: babelEslintParser}})

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
