module.exports = function(context, badBrowser) {
  return {
    FunctionDeclaration(node) {
      if (node.async && node.generator) {
        context.report(
          node,
          `Async Generators are not supported in ${badBrowser}`
        )
      }
    }
  }
}

module.exports.schema = []
