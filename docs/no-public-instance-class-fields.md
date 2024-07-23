# no-public-instance-class-fields

This prevents the use of Instance Public Class Fields

```js
class Foo {
  bar = 1
}
```

These will not be allowed because they are not supported in the following browsers:

 - Edge < 79
 - Safari < 16.0
 - Firefox < 69
 - Chrome < 72


## What is the Fix?

You can move these assignments to within the class constructor function, using either `Object.defineProperty` (or a simple assignment) to add instance properties:

```js
class Foo {
  constructor() {
    Object.defineProperty(this, 'bar', { configurable: true, enumerable: true, writable: true, value: 1 })
  }
}
```

```js
class Foo {
  constructor() {
    this.bar = 1
  }
}
```

This can be safely disabled if you intend to compile code with the `@babel/plugin-transform-class-properties` Babel plugin, or
`@babel/preset-env`.
