/**
 * @param {import('eslint').Rule.RuleContext} context
 * @param {boolean} badBrowser
 */
export default (context, badBrowser) => ({
  /**
   * @param {import('estree').AssignmentExpression|import('estree').BinaryExpression} node
   */
  'AssignmentExpression[operator="**="], BinaryExpression[operator="**"]'(node) {
    context.report({node, message: `Exponentiation Operator is not supported in ${badBrowser}`})
  }
})
