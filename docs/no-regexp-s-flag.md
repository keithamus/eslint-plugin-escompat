# no-regexp-s-flag

This prevents the use of the `s` flag in RegExps

```js
/abc/s

new RegExp('abc', 's')
```

These will not be allowed because they are not supported in the following browsers:

 - Edge < 79
 - Safari < 11.1
 - Firefox < 78
 - Chrome < 62


## What is the Fix?

The `s` flag is relatively simple sugar for `[\0-\uFFFF]`, so you can simply opt to write the un-sugared syntax:

```js
let dotAll = `/./s`

let dotAll = `/[\0-\uFFFF]/`
```

If you are using it in combination with the `u` flag then you may adjust the pattern:

```js
let dotAll = `/./su`

let dotAll = `/[\0-\u{10FFFF}]/`
```

This can be safely disabled if you intend to compile code with the `@babel/plugin-transform-dotall-regex` Babel plugin, or `@babel/preset-env`.
