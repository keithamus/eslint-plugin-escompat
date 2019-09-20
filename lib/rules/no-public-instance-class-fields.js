module.exports = (context, badBrowser) => ({
  // Ignore type annotations that don't assign
  'ClassProperty[static=false]:not([typeAnnotation]:not([value]))'(node) {
    context.report(node, `Instance Class Fields are not supported in ${badBrowser}`)
  }
})
