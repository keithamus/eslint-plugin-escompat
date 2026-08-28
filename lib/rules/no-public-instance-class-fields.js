'use strict';

module.exports = (context, badBrowser) => ({
  // Ignore type annotations that don't assign
  // istanbul ignore next -- Older versions of eslint
  'ClassProperty[static=false]:not([typeAnnotation]:not([value]))'(node) {
    if (node.value === null) return
    context.report(node, `Instance Class Fields are not supported in ${badBrowser}`)
  },
  'PropertyDefinition[static=false]:not([typeAnnotation]:not([value]))'(node) {
    if (node.value === null) return
    context.report(node, `Instance Class Fields are not supported in ${badBrowser}`)
  }
})
