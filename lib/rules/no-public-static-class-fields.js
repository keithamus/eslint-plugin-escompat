export default (context, badBrowser) => ({
  // Ignore type annotations that don't assign
  // istanbul ignore next -- Older versions of eslint
  'ClassProperty[static=true]:not([typeAnnotation]:not([value]))'(node) {
    context.report(node, `Static Class Fields are not supported in ${badBrowser}`)
  },
  'PropertyDefinition[static=true]:not([typeAnnotation]:not([value]))'(node) {
    context.report(node, `Static Class Fields are not supported in ${badBrowser}`)
  }
})
