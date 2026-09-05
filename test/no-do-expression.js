import { RuleTester } from 'eslint'
import babelEslintParser from '@babel/eslint-parser'

import Rule from '../lib/index.js'

const rule = Rule.rules['no-do-expression']

const ruleTester = new RuleTester({languageOptions: {ecmaVersion: 2018, parser: babelEslintParser}})

ruleTester.run('no-do-expression', rule, {
  valid: [
    {code: '() => { return 1 > 0 }'},
  ],
  invalid: [
    {
      code: '() => { return do { return 1 > 0 } === true }',
      errors: [
        {
          message:
            'Do Expressions are not supported in undefined'
        }
      ]
    }
  ]
})
