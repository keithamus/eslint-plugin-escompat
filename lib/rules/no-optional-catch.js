/**
 * @param {import('eslint').Rule.RuleContext} context
 * @param {boolean} badBrowser
 */
export default (context, badBrowser) => ({
  /**
   * @param {import('estree').CatchClause} node
   */
  'CatchClause:not([param])'(node) {
    context.report({node, message: `Optional Catch Parameters are not supported in ${badBrowser}`})
  }
})
