# no-regexp-named-group

This prevents the use of the RegExp named groups feature

```js
/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/

new RegExp('(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})')
```

These will not be allowed because they are not supported in the following browsers:

 - Edge < 79
 - Safari < 11.1
 - Firefox (any version at the time of writing)
 - Chrome < 64


## What is the Fix?

If readability is the main concern, using non-named groups with array-destructuring can be usable without hampering readability too much:

```js
// With named:
const {year,month,day} = '2020-01-01'.match(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/).groups

// Without named
const [_, year, month, day] = '2020-01-01'.match(/(\d{4})-(\d{2})-(\d{2})/) || []
```

This can be safely disabled if you intend to compile code with the `@babel/plugin-transform-named-capturing-groups-regex` Babel plugin, or `@babel/preset-env`.
