export default (context, badBrowser) => ({
  'ObjectExpression > SpreadElement'(node) {
    context.report(node, `Object Rest/Spread is not supported in ${badBrowser}`)
  },
  'ObjectPattern > RestElement'(node) {
    context.report(node, `Object Rest/Spread is not supported in ${badBrowser}`)
  },

  // istanbul ignore next -- Older versions of eslint and babel-eslint
  ExperimentalRestProperty(node) {
    context.report(node, `Object Rest/Spread is not supported in ${badBrowser}`)
  },
  // istanbul ignore next -- Older versions of eslint and babel-eslint
  ExperimentalSpreadProperty(node) {
    context.report(node, `Object Rest/Spread is not supported in ${badBrowser}`)
  },
})
