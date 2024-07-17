'use strict';

const rule = require('../lib/index').rules['no-hashbang-comment']
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({languageOptions: {ecmaVersion: 2018}})

ruleTester.run('no-hashbang-comment', rule, {
  valid: [
    {code: '// Regular comment'},
    {code: '/* Regular comment */'},
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
