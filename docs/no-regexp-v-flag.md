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

If you are not using the features required by the `v` flag (set
notations and properties of string), you can use the `u` flag.

```js
let vFlag = /^[👍]$/u
```

This can be safely disabled if you intend to compile code with the `@babel/plugin-transform-unicode-sets-regex` Babel plugin, or `@babel/preset-env`.
