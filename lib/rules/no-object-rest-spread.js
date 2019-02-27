module.exports = function(context, badBrowser) {
  return {
    SpreadElement(node) {
      context.report(
        node,
        `Object Rest/Spread is not supported in ${badBrowser}`
      )
    },
    RestElement(node) {
      context.report(
        node,
        `Object Rest/Spread is not supported in ${badBrowser}`
      )
    }
  }
}

module.exports.schema = []
