# no-logical-assignment-operator

This prevents use of the ES2021 Logical Assignment Operator:

```js
a &&= b;

a ||= b;

a ??= b;
```

These will not be allowed because they are not supported in the following browsers:

 - Edge < 85
 - Safari < 14
 - Firefox < 79
 - Chrome < 85

## What is the Fix?

You can instead safely repeat the variable in using just the logical operator in an assignment. For example the following lines are
equivalent:

```js
a = a && b;

a = a || b;

a = a ?? b;
```

This can be safely disabled if you intend to compile code with the `@babel/plugin-transform-logical-assignment-operators` Babel plugin, or `@babel/preset-env`.
