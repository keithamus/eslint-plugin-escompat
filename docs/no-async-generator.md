# no-async-generator

This prevents the use of Async Generator functions, for example:

```js
async function* readLines(path) {
  let file = await fileOpen(path);

  try {
    while (!file.EOF) {
      yield await file.readLine();
    }
  } finally {
    await file.close();
  }
}
```

These will not be allowed because they are not supported in the following browsers:

 - Edge < 79
 - Safari < 12
 - Firefox < 57
 - Chrome < 63


## What is the Fix?

You can safely manually create generator functions that yield promises, however an example is out of scope of this document.

This can be safely disabled if you intend to compile code with the `@babel/plugin-transform-async-generator-functions` Babel plugin, or `@babel/preset-env`.
