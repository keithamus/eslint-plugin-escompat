# no-pipeline-operator

This prevents the use of the Pipeline Operator

```js
const result = "hello" |> capitalize |> exclaim
```

These will not be allowed because they are not supported in the following browsers:

 - Edge (any version at the time of writing)
 - Safari (any version at the time of writing)
 - Firefox (any version at the time of writing)
 - Chrome (any version at the time of writing)

## What is the Fix?

For simple expressions you can wrap each function inside the previous pipeline call:

```js
// these are equivalent:
const result = "hello" |> capitalize |> exclaim
const result = exclaim(capitalize("hello"))
```

Lastly, you could consider using a utility function such as [lodash' `_.flow`](https://lodash.com/docs/4.17.15#flow) or [`_.flowRight`](https://lodash.com/docs/4.17.15#flowRight)

```js
const result = _.flow(capitalize, exclaim)("hello")
const result = _.flowRight(exclaim, capitalize)("hello")
```

This can be safely disabled if you intend to compile code with the `@babel/plugin-proposal-pipeline-operator` Babel plugin.
