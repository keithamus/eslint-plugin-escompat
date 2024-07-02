'use strict';

const rule = require('../lib/index').rules['no-edge-destructure-bug']
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({languageOptions: {ecmaVersion: 2018}})

ruleTester.run('no-edge-destructure-bug', rule, {
  valid: [
    {code: '({a}) => a'},
    {code: '({a}, {b}) => a + b'},
    {code: '({a = 1}, {b}) => a + b'},
    {code: '({a = 1}, {b = 1}) => a + b'},
    {code: '({a = 1}, {b = 1}, {c = 1}) => a + b'},
    {code: '({a = 1}, {b}, {c = 1}) => a + b'},
    {code: '([a], {b}) => a + b'},
    {code: '([a=1], {b}) => a + b'},
    {code: '(a, {b = 1} = {b: 1}) => a + b'},
    {code: '(a, {b}) => a + b'},
    {code: 'const f = function (a, {b = 1}) { return a + b }'}
  ],
  invalid: [
    {
      code: '(a, {b = 1}) => a + b',
      errors: [
        {
          message:
            'There is an Edge 15-17 bug which causes second argument destructuring to fail. See https://git.io/fhd7N for more'
        }
      ]
    },
    {
      code: '([a], {b=1}) => a + b',
      errors: [
        {
          message:
            'There is an Edge 15-17 bug which causes second argument destructuring to fail. See https://git.io/fhd7N for more'
        }
      ]
    },
    {
      code: '([a=1], {b=1}) => a + b',
      errors: [
        {
          message:
            'There is an Edge 15-17 bug which causes second argument destructuring to fail. See https://git.io/fhd7N for more'
        }
      ]
    },
    {
      code: '({a}, {b=1}) => a + b',
      errors: [
        {
          message:
            'There is an Edge 15-17 bug which causes second argument destructuring to fail. See https://git.io/fhd7N for more'
        }
      ]
    },
    {
      code: '({a}, {b}, {c=1}) => a + b + c',
      errors: [
        {
          message:
            'There is an Edge 15-17 bug which causes second argument destructuring to fail. See https://git.io/fhd7N for more'
        }
      ]
    },
    {
      code: '({a}, {b=1}, {c=1}) => a + b + c',
      errors: [
        {
          message:
            'There is an Edge 15-17 bug which causes second argument destructuring to fail. See https://git.io/fhd7N for more'
        }
      ]
    }
  ]
})
