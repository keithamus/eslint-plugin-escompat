import { RuleTester } from "eslint"
import babelEslintParser from "@babel/eslint-parser"

import Rule from '../lib/index.js'

const rule = Rule.rules['no-dynamic-imports']

const ruleTesterBabel = new RuleTester({ languageOptions: {parser: babelEslintParser} })
const ruleTester = new RuleTester({languageOptions: {sourceType: 'module', ecmaVersion: 2020}})

const tests = {
  valid: [
    {code: 'import foo from "foo"'},
    {code: 'Import("foo").then'},
    {code: 'System.import("foo").then'},
  ],
  invalid: [
    {
      code: 'import("foo")',
      errors: [
        {
          message:
            'Dynamic import is not supported in undefined'
        }
      ]
    }
  ]
}

ruleTesterBabel.run('no-dynamic-imports (babel)', rule, {
  valid: [
    {code: 'import foo from "foo"'},
    {code: 'Import("foo").then'},
    {code: 'System.import("foo").then'},
  ],
  invalid: [
    {
      code: 'import("foo")',
      errors: [
        {
          message:
            'Dynamic import is not supported in undefined'
        }
      ]
    }
  ]
})

ruleTester.run('no-dynamic-imports', rule, tests)
ruleTesterBabel.run('no-dynamic-imports', rule, tests)
