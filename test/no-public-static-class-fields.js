import { RuleTester } from "eslint"
import babelEslintParser from "@babel/eslint-parser"

import Rule from '../lib/index.js'

const rule = /** @type {Required<import('eslint').ESLint.Plugin>} */ (
  Rule
).rules['no-public-static-class-fields']

const ruleTesterBabel = new RuleTester({languageOptions: {parser: babelEslintParser}})
const ruleTester = new RuleTester({languageOptions: {ecmaVersion: 2022}})

const tests = {
  valid: [
    {code: 'class Foo { bar(){} }'},
    {code: 'class Foo { static bar() {} }'},
    {code: 'class Foo { bar = () => {} }'},
    {code: 'class Foo { bar = 1 }'},
  ],
  invalid: [
    {
      code: 'class Foo { static bar = () => {} }',
      errors: [
        {
          message:
          'Static Class Fields are not supported in undefined'
        }
      ]
    },
    {
      code: 'class Foo { static bar = 1 }',
      errors: [
        {
          message:
          'Static Class Fields are not supported in undefined'
        }
      ]
    }
  ]
}

ruleTester.run('no-public-static-class-fields', rule, tests)
ruleTesterBabel.run('no-public-static-class-fields', rule, {
  valid: [
    ...tests.valid,
    // This doesn't catch instance class fields.
    // TODO: fixme
    // {code: 'class Foo { bar: AType }'},
  ],
  invalid: [
    ...tests.invalid
  ]
})
