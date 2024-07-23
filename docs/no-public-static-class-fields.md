# no-public-static-class-fields

This prevents the use of Static Public Class Fields

```js
class Foo {
  static bar = 1
}
```

These will not be allowed because they are not supported in the following browsers:

 - Edge < 79
 - Safari < 14.1
 - Firefox < 75
 - Chrome < 72


## What is the Fix?

You can modify a class using `Object.defineProperty` (or a simple assignment) to add static properties:

```js
class Foo {}
Object.defineProperty(Foo, 'bar', { configurable: true, enumerable: true, writable: true, value: 1 })
```

```js
class Foo {}
Foo.bar = 1
```

This can be safely disabled if you intend to compile code with the `@babel/plugin-transform-class-properties` Babel plugin, or
`@babel/preset-env`.
