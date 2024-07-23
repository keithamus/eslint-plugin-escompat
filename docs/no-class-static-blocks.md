# no-class-static-blocks

This prevents the use of Static Blocks within Classes, for example:

```js
class Foo {
  static {
    this.x = 1;
  }
}
```

These will not be allowed because they are not supported in the following
browsers:

- Edge < 94
- Safari < 16.4
- Firefox < 93
- Chrome < 94

## What is the Fix?

You can safely use _static fields_, where each property is given the `static`
keyword:

```js
class Foo {
  static x = 1;
}
```

If you wish to evaluate a field using logic, you can do so with an IIFE:

```js
class Foo {
  static x = (() => {
    if (env == "DEBUG") {
      return 4;
    }
    return Math.random();
  })();
}
```

This can be safely disabled if you intend to compile code with the
`@babel/plugin-transform-class-static-block` Babel plugin, or
`@babel/preset-env`.
