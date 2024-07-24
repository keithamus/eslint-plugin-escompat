# no-regexp-v-flag

This prevents the use of the `v` flag in RegExps

```js
/[\p{Letter}]/v

new RegExp('[\\p{Letter}]', 'v')
```

These will not be allowed because they are not supported in the following browsers:

 - Edge > 0
 - Safari < 17
 - Firefox < 116
 - Chrome < 112

## What is the Fix?

You can avoid using the `v` flag by expanding the sets to their unicode ranges:

```js
let vFlag = /[\p{ASCII}]/v;
let noVFlag = /[\0-\x7F]/;
```

This can be safely disabled if you intend to compile code with the `@babel/plugin-transform-unicode-sets-regex` Babel plugin, or `@babel/preset-env`.
