# no-computed-class-fields

This prevents the use of computed properties as Class Fields

```js
const computed = 'bar'
class Foo {
  [computed] = 1
}

class Foo {
  static [computed] = 1
}
```

These will not be allowed because Chrome 72, while supporting class fields, does not support computed properties in class fields.

## What is the Fix?

Either make the property non-computed, or you can move these assignments to within the class constructor function for instance properties, or modify the class for static ones:

```js
const computed = 'bar'
class Foo {
  constructor() {
    Object.defineProperty(this, computed, { configurable: true, enumerable: true, writable: true, value: 1 })
  }
}

class Foo {
  constructor() {
    this[computed] = 1
  }
}

// Static
Object.defineProperty(Foo, computed, { configurable: true, enumerable: true, writable: true, value: 1 })
Foo[computed] = 1
```

This can be safely disabled if you intend to compile code with the `@babel/plugin-proposal-class-properties` Babel plugin.
