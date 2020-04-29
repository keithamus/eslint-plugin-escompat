# no-optional-chaining

This prevents the use of Optional Chaining:

```js
const baz = obj?.foo?.bar?.baz; // 42
```

These will not be allowed because they are not supported in the following browsers:

 - Edge < 80
 - Safari < 13.1
 - Firefox < 72
 - Chrome < 80

## What is the Fix?

If the expression is short, you can consider using a ternary operator:

```js
// these are equivalent:
foo?.bar
foo == null ? void 0 : foo.bar;
```

You can also use the Logical OR operator to avoid throwing, although these can look messy:

```js
const baz = (((obj || {}).foo || {}).bar || {}).baz
```

Lastly, you could consider using a utility function such as [lodash' `get`](https://lodash.com/docs/4.17.15#get)

```js
const baz = _.get(obj, 'foo.bar.baz')
```

This can be safely disabled if you intend to compile code with the `@babel/plugin-proposal-optional-chaining` Babel plugin.
