# no-public-static-class-fields

This prevents the use of Static Public Class Fields

```js
class Foo {
  static bar = 1
}
```

These will not be allowed because they are not supported in the following browsers:

 - Edge (any version at the time of writing)
 - Safari (any version at the time of writing)
 - Firefox (any version at the time of writing)
 - Chrome < 74


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

This can be safely disabled if you intend to compile code with the `@babel/plugin-proposal-class-properties` Babel plugin.
