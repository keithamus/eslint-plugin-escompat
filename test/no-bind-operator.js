import { RuleTester } from 'eslint'
import babelEslintParser from '@babel/eslint-parser'

import Rule from '../lib/index.js'

const rule = /** @type {Required<import('eslint').ESLint.Plugin>} */ (
  Rule
).rules['no-bind-operator']

const ruleTester = new RuleTester({languageOptions: {ecmaVersion: 2018, parser: babelEslintParser}})

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
