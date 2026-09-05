/**
 * @param {import('eslint').Rule.RuleContext} context
 * @param {boolean} badBrowser
 */
export default (context, badBrowser) => ({
  /**
   * @param {import('estree').LogicalExpression} node
   */
  'LogicalExpression[operator="??"]'(node) {
    context.report({node, message: `the Nullish Coalescing Operator is not supported in ${badBrowser}`})
  }
})
