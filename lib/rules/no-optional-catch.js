module.exports = function(context, badBrowser) {
  return {
    CatchClause(node) {
      if (!node.param) {
        context.report(
          node,
          `Optional Catch Parameters are not supported in ${badBrowser}`
        )
      }
    }
  }
}

module.exports.schema = []
