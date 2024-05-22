# no-exponentiation-operator

This prevents use of the ES2017 Exponentiation Operator:

```js
2 ** 3 === 8

let x = 2
x **= 3
```

These will not be allowed because they are not supported in the following browsers:

 - Edge < 14
 - Safari < 10.1
 - Firefox < 52
 - Chrome < 52

## What is the Fix?

You can instead safely use `Math.pow(a, b)` where `a` is the left hand operand
and `b` is the right hand operand. For example the following lines are
equivalent:

```js
2 ** 3 === 8
Math.pow(2, 3) === 8

let x = 2; x **= 3
let x = 2; x = Math.pow(x, 3)
```

This can be safely disabled if you intend to compile code with the `@babel/plugin-transform-exponentiation-operator` Babel plugin, or `@babel/preset-env`.
