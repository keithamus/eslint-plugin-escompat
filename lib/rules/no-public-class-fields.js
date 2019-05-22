module.exports = function(context, badBrowser) {
  return {
    ClassProperty(node) {
      // Ignore type annotations that don't assign
      if (node.typeAnnotation && !node.value) return
      context.report(
        node,
        `Class Fields are not supported in ${badBrowser}`
      )
    }
  }
}

module.exports.schema = []
