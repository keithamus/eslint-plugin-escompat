# no-regexp-duplicate-named-groups

This prevents the use of the RegExp duplicate named groups feature

```js
/(?<year>\d{4})-(?<month>\d{2})|(?<month>\d{2})-(?<year>\d{4})/;

new RegExp('(?<year>\\d{4})-(?<month>\\d{2})|(?<month>\\d{2})-(?<year>\\d{4})')
```

These will not be allowed because they are not supported in the following browsers:

 - Edge < 125
 - Safari < 17
 - Firefox < 129
 - Chrome < 125


## What is the Fix?

You will have to avoid getting the same name out-of-the-box for an
alternative group.

This can be safely disabled if you intend to compile code with the `@babel/plugin-proposal-duplicate-named-capturing-groups-regex` Babel plugin.
