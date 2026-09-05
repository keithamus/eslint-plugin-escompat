/**
 * @param {import('eslint').Rule.RuleContext} context
 * @param {boolean} badBrowser
 */
export default (context, badBrowser) => ({
  /**
   * @param {import('estree').Expression} node
   */
  DoExpression(node) {
    context.report({node, message: `Do Expressions are not supported in ${badBrowser}`})
  }
})
