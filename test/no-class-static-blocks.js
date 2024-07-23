'use strict';

const rule = require("../lib/index").rules["no-class-static-blocks"];
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({ languageOptions: { ecmaVersion: 2022 }});

ruleTester.run("no-class-static-blocks", rule, {
  valid: [{ code: "class Foo { static x = 1 }" }],
  invalid: [
    {
      code: "class Foo { static { x = 1 } }",
      errors: [
        {
          message: "Class Static Blocks are not supported in undefined",
        },
      ],
    },
  ],
});
