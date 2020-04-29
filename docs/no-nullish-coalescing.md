# no-nullish-coalescing

This prevents the use of the Nullish Coalescing Operator:

```js
let foo = null
const baz = foo || 1
```

These will not be allowed because they are not supported in the following browsers:

 - Edge < 80
 - Safari < 13.1
 - Firefox < 72
 - Chrome < 80

## What is the Fix?

If the expression is short, you can consider using a ternary operator:

```js
// these are all equivalent:
foo ?? bar
foo != null ? foo : bar
foo !== null && foo !== undefined ? foo : bar
```

This can be safely disabled if you intend to compile code with the `@babel/plugin-syntax-nullish-coalescing-operator` Babel plugin.
