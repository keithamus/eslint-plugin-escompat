module.exports = function(context, badBrowser) {
  return {
    ClassPrivateProperty(node) {
      context.report(
        node,
        `Private Class Fields are not supported in ${badBrowser}`
      )
    }
  }
}

module.exports.schema = []
