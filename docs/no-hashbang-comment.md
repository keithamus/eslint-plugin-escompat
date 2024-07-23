# no-hashbang-comment

This prevents use of ES2023 hashang comments:

```js
#!/usr/bin/env node
```

These will not be allowed because they are not supported in the following browsers:

 - Edge < 79
 - Safari < 13.1
 - Firefox < 67
 - Chrome < 74


## What is the Fix?

You have to omit the comment.
