# no-async-iteration

This prevents the use of Async Iteration - through `for await (... of ...)` statements:

```js
for await (const line of readLines(path)) {
  console.log(line)
}
```

These will not be allowed because they are not supported in the following browsers:

 - Edge (any version at the time of writing)
 - Safari < 12
 - Firefox < 57
 - Chrome < 63

This can be safely disabled if you intend to compile code with the `@babel/plugin-proposal-async-generator-functions` Babel plugin
