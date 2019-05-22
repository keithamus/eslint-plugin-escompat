module.exports = function(context, badBrowser) {
  return {
    BindExpression(node) {
      context.report(
        node,
        `The Bind Operator is not supported in ${badBrowser}`
      )
    }
  }
}

module.exports.schema = []
