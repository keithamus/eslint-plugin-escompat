# no-private-in

This prevents the use of Private Class Field brand checks.

```js
class Foo {
  #bar;

  isFoo() {
    return #bar in this
  }
}
```

These will not be allowed because they are not supported in the following environments:

 - Edge < 91
 - Safari < 15
 - Firefox < 90
 - Chrome < 91
 - Node < 16.4


## What is the Fix?

You would need to use a pseudo-private property like `_someProp` and check that or
set a private object and check its property like `foo in obj.#x`.

This can be safely disabled if you intend to compile code with the `@babel/plugin-transform-private-property-in-object` Babel plugin, or
`@babel/preset-env`.
