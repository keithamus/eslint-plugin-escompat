module.exports = function(context, badBrowser) {
  return {
    SpreadElement(node) {
      if (!node.parent || node.parent.type !== 'ObjectExpression') return
      context.report(
        node,
        `Object Rest/Spread is not supported in ${badBrowser}`
      )
    },
    RestElement(node) {
      if (!node.parent || node.parent.type !== 'ObjectPattern') return
      context.report(
        node,
        `Object Rest/Spread is not supported in ${badBrowser}`
      )
    },

    // Catch older versions of eslint and babel-eslint
    ExperimentalRestProperty(node) {
      context.report(
        node,
        `Object Rest/Spread is not supported in ${badBrowser}`
      )
    },
    ExperimentalSpreadProperty(node) {
      context.report(
        node,
        `Object Rest/Spread is not supported in ${badBrowser}`
      )
    },
  }
}

module.exports.schema = []
