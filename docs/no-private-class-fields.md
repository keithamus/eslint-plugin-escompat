# no-private-class-fields

This prevents the use of Private Class Fields

```js
class Foo {
  static #bar = 1
  #bar = 1

  isFoo() {
    return #bar === 1
  }
}
```

These will not be allowed because they are not supported in the following browsers:

 - Edge < 79
 - Safari < 14.1
 - Firefox < 90
 - Chrome < 74


## What is the Fix?

Use of a WeakMap will cover most use cases:

```js
const fooPrivateState = new WeakMap()

class Foo {
  constructor() {
    fooPrivateState.set(this, { bar: 1 })
  }

  isFoo() {
    return (fooPrivateState.get(this) || {}).bar === 1
  }
}
```

This can be safely disabled if you intend to compile code with the `@babel/plugin-transform-private-property-in-object` Babel plugin, or
`@babel/preset-env`.
