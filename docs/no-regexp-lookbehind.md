# no-regexp-lookbehind

This prevents the use of the RegExp lookbehind feature

```js
/(?<=a>)b/

new RegExp("/(?<=a)b")
```

These will not be allowed because they are not supported in the following browsers:

 - Edge < 79
 - Safari (any version at the time of writing)
 - Firefox (any version at the time of writing)
 - Chrome < 62

## What is the Fix?

You may be able to rewrite your experession using (Negative) Lookaheads, but if not then there is no solution for this, aside from pulling in a custom RegExp library.
