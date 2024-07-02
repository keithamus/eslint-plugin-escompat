'use strict';

var rule = require('../lib/index').rules['no-public-instance-class-fields']
var RuleTester = require('eslint').RuleTester
var babelEslintParser = require('@babel/eslint-parser');

var ruleTesterBabel = new RuleTester({languageOptions: {parser: babelEslintParser}})
var ruleTester = new RuleTester({languageOptions: {ecmaVersion: 2022}})

const tests = {
  valid: [
    {code: 'class Foo { bar(){} }'},
    {code: 'class Foo { static bar() {} }'},
    {code: 'class Foo { static bar = () => {} }'},
    {code: 'class Foo { static bar = 1 }'},
    {code: 'class Foo { foo /*: CommentType*/ }'},
  ],
  invalid: [
    {
      code: 'class Foo { bar = () => {} }',
      errors: [
        {
          message:
            'Instance Class Fields are not supported in undefined'
        }
      ]
    },
    {
      code: 'class Foo { bar = 1 }',
      errors: [
        {
          message:
          'Instance Class Fields are not supported in undefined'
        }
      ]
    },
    {
      code: 'class Foo { bar = null }',
      errors: [
        {
          message:
          'Instance Class Fields are not supported in undefined'
        }
      ]
    }
  ]
}

ruleTester.run('no-public-instance-class-fields', rule, tests)
ruleTesterBabel.run('no-public-instance-class-fields', rule, {
  valid: [
    ...tests.valid,
    // TODO: fixme
    // {code: 'class Foo { bar: AType }'},
    // This doesn't catch static class fields.
    // TODO: fixme
    // {code: 'class Foo { static bar: AType }'},
  ],
  invalid: [
    ...tests.invalid
  ]
})
