module.exports = function(context, badBrowser) {
  return {
    BinaryExpression(node) {
      if (node.operator === '|>') {
        context.report(
          node,
          `The Pipeline Operator is not supported in ${badBrowser}`
        )
      }
    }
  }
}

module.exports.schema = []
