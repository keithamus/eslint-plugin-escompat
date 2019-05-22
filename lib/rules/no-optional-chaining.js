module.exports = function(context, badBrowser) {
  return {
    OptionalMemberExpression(node) {
      context.report(
        node,
        `Optional Chaining is not supported in ${badBrowser}`
      )
    }
  }
}

module.exports.schema = []
