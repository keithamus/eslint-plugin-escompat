# no-top-level-await

This prevents the use of `await` at the top-level of documents (outside
of an async function context)

```js
await asyncMethod();

const results = await getAsyncResults();
```

These will not be allowed because they are not supported in the following browsers:

 - Edge < 89
 - Safari < 15
 - Firefox < 89
 - Chrome < 89


## What is the Fix?

You can wrap your `await` in an async Immediately Invoking Function
Expression (IIFE).

```js
(async () => {
    await asyncMethod();

    const results = await getAsyncResults();
})();
```
