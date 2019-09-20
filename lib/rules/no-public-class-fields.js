module.exports = (context, badBrowser) => ({
  // Ignore type annotations that don't assign
  'ClassProperty:not([typeAnnotation]:not([value]))'(node) {
    context.report(node, `Class Fields are not supported in ${badBrowser}`)
  }
})
