import { RuleTester } from "eslint"

import Rule from '../lib/index.js'

const rule = Rule.rules['no-private-in']

const ruleTester = new RuleTester({languageOptions: {ecmaVersion: 2022}})

const tests = {
  valid: [
    "class A { f(obj) { return '#x' in obj } }",
    "class A { f(obj) { return x in obj } }",
    "class A { #x; f(obj) { return foo in obj.#x } }",
  ],
  invalid: [
    {
      code: "class A { #x; f(obj) { return #x in obj } }",
      errors: ["Private Class Fields with in (`#x in obj`) are not supported in undefined."],
    },
    {
      code: "class A { #x; f(obj) { return #x in obj.foo } }",
      errors: ["Private Class Fields with in (`#x in object`) are not supported in undefined."],
    },
    {
      code: "class A { #x; f(obj) { return #x in obj.#x } }",
      errors: ["Private Class Fields with in (`#x in object`) are not supported in undefined."],
    },
  ]
};

ruleTester.run('no-private-in', rule, tests)
