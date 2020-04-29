# no-optional-catch

This prevents the use of Optional Catch statements.

```js
try {
  ...
} catch { // no argument needed

}
```

These will not be allowed because they are not supported in the following browsers:

 - Edge < 79
 - Safari < 11.1
 - Firefox < 68
 - Chrome < 66

## What is the Fix?

The simplest solution to fix this is to provide the omitted argument:

```js
try {
  ...
} catch (e) { // add the argument

}
```

This can be safely disabled if you intend to compile code with the `@babel/plugin-syntax-optional-catch-binding` Babel plugin, or `@babel/preset-env`.
