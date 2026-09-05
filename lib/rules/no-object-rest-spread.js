/**
 * @param {import('eslint').Rule.RuleContext} context
 * @param {boolean} badBrowser
 */
export default (context, badBrowser) => ({
  /**
   * @param {import('estree').ObjectExpression} node
   */
  'ObjectExpression > SpreadElement'(node) {
    context.report({node, message: `Object Rest/Spread is not supported in ${badBrowser}`})
  },
  /**
   * @param {import('estree').ObjectPattern} node
   */
  'ObjectPattern > RestElement'(node) {
    context.report({node, message: `Object Rest/Spread is not supported in ${badBrowser}`})
  },

  // istanbul ignore next -- Older versions of eslint and babel-eslint
  /**
   * @param {import('estree').Property} node
   */
  ExperimentalRestProperty(node) {
    context.report({node, message: `Object Rest/Spread is not supported in ${badBrowser}`})
  },
  // istanbul ignore next -- Older versions of eslint and babel-eslint
  /**
   * @param {import('estree').Property} node
   */
  ExperimentalSpreadProperty(node) {
    context.report({node, message: `Object Rest/Spread is not supported in ${badBrowser}`})
  },
})
