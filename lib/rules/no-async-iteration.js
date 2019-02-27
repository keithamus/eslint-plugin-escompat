module.exports = function(context, badBrowser) {
  return {
    ForOfStatement(node) {
      if (node.await) {
        context.report(
          node,
          `Async Iteration is not supported in ${badBrowser}`
        )
      }
    }
  }
}

module.exports.schema = []
