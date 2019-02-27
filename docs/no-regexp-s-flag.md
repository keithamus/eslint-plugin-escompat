# no-regexp-s-flag

This prevents the use of the `s` flag in RegExps

```js
/abc/s

new RegExp('abc', 's')
```

These will not be allowed because they are not supported in the following browsers:

  'no-regexp-s-flag': browser('edge > 0, safari < 11.1, firefox > 0')(require('./rules/no-regexp-s-flag')),

 - Edge (any version at the time of writing)
 - Safari < 11.1
 - Firefox (any version at the time of writing)
 - Chrome < 62


## What is the Fix?

If you want to use the Spread pattern in Object literals then it is safe to use
`Object.assign` instead. The following lines are equivalent:

```js
let other = { a: 1, ...x }

let other = Object.assign({ a: 1 }, x)
```

If you want to use the Rest pattern in Object Assignment, then the easiest way
is to use `Object.keys(x).reduce`. The following two code samples are equivalent:

```js
let { a, ...x } = obj

let a = obj.a, x = Object.keys(obj).reduce((x, key) => {
  if (key !== 'a') x[key] = obj[key]
  return x
}, {})
```

This could lead to a lot of repetitive code, so you could also lift this function into a helper:

```js
const without = (source, ...excluded) => Object.keys(obj).reduce((acc, key) => {
  if (excluded.indexOf(key) === -1) acc[key] = obj[key]
  return acc
}, {})

let a = obj.a, x = without(obj, 'a')
```

You can also use Lodash's [`without`](https://lodash.com/docs/4.17.11#without) method, or Ramda's [`omit`](https://ramdajs.com/docs/#omit).

This can be safely disabled if you intend to compile code with the `@babel/plugin-proposal-object-rest-spread` Babel plugin, or `@babel/preset-env`.
