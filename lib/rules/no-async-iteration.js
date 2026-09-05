/**
 * @param {import('eslint').Rule.RuleContext} context
 * @param {boolean} badBrowser
 */
export default (context, badBrowser) => ({
  /**
   * @param {import('estree').ForOfStatement} node
   */
  'ForOfStatement[await=true]'(node) {
    context.report({node, message: `Async Iteration is not supported in ${badBrowser}`})
  }
})
