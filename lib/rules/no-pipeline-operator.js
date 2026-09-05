/**
 * @param {import('eslint').Rule.RuleContext} context
 * @param {boolean} badBrowser
 */
export default (context, badBrowser) => ({
  /**
   * @param {import('estree').BinaryExpression} node
   */
  'BinaryExpression[operator="|>"]'(node) {
    context.report({node, message: `The Pipeline Operator is not supported in ${badBrowser}`})
  }
})
