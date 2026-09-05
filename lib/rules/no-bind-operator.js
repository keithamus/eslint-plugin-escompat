/**
 * @param {import('eslint').Rule.RuleContext} context
 * @param {boolean} badBrowser
 */
export default (context, badBrowser) => ({
  /**
   * @param {import('estree').Expression} node
   */
  BindExpression(node) {
    context.report({node, message: `The Bind Operator is not supported in ${badBrowser}`})
  }
})
