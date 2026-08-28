'use strict';

module.exports = (context, badBrowser) => ({
  // istanbul ignore next -- Older versions of babel-eslint
  OptionalMemberExpression(node) {
    context.report(node, `Optional Chaining is not supported in ${badBrowser}`)
  },
  ChainExpression(node) {
    context.report(node, `Optional Chaining is not supported in ${badBrowser}`)
  }
})
