const hasSeparator = RegExp.prototype.test.bind(/^\d+(?:_\d+)+\d*$/)
module.exports = function(context, badBrowser) {
  return {
    Literal(node) {
      if (typeof node.value === 'number' && hasSeparator(node.raw)) {
        context.report(
          node,
          `Numeric Separators are not supported in ${badBrowser}`
        )
      }
    }
  }
}

module.exports.schema = []
