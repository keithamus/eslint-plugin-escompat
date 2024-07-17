# no-numeric-separators

This prevents the use of separators in Numeric Literals:

```js
1_000_000
```

These will not be allowed because they are not supported in the following browsers:

 - Edge < 79
 - Safari < 13
 - Firefox < 68
 - Chrome < 75


## What is the Fix?

This can be safely disabled if you intend to compile code with the `@babel/plugin-transform-numeric-separator` Babel plugin, or
`@babel/preset-env`.
