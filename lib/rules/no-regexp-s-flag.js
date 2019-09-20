module.exports = (context, badBrowser) => ({
  'Literal[regex]'(node) {
    if (node.regex.flags.includes('s')) {
      context.report(node, `RegExp "s" flag is not supported in ${badBrowser}`)
    }
  },
  'CallExpression[callee.name="RegExp"], NewExpression[callee.name="RegExp"]'(node) {
    if (node.arguments[1] && node.arguments[1].value.includes('s')) {
      context.report(node, `RegExp "s" flag is not supported in ${badBrowser}`)
    }
  }
})
