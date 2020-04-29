# no-dynamic-import

This prevents the use of Dynamic Imports.

```js
import('foo').then(...)
```

These will not be allowed because they are not supported in the following browsers:

 - Edge < 79
 - Safari < 11
 - Firefox < 67
 - Chrome < 63


## What is the Fix?

This can be safely disabled if you intend to compile with a third party module loader configured to support dynamic imports, such as [Rollup](http://rollupjs.org) or [WebPack](https://webpack.js.org).
