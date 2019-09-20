module.exports = (context, badBrowser) => ({
  'Literal[raw=/_/][value>=0], Literal[raw=/_/][value<=0]'(node) {
    context.report(node, `Numeric Separators are not supported in ${badBrowser}`)
  }
})
