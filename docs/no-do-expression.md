# no-do-expression

This prevents the use of Do Expressions

```js
let a = do {
  if(x > 10) {
    'big'
  } else {
    'small'
  }
}
```

These will not be allowed because they are not supported in the following browsers:

 - Edge (any version at the time of writing)
 - Safari (any version at the time of writing)
 - Firefox (any version at the time of writing)
 - Chrome (any version at the time of writing)

## What is the Fix?

If the expression is short, you can consider using a ternary operator:

```js
// these are equivalent:
let a = do {
  if(x > 10) {
    'big'
  } else {
    'small'
  }
}
let a = x > 10 ? 'big' : 'small'
```

You can also avoid the use of the do expression, and declare a variable upfront without assigning it immediately:

```js
let a
if(x > 10) {
  let a = 'big'
} else {
  let a = 'small'
}
```

This can be safely disabled if you intend to compile code with the `@babel/plugin-proposal-do-expressions` Babel plugin.
