import { RuleTester } from "eslint"

import Rule from '../lib/index.js'

const rule = /** @type {Required<import('eslint').ESLint.Plugin>} */ (
  Rule
).rules['no-top-level-await']

const ruleTester = new RuleTester({languageOptions: {ecmaVersion: 2022}})

ruleTester.run('no-top-level-await', rule, {
  valid: [
    {code: 'async function get () { return await asyncMethod(); }'},
    {code: '(async () => { await getAsyncResults(); })();'},
    {code: 'const get = async function get () { return await asyncMethod(); }'},
    {code: 'const get = async () => { return await asyncMethod(); }'},
  ],
  invalid: [
    {
      code: 'await asyncMethod();',
      errors: [
        {
          message: 'Top-level await is not supported in undefined'
        }
      ]
    },
    {
      code: 'const results = await getAsyncResults();',
      errors: [
        {
          message: 'Top-level await is not supported in undefined'
        }
      ]
    },
  ]
})
