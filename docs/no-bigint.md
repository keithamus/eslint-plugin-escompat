# no-bigint

This prevents the use of BigInt numeric literals.

```js
0n
```

These will not be allowed because they are not supported in the following browsers:

 - Edge < 79
 - Safari < 14
 - Firefox < 68
 - Chrome < 67


## What is the Fix?

There is currently no way to use BigInts while supporting these browsers. Babel does not currently having a transform for BigInt.
