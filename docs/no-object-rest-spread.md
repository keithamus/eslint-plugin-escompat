# no-object-rest-spread

This prevents the use of Object Rest & Spread patterns, for example:

```js
let { a, ...x } = obj

let other = { a: 1, ...x }
```

These will not be allowed because they are not supported in the following browsers:

 - Edge < 79
 - Safari < 11.1
 - Firefox < 55
 - Chrome < 60


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

This can be safely disabled if you intend to compile code with the `@babel/plugin-transform-object-rest-spread` Babel plugin, or `@babel/preset-env`.
