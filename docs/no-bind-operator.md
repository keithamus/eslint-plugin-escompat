# no-bind-operator

This prevents the use of the Bind operator (`::`)

```js
obj::func
::obj.func

::obj.func(val)
```

These will not be allowed because they are not supported in the following browsers:

 - Edge (any version at the time of writing)
 - Safari (any version at the time of writing)
 - Firefox (any version at the time of writing)
 - Chrome (any version at the time of writing)

## What is the Fix?

You can use the `.bind` function prototype method to create a bound function:

```js
// these are equivalent:
obj::func
func.bind(obj)

// these are equivalent:
::obj.func
obj.func.bind(obj)
```

If you're using the bind operator as a call expression, then you can use the `.call` function prototype method:

```js
// these are equivalent:
obj::func(val)
func.call(obj, val)

// these are equivalent:
::obj.func(val)
obj.func.call(obj, val)
```


This can be safely disabled if you intend to compile code with the `@babel/plugin-proposal-function-bind` Babel plugin.
