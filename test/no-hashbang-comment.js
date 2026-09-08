import { RuleTester } from "eslint"

import Rule from '../lib/index.js'

const rule = Rule.rules['no-hashbang-comment']

const ruleTester = new RuleTester({languageOptions: {ecmaVersion: 2018}})

ruleTester.run('no-hashbang-comment', rule, {
  valid: [
    {code: '// Regular comment'},
    {code: '/* Regular comment */'},
    {code: 'noComment;'},
  ],
  invalid: [
    {
      code: '#!/usr/bin/env node',
      errors: [
        {
          message:
            'Hashbang comments are not supported in undefined'
        }
      ]
    }
  ]
})
