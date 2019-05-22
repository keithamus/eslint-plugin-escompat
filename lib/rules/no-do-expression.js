module.exports = function(context, badBrowser) {
  return {
    DoExpression(node) {
      context.report(
        node,
        `Do Expressions are not supported in ${badBrowser}`
      )
    }
  }
}

module.exports.schema = []
