'use strict';

const rule = require('../lib/index').rules['no-computed-public-class-fields']
const RuleTester = require('eslint').RuleTester
const babelEslintParser = require('@babel/eslint-parser');

const ruleTesterBabel = new RuleTester({languageOptions: {parser: babelEslintParser}})
const ruleTester = new RuleTester({languageOptions: {ecmaVersion: 2022}})

const tests = {
  valid: [
    {code: 'class Foo { bar(){} }'},
    {code: 'class Foo { static bar() {} }'},
    {code: 'class Foo { ["bar"]() {} }'},
    {code: 'class Foo { static ["bar"]() {} }'},
    {code: 'class Foo { static bar = () => {} }'},
    {code: 'class Foo { static bar = 1 }'},
    {code: 'class Foo { bar = () => {} }'},
    {code: 'class Foo { bar = 1 }'},
  ],
  invalid: [
    {
      code: 'class Foo { ["bar"] = () => {} }',
      errors: [
        {
          message:
            'Computed Class Fields are not supported in undefined'
        }
      ]
    },
    {
      code: 'class Foo { ["bar"] = 1 }',
      errors: [
        {
          message:
          'Computed Class Fields are not supported in undefined'
        }
      ]
    },
    {
      code: 'class Foo { static ["bar"] = () => {} }',
      errors: [
        {
          message:
            'Computed Class Fields are not supported in undefined'
        }
      ]
    },
    {
      code: 'class Foo { static ["bar"] = 1 }',
      errors: [
        {
          message:
          'Computed Class Fields are not supported in undefined'
        }
      ]
    }
  ]
}

ruleTester.run('no-computed-public-class-fields', rule, tests)
ruleTesterBabel.run('no-computed-public-class-fields (babel)', rule, tests)
